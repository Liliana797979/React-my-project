import { useState } from 'react';

import './CommentCreate.css';

export const CommentCreate = ({ onCommentCreate }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    content: '',
  });

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submiHandler = (e) => {
    onCommentCreate(e, values);
    setValues({ content: '' });
  };

  const requiredField = (e) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: values[e.target.name].length < 1,
    }));
  };

  const isFormValid =
    values.content.length && !Object.values(errors).some((x) => x);

  return (
    <form onSubmit={(e) => submiHandler(e)}>
      <h5 className="label">Add comment</h5>

      {/* content */}
      <p className="form-outline mb-4">
        <textarea
          type="text"
          id="addANote"
          className="form-control"
          rows={3}
          placeholder="Type comment..."
          name="content"
          value={values.content}
          onChange={changeHandler}
          onBlur={(e) => requiredField(e)}
        />
      </p>

      {errors.content && (
        <p className="alert alert-danger">Field is required!!</p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={!isFormValid}
      >
        Submit comment
      </button>
    </form>
  );
};
