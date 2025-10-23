import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.tsx'
import type React from 'react'

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
