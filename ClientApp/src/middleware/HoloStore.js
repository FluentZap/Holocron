import { HubConnectionBuilder } from '@aspnet/signalr';

export function logger({ dispatch, getState }) {

    const connection = new HubConnectionBuilder().withUrl("/HolocronHub").build();


    connection.start().then(() => {
        // connection.invoke("updateServer", 'Hello Server').catch(function (err) {
        //     return console.error(err.toString());
        // });
    });

    connection.on("send", data => {
        dispatch({
            type: 'ADD_TODO',
            text: data
        })
    });

    connection.on("ServerLogin", data => {
        console.log('Login ' + data['loggedIn'] + 'SessionToken: ' + data['sessionToken']);
        // document.cookie = `username=${}`
    });

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

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        //console.log('state after dispatch', getState())
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}

export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            let newState = [...state, action.text];
            return newState;
        default:
            return state;
    }
}