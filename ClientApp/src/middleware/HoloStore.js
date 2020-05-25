import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { navigate } from "@reach/router";
import loadDataSet from './LoadDataSet';
import { merge, cloneDeep, pickBy, identity } from 'lodash'
import { getActionString } from './ActionBuilder';

export function holocronMiddleware({ dispatch, getState }) {
  const connection = new HubConnectionBuilder()
    .withUrl("/Holocron")
    .withAutomaticReconnect([4000, 4000, 10000, 10000, 30000, 30000, 60000, 60000])
    .configureLogging(LogLevel.Information)
    .build();

  connection.onclose(() => {
    dispatch({ type: 'SET_CONNECTED', status: false });
    navigate('/');
  })

  connection.onreconnected(() => {
    let state = getState();
    dispatch({
      type: 'CLIENT_UPDATE',
      payload: {
        characters: null,
        groups: null,
      }
    })
    if (state.user.sessionToken !== null) {
      connection.invoke("LoginUserToken", state.user.sessionToken
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
    console.log(action);
    const state = getState();

    if (action.server) {
      const payload = action.payload ?
        { ...action.payload, sessionToken: state.user.sessionToken } :
        { sessionToken: state.user.sessionToken }

      connection.invoke(getActionString(action.type), payload
      ).catch(function (err) {
        return console.error(err.toString());
      });
    }

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    if (action.type === 'CLIENT_LOGIN') {
      console.log(action);
      
      let state = getState();
      if (state.user.sessionToken !== null && state.user.sessionToken !== "rejected") {
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
    case 'CLIENT_LOGIN':
      return parseUpdateModel(state, action.payload);
    case 'SET_CONNECTED':
      return { ...state, connected: action.status };
    case 'CLIENT_UPDATE':
      return parseUpdateModel(state, action.payload);
    case 'SET_DATASET':
      return { ...state, dataSet: action.dataSet };
    case 'SERVER_LOGIN_GROUP':
      return { ...state, user: { ...state.user, currentAdventure: action.id } };
    default:
      return state;
  }
}

export const initial_state = {
  connected: false,
  user: { sessionToken: null, name: "", currentAdventure: null },
  characters: null,
  dataSet: null,
  groups: null,
  groupList: null,
  currentAdventure: null,
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

  connection.on("ServerLogin", (flag, updateModel) => {
    if (flag !== 1) {
      dispatch({
        type: 'CLIENT_LOGIN',
        payload: { user: { sessionToken: 'rejected' } }
      })
    } else {
      dispatch({
        type: 'CLIENT_LOGIN',
        payload: updateModel
      })
    }
    // document.cookie = `username=${}`
  });

  connection.on("ClientUpdate", (flag, updateModel) => {
    console.log(flag);
    console.log(updateModel);
    
    if (flag === 1) {
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
  model = pickBy(model, identity);
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