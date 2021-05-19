import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ReducerContext from '../context/reducerContext';

const AuthenticatedRoute = (props) => {
    const context = useContext(ReducerContext);

    return context.state.user
    ? <Route  {...props} /> : <Redirect to='/zaloguj'/>
};

export default AuthenticatedRoute;