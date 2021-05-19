import { createContext } from 'react';

const AuthContext = createContext({
    isAuthentcated: false,
    login: () => {},
    logout: () => {},
});

AuthContext.displayName = 'AuthContext';

export default AuthContext;