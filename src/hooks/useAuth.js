import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/authContext';

function useAuth() {

    const context = useContext(AuthContext);
    const auth = context.user;

    useDebugValue(auth ? 'Zalogowany' : 'Wylogowany'); // pomocne przy debugowaniu w reactDevtools
    //własnych custom'owych hook'ów

    const setAuth = (user) => {
        if (user) {
            context.login(user);
            window.localStorage.setItem('token-data', JSON.stringify(user));

        } else {
            context.logout();
            window.localStorage.removeItem('token-data');
        }
    }
    return [auth, setAuth]
};

export default useAuth;