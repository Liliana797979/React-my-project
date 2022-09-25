import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext';

import * as articleService from '../../../../services/articleService';

export const ArticleCreate = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    headline: '',
    content: '',
    image: '',
  });
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const author = user.username;

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    values.author = author;

    articleService
      .createArticle(values)
      .then(() => {
        toast.success('Successfully Created article!');
        navigate('/article/list');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const requiredField = (e) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: values[e.target.name].length < 1,
    }));
  };

  const required = values.headline.length > 0 && values.content.length > 0;
  const isFormValid = required && !Object.values(errors).some((x) => x);

  return (
    <form onSubmit={submitHandler}>
      <div className="container article">
        <fieldset>
          <h2 className="label">Create new article</h2>
          {/* headline */}
          <p className="field field-icon">
            <label htmlFor="headline">
              <span>
                <i className="fas fa-heading" />
              </span>
            </label>
            <input
              type="text"
              name="headline"
              placeholder="Enter your title"
              value={values.headline}
              onChange={changeHandler}
              onBlur={(e) => requiredField(e)}
            />
          </p>

          {errors.headline && (
            <p className="alert alert-danger">Field is required!!</p>
          )}

          {/* content */}
          <p className="field field-icon">
            <textarea
              rows={8}
              name="content"
              placeholder="Enter yout content here"
              value={values.content}
              onChange={changeHandler}
              onBlur={(e) => requiredField(e)}
            />
          </p>

          {errors.content && (
            <p className="alert alert-danger">Field is required!!</p>
          )}

          {/* imageUrl */}
          <p className="field field-icon">
            <label htmlFor="image">
              <span>
                <i className="fa fa-image" />
              </span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="Add image link"
              value={values.image}
              onChange={changeHandler}
            />
          </p>
          <button className="btn btn-primary btn-block" disabled={!isFormValid}>
            Submit your article
          </button>
        </fieldset>
      </div>
    </form>
  );
};
