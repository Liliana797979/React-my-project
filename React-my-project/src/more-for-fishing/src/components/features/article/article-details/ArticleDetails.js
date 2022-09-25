import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as articleService from '../../../../services/articleService';
import * as commentService from '../../../../services/commentService';
import { Loading } from '../../../shared/Loading';
import Moment from 'moment';
import { AuthContext } from '../../../../context/AuthContext';
import { submitHandler } from '../../../shared/confirm-box/Confirm';
import { CommentCreate } from '../../comment/comment-create/CommentCreate';

import './ArticleDetails.css';
import { CommentItem } from '../../comment/comment-item/CommentItem';

export const ArticleDetails = () => {
  Moment.locale('en');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    commentService
      .getAllCommentsByArticle(articleId)
      .then((data) => {
        setComments(data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isExpanded, setExpanding] = useState(false);
  const { user, photo } = useContext(AuthContext);
  const navigate = useNavigate();

  const canModify = (articleAuthor) => {
    return articleAuthor === user.username || user.isAdmin;
  };

  const commentCreateHandler = (e, values) => {
    e.preventDefault();

    values.articleId = articleId;
    values.author = user.username;
    values.authorPicture = photo;
    values.likes = [];

    commentService
      .addComment(values)
      .then(() => {
        toast.success('Successfully Created comment!');
      })
      .then(() => {
        commentService.getAllCommentsByArticle(articleId).then((data) => {
          setComments(data);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const commentDeleteHandler = (commentIdParam) => {
    submitHandler(
      () =>
        commentService
          .deleteComment(commentIdParam)
          .then(() => {
            toast.success('Successfully deleted comment!');
          })
          .then(() => {
            commentService.getAllCommentsByArticle(articleId).then((data) => {
              setComments(data);
            });
          })
          .catch((err) => {
            toast.error(err);
          }),
      'Confirm deletion',
      'Are you sure that you want to delete the comment?'
    );
  };

  const commentLikeHandler = (comment) => {
    const body = comment;
    body.likes.push(user.id);

    commentService
      .editComment(comment._id, body)
      .then(() => {
        toast.success('Successfully like comment!');
      })
      .then(() => {
        commentService.getAllCommentsByArticle(articleId).then((data) => {
          setComments(data);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const commentDislikeHandler = (comment) => {
    const body = comment;
    const index = body.likes.indexOf(user.id);
    body.likes.splice(index, 1);

    commentService
      .editComment(comment._id, body)
      .then(() => {
        toast.success('Successfully dislike comment!');
      })
      .then(() => {
        commentService.getAllCommentsByArticle(articleId).then((data) => {
          setComments(data);
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const articleDeleteHandler = () => {
    submitHandler(
      () =>
        articleService
          .deleteArticle(articleId)
          .then(() => {
            commentService.deleteAllCommentsByArticle(articleId);
          })
          .then(() => {
            navigate('/article/list');
            toast.success('Successfully deleted article!');
          })
          .catch((err) => {
            toast.error(err);
          }),
      'Confirm deletion',
      `Are you sure that you want to delete ${article.headline}?`
    );
  };

  const toggle = () => {
    setExpanding(!isExpanded);
  };

  return (
    <>
      <div className="container article" id="article">
        <>
          {Object.keys(article).length === 0 ? (
            <Loading />
          ) : (
            <>
              <h4 className="panel-title">{article.headline}</h4>
              <div className="mb-2">
                {article.image && (
                  <img alt="Thumbnail" id="image" src={article.image} />
                )}
              </div>
              <div className="d-flex flex-column align-items-start menu">
                <div className="mb-1 text-muted small">
                  <b>Created by:</b>
                  <span className="fa fa-pencil p-1"> {article.author}</span>
                </div>

                <div className="mb-1 text-muted small">
                  <b>Published:</b>
                  <span className="fas fa-calendar p-1">
                    {' '}
                    {Moment(article._kmd['ect']).format('DD MMM yyyy')}
                  </span>
                  <span className="fa fa-clock-o p-1">
                    {' '}
                    {Moment(article._kmd['ect']).format('HH:mm')}
                  </span>
                </div>
              </div>

              {article._kmd['ect'] !== article._kmd['lmt'] ? (
                <>
                  <div className="d-flex flex-column align-items-start menu">
                    <div className="mb-1 text-muted small">
                      <b>Modified by:</b>
                      <span className="fa fa-pencil p-1">
                        {' '}
                        {article.modified}
                      </span>
                    </div>

                    <div className="mb-1 text-muted small">
                      <b>Modified:</b>
                      <span className="fas fa-calendar p-1">
                        {' '}
                        {Moment(article._kmd['lmt']).format('DD MMM yyyy')}
                      </span>
                      <span className="fa fa-clock-o p-1">
                        {' '}
                        {Moment(article._kmd['lmt']).format('HH:mm')}
                      </span>
                    </div>
                  </div>
                </>
              ) : null}
              <hr className="menu mb-1 mt-1" />
              <div className="article-content">
                <p className="text-justify">{article.content}</p>
              </div>
              {canModify(article.author) && (
                <div id="buttons">
                  <Link type="button" to="edit" className="btn btn-success">
                    Edit article
                  </Link>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={articleDeleteHandler}
                  >
                    Delete article
                  </button>
                </div>
              )}
            </>
          )}
        </>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="shadow-0 border" id="comments">
            <div className="card-body p-4">
              <CommentCreate onCommentCreate={commentCreateHandler} />
              {comments.length > 0 && (
                <div className="accordion accordion-flush mt-5">
                  <button
                    className="accordion-button collapsed"
                    aria-expanded={isExpanded}
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapse"
                    aria-controls="collapseExample"
                    onClick={toggle}
                  >
                    {isExpanded ? (
                      <span>Hide comments</span>
                    ) : (
                      <span>Show comments</span>
                    )}
                  </button>
                  <div className="collapse" id="collapse">
                    <div className="card card-body">
                      {isLoading ? (
                        <Loading />
                      ) : (
                        comments.map((x) => (
                          <CommentItem
                            key={x._id}
                            comment={x}
                            onCommentLike={commentLikeHandler}
                            onCommentDislike={commentDislikeHandler}
                            onCommentDelete={commentDeleteHandler}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
