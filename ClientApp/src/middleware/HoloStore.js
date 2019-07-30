import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { navigate } from "@reach/router";

export function holocronMiddleware({ dispatch, getState }) {
    const connection = new HubConnectionBuilder().withUrl("/HolocronHub").configureLogging(LogLevel.Information).build();

    connection.on("send", data => {
        dispatch({
            type: 'ADD_TODO',
            text: data
        })
    });

    connection.on("ServerLogin", data => {
        console.log('Login ' + data['loggedIn'] + 'SessionToken: ' + data['sessionToken']);
        if (data['loggedIn']) {
            dispatch({
                type: 'SET_SESSION_TOKEN',
                sessionToken: data['sessionToken']
            })
        } else {
            dispatch({
                type: 'SET_SESSION_TOKEN',
                sessionToken: null
            })
        }
        // document.cookie = `username=${}`
    });

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
            connection.invoke("FetchRoster", {
                userName: state.userName,
                sessionToken: state.sessionToken
            }).catch(function (err) {
                return console.error(err.toString());
            });
        }

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        if (action.type === 'SET_SESSION_TOKEN') {
            let state = getState();
            if (state.sessionToken !== null) {
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

export const holocronReducer = (state = initial_state, action) => {
    switch (action.type) {
        case 'SET_SESSION_TOKEN':
            return { ...state, sessionToken: action.sessionToken };
        case 'SERVER_LOGIN_USER':
            return { ...state, userName: action.userName };
        default:
            return state;
    }
}


const initial_state = {
    connected: false,
    userName: '',
    sessionToken: null,
    characters: null,
}


const startConnection = async (connection, dispatch) => {
    try {
        await connection.start().then(() => {
            dispatch({ type: 'SET_CONNECTED', payload: true });
        });
        console.log("connected");
    } catch (err) {
        console.log(err);
        setTimeout(() => startConnection(), 5000);
    }
}