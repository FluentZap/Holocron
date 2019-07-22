import { HubConnectionBuilder } from '@aspnet/signalr';

export function logger({ dispatch, getState }) {

    const connection = new HubConnectionBuilder().withUrl("/HolocronHub").build();

    connection.start().then(() => {
        connection.invoke("updateServer", 'Hello Server').catch(function (err) {
            return console.error(err.toString());
        });
    });

    connection.on("send", data => {
        dispatch({
            type: 'ADD_TODO',
            text: data
        })
    });

    return next => action => {
        console.log('will dispatch', action)
        if (action.type === 'SEND_TO_SERVER') {

        }

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        console.log('state after dispatch', getState())
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