import { Link } from 'react-router-dom';

import './Landing.css';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export const Landing = () => {
  const { user } = useContext(AuthContext);
  const isLogged = user.accessToken;
  const isAdmin = user.isAdmin;
  const userId = user.id;

  return (
    <div className="landing-container">
      <div className="m-5">
        <h1 className="text-center ">Welcome to our fishing blog!</h1>
      </div>

      {!isLogged && (
        <>
          <div className="mt-5">
            <div className="d-flex justify-content-between">
              <div className="card text-white card border-primary mb-3 container-fluid content-row landing">
                <div className="card-body container-fluid content-row d-flex flex-column">
                  <h4 className="card-title container-fluid">New member?</h4>
                  <p className="card-text align-self-md-center">
                    Get registration and start reading and posting
                  </p>
                </div>
                <div className="card-buttons align-self-md-center mb-3">
                  <Link to="/user/register" className="btn btn-secondary">
                    <i className="fas fa-user-plus p-1"></i>Register
                  </Link>
                </div>
              </div>
              <div className="col py-3 px-md-5 bordered col-example"></div>
              <div className="card text-white card border-primary mb-3 container-fluid content-row landing">
                <div className="card-body container-fluid content-row d-flex flex-column">
                  <h4 className="card-title container-fluid ">
                    Already registered?
                  </h4>
                  <p className="card-text align-self-md-center">
                    Login and manage your articles
                  </p>
                </div>
                <div className="card-buttons align-self-md-center mb-3">
                  <Link to="/user/login" className="btn btn-secondary">
                    <i className="fas fa-user-plus p-1"></i>Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isLogged && (
        <>
          <div>
            <div className="card text-white bg-info mb-3 landing">
              {isAdmin && (
                <>
                  <div className="card-body">
                    <h4 className="card-title container-fluid">
                      Admin management
                    </h4>
                    <p className="card-text align-self-md-center">
                      Manage users and articles
                    </p>
                    <div id="buttons">
                      <Link to="/admin/user-management" className="btn btn-secondary">
                        <i className="fas fa-user-plus p-1"></i>View and manage
                        users
                      </Link>
                      <Link to="/article/list" className="btn btn-secondary">
                        <i className="fas fa-user-plus p-1"></i>View and manage
                        articles
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="card text-white bg-info mb-3 landing">
              <div className="card-body">
                <h4 className="card-title container-fluid">Profile</h4>
                <p className="card-text align-self-md-center">
                  View and manage your profile
                </p>
                <div id="buttons">
                  <Link to={`/user/profile/${userId}`} className="btn btn-secondary">
                    <i className="fas fa-user-plus p-1"></i>My profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="card text-white bg-info mb-3 landing">
              <div className="card-body">
                <h4 className="card-title container-fluid">Articles</h4>
                <p className="card-text align-self-md-center">
                  Create, view and manage articles
                </p>
                <div id="buttons">
                  <Link to="/article/create" className="btn btn-secondary">
                    <i className="fas fa-user-plus p-1"></i>Create new article
                  </Link>
                  <Link to="/article/my-articles" className="btn btn-secondary">
                    <i className="fas fa-user-plus p-1"></i>My articles
                  </Link>
                  <Link to="/article/list" className="btn btn-secondary">
                    <i className="fas fa-user-plus p-1"></i>All articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
