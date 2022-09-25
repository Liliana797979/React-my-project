import { Link, useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';

import * as authenticationService from '../../../services/authenticationService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const codes = [
  { value: '+359', label: '+359' },
  { value: '+44', label: '+44' },
  { value: '+33', label: '+33' },
];

export const Register = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    fullname: '',
    phoneCode: '+359',
    phoneNumber: '',
    photo: '',
    password: '',
    rePassword: '',
  });

  const navigate = useNavigate();
  const { userLogin, userPhoto } = useContext(AuthContext);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { rePassword, ...userData } = values;

    authenticationService
      .register(userData)
      .then(() => {
        toast.success('Successfully Registered!');
      }).then(() => {
        authenticationService.login({ username, password }).then((authData) => {
          const photo = authData['photo'];

          const sessionData = {
            accessToken: authData['_kmd']['authtoken'],
            username: authData['username'],
            id: authData['_id'],
            isAdmin:
              authData['_kmd']['roles'] !== undefined &&
              authData['_kmd']['roles'].length !== 0
                ? true
                : false,
          };
          userLogin(sessionData);
          userPhoto(photo);
          navigate('/');
        })
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const emailValidator = (e) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: !/\S+@\S+/.test(values[e.target.name]),
    }));
  };

  const fullNameValidator = (e) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: !/^([A-z]+\s[A-z]+)$/.test(
        values[e.target.name]
      ),
    }));
  };

  const phoneValidator = (e) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: !/^\d{9}$/.test(values[e.target.name]),
    }));
  };

  const comparePasswordValidator = (e, password) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: values[e.target.name] !== password,
    }));
  };

  const minLendValidator = (e, len) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: values[e.target.name].length < len,
    }));
  };

  const { username, fullname, password, rePassword } = values;
  const required = username && fullname && password && password && rePassword;

  const isFormValid = required && !Object.values(errors).some((x) => x);

  return (
    <form className="register" onSubmit={submitHandler}>
      <div className="container">
        <fieldset>
          <h2>Registration Form</h2>

          {/* email */}
          <p className="field field-icon">
            <label htmlFor="email">
              <span>
                <i className="fas fa-envelope"></i>
              </span>
            </label>
            <input
              type="email"
              name="username"
              id="email"
              placeholder="user@gmail.com"
              value={values.username}
              onChange={changeHandler}
              onBlur={(e) => emailValidator(e)}
            />
          </p>

          {errors.username && (
            <p className="alert alert-danger">Email is not valid!!</p>
          )}

          {/* fullname */}
          <p className="field field-icon">
            <label htmlFor="fullname">
              <span>
                <i className="fas fa-user"></i>
              </span>
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="FirstName LastName"
              value={values.fullname}
              onChange={changeHandler}
              onBlur={(e) => fullNameValidator(e)}
            />
          </p>

          {errors.fullname && (
            <p className="alert alert-danger">
              Full name input field must contain two names (letters only)
              separated by a space!
            </p>
          )}

          {/* phoneNumber */}

          <p className="field field-icon">
            <label htmlFor="phoneNumber">
              <span>
                <i className="fas fa-phone"></i>
              </span>
            </label>
            <select
              name="phoneCode"
              id="phoneCode"
              className="phoneCode"
              value={values.pho}
              onChange={changeHandler}
            >
              {codes.map((e, key) => {
                return (
                  <option key={key} value={e.value}>
                    {e.label}
                  </option>
                );
              })}
            </select>
            <input
              type="phoneNumber"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="885 888 888"
              value={values.phoneNumber}
              onChange={changeHandler}
              onBlur={(e) => phoneValidator(e)}
            />
          </p>

          {errors.phoneNumber && (
            <p className="alert alert-danger">Invalid phone number!</p>
          )}

          {/* photo */}
          <p className="field field-icon">
            <label htmlFor="fullname">
              <span>
                <i className="fa fa-image"></i>
              </span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Add image url"
              value={values.photo}
              onChange={changeHandler}
            />
          </p>

          {/* password */}

          <p className="field field-icon">
            <label htmlFor="password">
              <span>
                <i className="fas fa-lock"></i>
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              value={values.password}
              onChange={changeHandler}
              onBlur={(e) => minLendValidator(e, 3)}
            />
          </p>

          {errors.password && (
            <p className="alert alert-danger">
              Password should be at least 3 characters long!
            </p>
          )}

          {/* rePassword */}
          <p className="field field-icon">
            <label htmlFor="rePassword">
              <span>
                <i className="fas fa-lock"></i>
              </span>
            </label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              placeholder="******"
              value={values.rePassword}
              onChange={changeHandler}
              onBlur={(e) => comparePasswordValidator(e, password)}
            />
          </p>

          {errors.rePassword && (
            <p className="alert alert-danger">Passwords does not match!</p>
          )}

          <button className="btn btn-primary btn-block" disabled={!isFormValid}>
            Create Account
          </button>

          <p className="text-center">
            Have an account?
            <Link to="/user/login">Log In</Link>
          </p>

        </fieldset>
      </div>
    </form>
  );
};
