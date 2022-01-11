import React , {useContext , useEffect , useRef , useState } from "react";
import ArticleItem from "./ArticleItem";
import newsContext from "../context/news/newsContext";
import { useNavigate } from "react-router-dom";

export default function UserArticle() {

  const { news , fetchAllNews , editNews} = useContext(newsContext);

  const [input, setInput] = useState({title : '' , imageUrl : '' , author : '' , sourceName : '' , url : '' ,  description : ''}); 

  let navigate = useNavigate();

  const ref = useRef(null);
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchAllNews();
    }else{
      navigate('/login');
    } 
    // eslint-disable-next-line
  }, []);

  const openModal = (news) => {
     setInput(news);
     ref.current.click();
  };

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    editNews(input);
    ref.current.click();
  }
  return (
    
    <div className="container my-2">
    
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" ref={ref} style={ {display:'none'}}>
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                <div className="modal-footer">
              <button type="button"  className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
            </form>
            </div>
            
          </div>
        </div>
      </div>
      <h1>Your Articles</h1>
      <div className="container">
        <div className="row my-4">
        {news.length === 0 && <div className="container" >No News Found!</div>}
        {news.map((news) => {
            return (
              <div className="col-md-4" key={news.url}>
                  <ArticleItem key={news._id} news={news} openModal={openModal}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
