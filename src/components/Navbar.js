import React , {useContext} from "react";
import { Link , useNavigate} from "react-router-dom";
import newsContext from '../context/news/newsContext';
import alertContext from '../context/alerts/alertContext';

export default function Navbar() {

  const {setNews} = useContext(newsContext);
  const {showAlert} = useContext(alertContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setNews([]);
    showAlert('Successfully Logged Out' , 'success');
    navigate('/login');
  }

  return (
    <div className="conatiner">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Short Story
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only"></span>
              </Link>
            </li>
            {localStorage.getItem('token') ? 
            <>
            <li className="nav-item active">
              <Link className="nav-link" to="YourArticles">
                Your Articles <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="AddYourArticle">
                Add Your Article <span className="sr-only"></span>
              </Link>
            </li> 
            </> : <></>}
            
          </ul>
          {!localStorage.getItem('token') ? <form><Link className="btn btn-primary mx-3" to="/login" role="button">Login</Link><Link className="btn btn-primary mx-3" to="/signup" role="button">SignUp</Link></form>
            : <button className="btn btn-primary mx-3" onClick={handleLogout} >Logout</button>
          }
        </div>
      </nav>
    </div>
  );
}
