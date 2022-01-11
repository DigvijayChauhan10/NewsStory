import React from "react";

export default function NewsItem(props) {
  const { sourceName, author, title, description, url, imageUrl } =
    props.newsData;

  return (
    <div className="card my-2">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h5 className="card-title">{sourceName}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{author}</p>
        <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">
          READ MORE
        </a>
      </div>
    </div>
  );
}
