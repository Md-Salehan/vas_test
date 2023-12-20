import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../Common/Common';
import Login from "../Login/Login";
 
// handle the public routes
function PublicRoute() {
    const token = getToken();
    return !token ? <Login /> : <Navigate to="/Dashboard"/>
}
 
export default PublicRoute;