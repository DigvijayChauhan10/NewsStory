import React , {useContext} from "react";
import newsContext from "../context/news/newsContext";

export default function ArticleItem(props) {

  const {deleteNews} = useContext(newsContext);
  return (
    <div className="card my-2">
      <img src={props.news.imageUrl} className="card-img-top" alt={props.news.title} />
      <div className="card-body">
        <h5 className="card-title">{props.news.title}</h5>
        <p className="card-text">{props.news.description}</p>
        <button className="btn btn-warning mx-1" onClick={() => props.openModal(props.news)}>
          EDIT
        </button>
        <button className="btn btn-danger mx-1" onClick={()=> deleteNews(props.news._id)}>
          DELETE
        </button>
      </div>
    </div>
  );
}
