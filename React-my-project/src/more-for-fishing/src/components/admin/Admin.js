import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';
import { toast } from 'react-toastify';

import './Admin.css';
import { Loading } from '../shared/Loading';
import { Pagination } from '../shared/pagination/Pagination';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    adminService
      .getAllUsers()
      .then((data) => {
        setUsers(data);
      })
      .then((data) => {
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const suspendUserHandler = (userId) => {
    adminService
      .suspendUser(userId)
      .then(() => {
        toast.success('Successfully suspended user!');
      })
      .then(() => {
        adminService.getAllUsers().then((data) => {
          setUsers(data);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const restoreUserHandler = (userId) => {
    adminService
      .restoreUser(userId)
      .then(() => {
        toast.success('Successfully restored user!');
      })
      .then(() => {
        adminService.getAllUsers().then((data) => {
          setUsers(data);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="container admin-container">
      <h3>Admin panel - User management</h3>
      <ul className="list-group">
        {isLoading ? (
          <Loading />
        ) : (
          currentUsers.map((user) => {
            return (
              <li className="list-group-item" key={user._id}>
                <h5>{user.username}</h5>
                {user._kmd['status'] !== undefined ? (
                  <p>
                    {' '}
                    <i className="fas fa-ban" />
                    Suspended
                  </p>
                ) : null}
                {user._kmd['roles'] !== undefined &&
                user._kmd['roles'].length !== 0 ? (
                  <p>
                    {' '}
                    <i className="fas fa-user-shield" />
                    Admin
                  </p>
                ) : null}
                <div id="buttons">
                  {user._kmd['status'] === undefined ? (
                    <>
                      <Link
                        to={`/user/profile/${user._id}`}
                        className="btn btn-info"
                      >
                        Profile details
                      </Link>
                      &nbsp;
                      <Link
                        className="btn btn-success"
                        to={`/user/profile/edit/${user._id}`}
                      >
                        Update profile
                      </Link>
                      &nbsp;
                      {user._kmd['roles'] === undefined ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => suspendUserHandler(user._id)}
                        >
                          Suspend profile
                        </button>
                      ) : null}
                    </>
                  ) : null}
                  {user._kmd['status'] !== undefined ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => restoreUserHandler(user._id)}
                    >
                      Restore user
                    </button>
                  ) : null}
                </div>
                <hr />
              </li>
            );
          })
        )}
      </ul>
      <Pagination
        itemsPerPage={usersPerPage}
        totalItems={users.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Admin;
