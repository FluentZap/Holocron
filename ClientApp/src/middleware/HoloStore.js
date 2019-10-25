import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { navigate } from "@reach/router";
import loadDataSet from './LoadDataSet';
import { merge, cloneDeep } from 'lodash'

export function holocronMiddleware({ dispatch, getState }) {
  const connection = new HubConnectionBuilder()
    .withUrl("/Holocron")
    .withAutomaticReconnect([5000, 5000, 5000, 5000, 5000, 5000, 10000, 10000, 10000])
    .configureLogging(LogLevel.Information)
    .build();

  connection.onclose(() => {
    dispatch({ type: 'SET_CONNECTED', status: false });
  })

  connection.onreconnected(() => {
    let state = getState();
    if (state.sessionToken !== null) {
      connection.invoke("LoginUserToken", state.sessionToken
      ).catch(function (err) {
        return console.error(err.toString());
      });
    } else {
      navigate('/');
    }
  });

  loadDataSet(dispatch);
  setHubCallbacks(connection, dispatch);
  startConnection(connection, dispatch);
  // connection.onclose(async () => {
  //     await start();
  // });

  // connection.start().catch(function (err) {
  //     return console.error(err.toString());
  // }).then(() => {
  //     dispatch({ type: 'SET_CONNECTED', payload: true });
  //     console.log('connected');
  // });

  return next => action => {
    //console.log('will dispatch', action)        

    if (action.type === 'SERVER_CREATE_USER') {
      console.log(action);
      connection.invoke("CreateUser", {
        userName: action.userName,
        password: action.password
      }).catch(function (err) {
        return console.error(err.toString());
      });
    }

    if (action.type === 'SERVER_LOGIN_USER') {
      connection.invoke("LoginUser", {
        userName: action.userName,
        password: action.password
      }).catch(function (err) {
        return console.error(err.toString());
      });
    }

    if (action.type === 'SERVER_FETCH_ROSTER') {
      let state = getState();
      connection.invoke("FetchRoster", state.sessionToken
      ).catch(function (err) {
        return console.error(err.toString());
      });
    }

    if (action.type === 'SERVER_FETCH_GROUPS') {
      let state = getState();
      connection.invoke("FetchGroups", state.sessionToken
      ).catch(function (err) {
        return console.error(err.toString());
      });
    }

    if (action.type === 'SERVER_CREATE_CHARACTER') {
      connection.invoke("CreateCharacter", action.character
      ).catch(function (err) {
        return console.error(err.toString());
      });
    }

    if (action.type === 'SERVER_CREATE_GROUP') {
      connection.invoke("CreateGroup", { name: action.groupName, connectionId: action.connectionId }
      ).catch(function (err) {
        return console.error(err.toString());
      });
    }

    if (action.type === 'SERVER_JOIN_GROUP') {
      connection.invoke("JoinGroup", { name: action.groupName, connectionId: action.connectionId }
      ).catch(function (err) {
        return console.error(err.toString());
      });
    }

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    if (action.type === 'SET_SESSION_TOKEN') {
      let state = getState();
      if (state.sessionToken !== null && state.sessionToken !== "rejected") {
        // navigate('/');
        navigate('/menu');
      } else {
        navigate('/');
      }
    }

    //console.log('state after dispatch', getState())
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

export function holocronReducer(state = {}, action) {
  // console.log(state);

  switch (action.type) {
    case 'SET_SESSION_TOKEN':
      return { ...state, sessionToken: action.sessionToken, userName: action.userName };
    case 'SET_CONNECTED':
      return { ...state, connected: action.status };
    case 'CLIENT_UPDATE':
      return parseUpdateModel(state, action.payload);
    case 'SET_DATASET':
      return { ...state, dataSet: action.dataSet };
    default:
      return state;
  }
}

export const initial_state = {
  connected: false,
  userName: '',
  sessionToken: null,
  characters: null,
  dataSet: null,
  groups: null,
}


const startConnection = async (connection, dispatch) => {
  try {
    await connection.start().then(() => {
      dispatch({ type: 'SET_CONNECTED', status: true });
    });
    console.log("connected");
    // dispatch({ type: 'SERVER_LOGIN_USER', userName: 'root', password: 'root' });
    //Auto Login Test Account        
  } catch (err) {
    console.log(err);
    setTimeout(() => startConnection(), 5000);
  }
}

const setHubCallbacks = (connection, dispatch) => {
  connection.on("send", (flag, data) => {
    dispatch({
      type: 'ADD_TODO',
      text: data
    })
  });

  connection.on("ServerLogin", (flag, sessionToken, userName) => {
    if (flag !== 0) {
      dispatch({
        type: 'SET_SESSION_TOKEN',
        sessionToken: 'rejected'
      })
    } else {
      dispatch({
        type: 'SET_SESSION_TOKEN',
        sessionToken: sessionToken,
        userName: userName,
      })
    }
    // document.cookie = `username=${}`
  });

  connection.on("ClientUpdate", (flag, updateModel) => {
    if (flag === 0) {
      dispatch({
        type: 'CLIENT_UPDATE',
        payload: updateModel
      })
    }
  });
}



// function parseCharacterData(data) {
//   return data.map(c => {
//     c.skillsCareer = c.skillsCareer.split(',');
//     c.skillsCareerFree = c.skillsCareerFree.split(',');
//     c.skillsSpec = c.skillsSpec.split(',');
//     c.skillsSpecFree = c.skillsSpecFree.split(',');
//     return c
//   })
// }


function parseUpdateModel(state, model) {
  console.log(model);
  let newState = cloneDeep(state);
  newState = merge(newState, model);
  console.log(newState);
  return newState;
}

// export function isObject(item) {
//   return (item && typeof item === 'object' && !Array.isArray(item));
// }

// export function mergeDeep(target, ...sources) {
//   if (!sources.length) return target;
//   const source = sources.shift();

//   if (isObject(target) && isObject(source)) {
//     for (const key in source) {
//       if (isObject(source[key])) {
//         if (!target[key]) target = { ...target, [key]: {} };
//         mergeDeep(target[key], source[key]);
//       } else {
//         target = { ...target, [key]: source[key] };
//       }
//     }
//   }

//   return mergeDeep(target, ...sources);
// }