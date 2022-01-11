import React , {useState , useContext , useEffect} from "react";
import newsContext from "../context/news/newsContext";
import { useNavigate } from "react-router-dom";

export default function AddYourArticle() {

  const {addNews} = useContext(newsContext);

  const navigate = useNavigate();

  const [input, setInput] = useState({title : '' , imageUrl : '' , author : '' , sourceName : '' , url : '' ,  description : ''}); 

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    } 
    // eslint-disable-next-line
  }, []);
  
  
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addNews(input);
    navigate('/YourArticles');
  }
  return (
    <div className="container my-2">
      <h1>Add New Article</h1>
      <form className="my-2"  method="post" onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Enter Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            value={input.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Enter Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            className="form-control"
            id="imageUrl"
            aria-describedby="emailHelp"
            value={input.imageUrl}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Enter Author Name
          </label>
          <input
            type="text"
            name="author"
            className="form-control"
            id="author"
            aria-describedby="emailHelp"
            value={input.author}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sourceName" className="form-label">
            Enter Source Name
          </label>
          <input
            type="text"
            name="sourceName"
            className="form-control"
            id="sourceName"
            aria-describedby="emailHelp"
            value={input.sourceName}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            Enter Source URL
          </label>
          <input
            type="text"
            name="url"
            className="form-control"
            id="url"
            aria-describedby="emailHelp"
            value={input.url}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Enter Description
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            value={input.description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          ADD ARTICLE
        </button>
      </form>
    </div>
  );
}
