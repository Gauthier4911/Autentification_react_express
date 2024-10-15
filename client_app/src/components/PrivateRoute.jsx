import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthUser from "../../store.jsx"; 

const PrivateRoute = ({ children }) => {
    const user = useAuthUser((state) => state.USER);
    return user && Object.keys(user).length > 0 ? children : <Navigate to="/login" />;
};

export default PrivateRoute;