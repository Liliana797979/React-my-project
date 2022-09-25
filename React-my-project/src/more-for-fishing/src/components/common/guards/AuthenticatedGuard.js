import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

export const AuthenticatedGuard = ({children}) => {
    const { user } = useContext(AuthContext);
    
    if (!user.accessToken) {
        return <Navigate to="/user/login" replace />
    }

    return children ? children : <Outlet />  
};