import { Link } from 'react-router-dom';
import defaultAvatarPath from '../../../assets/default-avatar-profile.png';

import './Header.css';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export const Header = () => {

  const { user, photo } = useContext(AuthContext);

  const isLogged = user.accessToken;
  const isAdmin = user.isAdmin;
  const userId = user.id;
  const avatar = photo;
  let isExpanded = false;

  const toggle = () => {
    isExpanded = !isExpanded;
  }

  return (
    <header>
      <nav className="navbar navbar-dark bg-primary navbar-expand-md navbar-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse"
          aria-label="Toggle navigation" aria-expanded={isExpanded} onClick={toggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item" href="/">
              <Link to="/">
                <i className="fa fa-fw fa-home"></i>
                <span>Home</span>
              </Link>
            </li>
            {!isLogged ?
              <>
                <li className="nav-item">
                  <Link to="/user/login">
                    <i className="fa fa-sign-in-alt"></i>
                    <span>Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/register">
                    <i className="fas fa-user-plus"></i>
                    <span>Register</span>
                  </Link>
                </li>
              </> :
              <>
                <li className="nav-item">
                  <Link to="/article/create">
                    <i className="fa fa-plus"></i>
                    <span>Create article</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/article/my-articles">
                    <i className="fas fa-newspaper"></i>
                    <span>My articles</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/article/list">
                    <i className="fas fa-person-booth"></i>
                    <span>All articles</span>
                  </Link>
                </li>
              </>
            }

            {isAdmin && (
              <>
                <li className="dropdown">
                  <p
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <i className="fas fa-user-shield"></i>Admin
                  </p>
                  <ul className="dropdown-menu">
                    <Link to="/admin/user-management" className="dropdownItem">
                      User management
                    </Link>
                  </ul>
                </li>
              </>
            )}
          </ul>
          {isLogged && (
            <>
              <ul className="navbar-nav mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link to={`user/profile/${userId}`}>
                    <img
                      src={
                        avatar === 'null' || avatar === ''
                          ? defaultAvatarPath
                          : avatar
                      }
                      className="avatar"
                      alt="Avatar"
                    />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='user/logout'>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
