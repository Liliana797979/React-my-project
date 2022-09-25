import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as articleService from '../../../../services/articleService';
import { Loading } from '../../../shared/Loading';
import { Pagination } from '../../../shared/pagination/Pagination';
import { ArticleItem } from '../article-item/ArticleItem';

import './ArticleList.css';

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3);

  const indexOfLastPost = currentPage * articlesPerPage;
  const indexOfFirstPost = indexOfLastPost - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    articleService
      .getAllArticles()
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
      <h2>Articles</h2>
      {isLoading ? (
        <Loading />
      ) : articles.length !== 0 ? (
        currentArticles.map((x) => <ArticleItem key={x._id} article={x} />)
      ) : (
        <p className="create">
          There are no articles created yet.
          <Link to="/article/create">Create new article</Link>
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
