import defaultAvatarPath from '../../../../assets/default-avatar-profile.png';
import Moment from 'moment';

import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import * as commentService from '../../../../services/commentService';
import { toast } from 'react-toastify';
import './CommentItem.css';

export const CommentItem = ({
  comment,
  onCommentDelete,
  onCommentLike,
  onCommentDislike,
}) => {
  Moment.locale('en');
  const { user, photo } = useContext(AuthContext);
  const [commentVaue, setComment] = useState(comment);

  const canModify = commentVaue.author === user.username || user.isAdmin;

  const canLike =
    !commentVaue.likes.includes(user.id) &&
    commentVaue.author !== user.username;

  const canDislike = commentVaue.likes.includes(user.id);
  const [isEditMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setComment((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const changeEditMode = () => {
    setEditMode(!isEditMode);
  };

  const deleteComment = () => {
    onCommentDelete(commentVaue._id);
  };

  const likeComment = () => {
    onCommentLike(commentVaue);
  };

  const dislikeComment = () => {
    onCommentDislike(commentVaue);
  };

  const editComment = (e) => {
    e.preventDefault();

    const body = commentVaue;
    body.author = user.username;
    body.authorPicture = photo;
    body.likes = commentVaue.likes;

    commentService
      .editComment(commentVaue._id, body)
      .then(() => {
        toast.success('Successfully updated comment!');
        setEditMode(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const requiredField = (e) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: commentVaue[e.target.name].length < 1,
    }));
  };

  const isFormValid =
    commentVaue.content.length && !Object.values(errors).some((x) => x);

  return (
    <div>
      {!isEditMode && (
        <div className="card mb-4">
          <div className="card-body">
            <p>{commentVaue.content}</p>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <img
                  src={
                    commentVaue.authorPicture === '' ||
                    commentVaue.authorPicture === 'null'
                      ? defaultAvatarPath
                      : commentVaue.authorPicture
                  }
                  alt="avatar"
                  width={25}
                  height={25}
                />
                <p className="small mb-0 ms-2 text-muted small">
                  <i className="fas fa-user" /> {commentVaue.author}
                </p>
                <p className="small mb-0 ms-2 text-muted small">
                  <b className="mb-1">posted:</b>:
                  <span className="fas fa-calendar p-1">
                    {' '}
                    {Moment(commentVaue._kmd['ect']).format('DD/MM/yyyy')}{' '}
                  </span>
                  <span className="fa fa-clock-o p-1">
                    {' '}
                    {Moment(commentVaue._kmd['ect']).format('HH:mm')}
                  </span>
                </p>
              </div>
              <div className="d-flex flex-row align-items-center">
                {canModify && (
                  <i
                    className="fas fa-edit mx-2 fa-xs text-black i-btn"
                    onClick={changeEditMode}
                    title="edit comment"
                  ></i>
                )}
                {canModify && (
                  <i
                    className="far fa-trash-alt mx-2 fa-xs text-black i-btn"
                    onClick={deleteComment}
                    title="delete comment"
                  ></i>
                )}
                {canLike && (
                  <i
                    className="fa fa-thumbs-o-up mx-2 fa-xs text-black i-btn"
                    onClick={likeComment}
                    title="like comment"
                  ></i>
                )}
                {canDislike && (
                  <i
                    className="fa fa-thumbs-o-down mx-2 fa-xs text-black i-btn"
                    onClick={dislikeComment}
                    title="dislike comment"
                  ></i>
                )}
              </div>
            </div>
            <p className="small mb-0 pt-2 text-muted small">
              <b>Likes:</b> {commentVaue.likes.length}
            </p>
          </div>
        </div>
      )}
      {isEditMode && (
        <form className="mb-3" onSubmit={editComment}>
          {/* content */}
          <p className="form-outline mb-4">
            <textarea
              type="text"
              className="form-control"
              rows={3}
              name="content"
              value={commentVaue.content}
              onChange={changeHandler}
              onBlur={(e) => requiredField(e)}
            />
          </p>

          {errors.content && (
            <p className="alert alert-danger">Field is required!!</p>
          )}

          <button type="submit" className="btn btn-primary btn-sm mr-1" disabled={!isFormValid}>
            {' '}
            Edit comment
          </button>
          <button className="btn btn-warning btn-sm" onClick={changeEditMode}>
            Cancel{' '}
          </button>
        </form>
      )}
    </div>
  );
};
