import { Link } from 'react-router-dom';
import Moment from 'moment';
import './ArticleItem.css'

export const ArticleItem = ({ article }) => {
  Moment.locale('en');
  return (
    <div className="card flex-md-row mb-4 shadow-sm h-md-250" id='article-item'>
      <div className="card-body d-flex flex-column align-items-start">
        <h4 className="d-inline-block mb-2">{article.headline}</h4>
        <div className="mb-1 text-muted small">
          {article._kmd['ect'] === article._kmd['lmt']
            ? <>
              <b>Created by:</b>
              <span className="fa fa-pencil p-1"> {article.author}</span>
            </>
            : <> <b>Modified by:</b>
              <span className="fa fa-pencil p-1"> {article.modified}</span>
            </>}
        </div>
        <div className="mb-1 text-muted small">
          {article._kmd['ect'] === article._kmd['lmt']
            ? <>
              <b>Published:</b>
              <span className="fas fa-calendar p-1"> {Moment(article._kmd['ect']).format('DD MMM yyyy')}</span>
              <span className="fa fa-clock-o p-1"> {Moment(article._kmd['ect']).format('HH:mm')}</span>
            </>
            : <>
              <b>Modified:</b>
              <span className="fas fa-calendar p-1"> {Moment(article._kmd['lmt']).format('DD MMM yyyy')}</span>
              <span className="fa fa-clock-o p-1"> {Moment(article._kmd['lmt']).format('HH:mm')}</span>
            </>}
        </div>
        <p className="text-muted small text-justify">{article.content.length > 500 ? article.content.substring(0, 500) + "..." : article.content}</p>
        <Link to={`/article/list/${article._id}`} className="btn btn-outline-primary">Continue reading</Link>
      </div>
      {article.image && <img
        className="card-img-right flex-auto d-none d-lg-block"
        alt="Thumbnail"
        src={article.image}
      />}
    </div>
  );
};
