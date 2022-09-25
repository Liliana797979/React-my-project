import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as articleService from '../../../../services/articleService';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext';
import './ArticleEdit.css';
import { Loading } from '../../../shared/Loading';

export const ArticleEdit = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  useEffect(() => {
    articleService
      .getArticleById(articleId)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const [errors, setErrors] = useState({});
  const [article, setArticle] = useState({

  });
  const { user } = useContext(AuthContext);

  const changeHandler = (e) => {
    setArticle((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const editHandler = (e) => {
    e.preventDefault();

    article.modified = user.username;

    articleService
      .editArticle(article, articleId)
      .then(() => {
        toast.success('Successfully updated article!');
        navigate(`/article/list/${articleId}`);
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  const requiredField = (e) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: article[e.target.name].length < 1,
    }));
  };

  const required = article?.headline?.length > 0 && article?.content?.length > 0;
  const isFormValid = required && !Object.values(errors).some((x) => x);

  return (
    <form onSubmit={editHandler}>
      <div className="container article">
        <>
          {Object.keys(article).length === 0 ? (
            <Loading />
          ) : (
              <fieldset>
                <h2 className="label">Update article</h2>
                {/* headline */}
                <p className="field field-icon">
                  <label htmlFor="headline"><span><i className="fas fa-heading" /></span></label>
                  <input type="text"
                    name="headline"
                    placeholder="Enter your title"
                    defaultValue={article.headline || ''}
                    onChange={changeHandler}
                    onBlur={(e) => requiredField(e)} />
                </p>

                {errors.headline && (
                  <p className="alert alert-danger">Field is required!!</p>
                )}

                {/* content */}
                < p className="field field-icon" >
                  <textarea rows={8}
                    name="content"
                    placeholder="Enter yout content here"
                    defaultValue={article.content}
                    onChange={changeHandler}
                    onBlur={(e) => requiredField(e)} />
                </p >

                {errors.content && (
                  <p className="alert alert-danger">Field is required!!</p>
                )}

                {/* imageUrl */}
                < p className="field field-icon" >
                  <label htmlFor="image"><span><i className="fa fa-image" /></span></label>
                  <input type="text"
                    name="image"
                    placeholder="Add image link"
                    defaultValue={article.image}
                    onChange={changeHandler}
                  />
                </p >
                <div className="buttons">
                  <Link to={`/article/list/${articleId}`} className="btn btn-warning btn-block">Cancel </Link>
                  <button className="btn btn-primary btn-block" disabled={!isFormValid}> Update article</button >
                </div >
              </fieldset >
          )}
        </>
      </div>
    </form >
  );
};
