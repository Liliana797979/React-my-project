import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

export const UnAuthenticatedGuard = ({children}) => {
    const { user } = useContext(AuthContext);
    
    if (user.accessToken) {
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />  
};