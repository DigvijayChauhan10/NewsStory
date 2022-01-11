import NewsContext from "./newsContext";
import { useState  , useContext } from "react";
import alertContext from "../alerts/alertContext";

const NewsState = (props) => {

    const host = "http://localhost:8000";

    const [news, setNews] = useState([]);

    const {showAlert} = useContext(alertContext);

    // Fetch All Notes
    const fetchAllNews = async () => {
        // API CALL
        const response = await fetch(`${host}/api/news/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" :  localStorage.getItem('token'),
        },
        });
        const result = await response.json();
        setNews(result.articles);
    };
    
    // Add News
    const addNews = async ({ title, description, imageUrl , url , author , sourceName  }) => {
        // API CALL
        const response = await fetch(`${host}/api/news/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
        },
        body: JSON.stringify({  title, description, imageUrl , url , author , sourceName }),
        });
        const result = await response.json();
        if (result.news) {
        setNews(news.concat(result.news));
        showAlert('Node Added Successfully' , 'success');
        }else{
        showAlert('Somthing Wrong, Try Again' , 'warning');
        }
    };


    // Delete News
    const deleteNews = async (articleId) => {
        // API CALL
        const response = await fetch(`${host}/api/news/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
        },
        body: JSON.stringify({  articleId }),
        });
        const updatedNews = await response.json();
        if(updatedNews.type === 'success'){
        const newNews = news.filter((news) => news._id !== articleId);
        setNews(newNews);
        showAlert('Node Deleted Successfully' , 'success');
        }else{
        showAlert('Somthing Wrong, Try Again' , 'warning');
        }
    };



    // Edit News
    const editNews = async ( {_id ,title, description, imageUrl , url , author , sourceName} ) => {
        
        const response = await fetch(`${host}/api/news/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
        },
        body: JSON.stringify({ articleId : _id , title, description, imageUrl , url , author , sourceName  }),
        });
        const updatedNews = await response.json();
        let newNews = JSON.parse(JSON.stringify(news));
        if (updatedNews.title) {
        for(let i=0 ; i<newNews.length ; i++){
            if (newNews[i]._id === _id) {
                newNews[i].title = title;
                newNews[i].description = description;
                newNews[i].imageUrl = imageUrl;
                newNews[i].url = url;
                newNews[i].author = author;
                newNews[i].sourceName = sourceName;
            break;
            }
        }
        setNews(newNews);
        showAlert('Node Edited Successfully' , 'success');
        }else{
        showAlert('Somthing Wrong, Try Again' , 'warning');
        }
    };

    return (
        <NewsContext.Provider value={{ news, setNews , addNews , fetchAllNews , editNews , deleteNews }}>
          {props.children}
        </NewsContext.Provider>
      );
}

export default NewsState;