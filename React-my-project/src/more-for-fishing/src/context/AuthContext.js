import { createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const [photo, setPhoto] = useLocalStorage('photo', {});

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

    const userPhoto = (photoData) => {
        setPhoto(photoData);
    };


    return (
        <AuthContext.Provider value={{
            user: auth,
            photo: photo,
            userLogin,
            userLogout,
            userPhoto,
        }}>
            {children}
        </AuthContext.Provider>
    );
};