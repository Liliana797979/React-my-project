import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext';
import * as articleService from '../../../../services/articleService';
import { Loading } from '../../../shared/Loading';
import { Pagination } from '../../../shared/pagination/Pagination';
import { ArticleItem } from '../article-item/ArticleItem';

import './ArticleUser.css';

export const ArticleUser = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3);
  const { user } = useContext(AuthContext);

  const indexOfLastPost = currentPage * articlesPerPage;
  const indexOfFirstPost = indexOfLastPost - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    articleService
      .getUserArticles(user.username)
      .then((data) => {
        setArticles(data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  return (
    <div className="container article">
      <h2>My Articles</h2>
      {isLoading ? (
        <Loading />
      ) : currentArticles.length !== 0 ? (
        currentArticles.map((x) => <ArticleItem key={x._id} article={x} />)
      ) : (
        <p className="create">
          You haven't created any articles.{' '}
          <Link to="/article/create">Create new article</Link>
          Want to read articles from other authors? Go to{' '}
          <Link to="/article/list">All articles</Link>
        </p>
      )}
      {articles.length > articlesPerPage ? (
        <Pagination
          itemsPerPage={articlesPerPage}
          totalItems={articles.length}
          paginate={paginate}
        />
      ) : null}
    </div>
  );
};
