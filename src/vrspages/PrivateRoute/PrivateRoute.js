import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../Common/Common';
import Dashboard from "../Dashboard/Dashboard";
 
// handle the private routes
function PrivateRoute() {
    // debugger;
    // const token = getToken();
    // return token ? <Dashboard /> : <Navigate to="/" />
    return <Dashboard />
}
 
export default PrivateRoute;