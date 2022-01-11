import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

export default function News() {
  const [articles, setArticles] = useState([]);
  

  const fetchAPIData = async () => {
    const url = "http://localhost:8000/api/news/all/";
    const data = await fetch(url);
    const result = await data.json();
    setArticles(result.articles);
  };

  useEffect(() => {
    fetchAPIData();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container my-2">
      <h1>Great Stories in Few Words</h1>
      <div className="container">
        <div className="row my-4">
          {articles.map((data, id) => {
            return (
              <div className="col-md-4" key={data.url}>
                <NewsItem key={id} newsData={data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
