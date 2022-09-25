import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { Header } from './components/common/header/Header';
import { Footer } from './components/common/footer/Footer';
import { Landing } from './components/features/landing/Landing';
import { Register } from './components/authentication/register/Register';
import { Login } from './components/authentication/login/Login';
import { Logout } from './components/authentication/logout/Logout';
import { NotFound } from './components/features/not-found/NotFound';
import { Profile } from './components/authentication/profile/view-profile/Profile';
import { EditProfile } from './components/authentication/profile/edit-profile/EditProfile';

import { ToastContainer } from 'react-toastify';
import { ArticleCreate } from './components/features/article/article-create/ArticleCreate';
import { ArticleList } from './components/features/article/article-list/ArticleList';
import { AuthProvider } from './context/AuthContext';
import { AuthenticatedGuard } from './components/common/guards/AuthenticatedGuard';
import { AdminGuard } from './components/common/guards/AdminGuard';
import { UnAuthenticatedGuard } from './components/common/guards/UnAuthenticatedGuard';
import { Loading } from './components/shared/Loading';
import { ArticleDetails } from './components/features/article/article-details/ArticleDetails';

import './App.css';
import { ArticleEdit } from './components/features/article/article-edit/ArticleEdit';
import { ArticleUser } from './components/features/article/article-user/ArticleUser';

const Admin = lazy(() => import('./components/admin/Admin'));

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<UnAuthenticatedGuard />}>
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
          </Route>
          <Route element={<AuthenticatedGuard />}>
            <Route path="/user/logout" element={<Logout />} />
            <Route path="/user/profile/:userId" element={<Profile />} />
            <Route
              path="/user/profile/edit/:userId"
              element={<EditProfile />}
            />
            <Route path="/article/create" element={<ArticleCreate />} />
            <Route path="/article/list" element={<ArticleList />} />
            <Route path="/article/my-articles" element={<ArticleUser />} />
            <Route path="/article/list/:articleId" element={<ArticleDetails />} />
            <Route path="/article/list/:articleId/edit" element={<ArticleEdit />} />
            <Route element={<AdminGuard />}>
              <Route
                path="/admin/user-management"
                element={
                  <Suspense fallback={<Loading/>}>
                    <Admin />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
