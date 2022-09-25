import * as authenticationService from '../../../services/authenticationService';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';

export const Logout = () => {
  const navigate = useNavigate();
  const { userLogout } = useContext(AuthContext);

  useEffect(() => {
    authenticationService
      .logout()
      .then(() => {
        userLogout();
        localStorage.clear();
        toast.success('Successfully logout!');
        navigate('/user/login');
      })
      .catch((err) => {
        toast.error(err);
      });
  });
};
