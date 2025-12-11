import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../Api/store';

const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/Login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
