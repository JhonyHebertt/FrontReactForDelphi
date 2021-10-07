import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from './context/context';

export default function PrivateRoute(props) {
    const { logado } = useContext(AuthContext);
    return logado ? <Route {...props} /> : <Redirect to="/login" />
}