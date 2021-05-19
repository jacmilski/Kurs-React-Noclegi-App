export const reducer = (state = initialState, action) => { //pierwszy parametr jest właśnie funkcją reducera

    switch (action.type) {
        case 'set-theme':
        const theme = state.theme === 'success' ? 'warning' : 'success'
        return {...state, theme: theme };
        case 'login':
        return {...state, user: action.user };
        case 'logout':
        return {...state, user: null };
        default: 
        //return state;
        throw new Error('Nie ma takiej akcji!: ' + action.type)
    }
};

export const initialState = {
    user: JSON.parse(window.localStorage.getItem('token-data')) ?? null,
    theme: 'success',
}