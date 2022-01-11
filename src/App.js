import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import UserArticle from "./components/UserArticle";
import AddYourArticle from "./components/AddYourArticle";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import AlertState from './context/alerts/AlertState'
import NewsState from './context/news/NewsState'

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
      <BrowserRouter>
        <AlertState>
        <NewsState>
        <Navbar key="navbar" />
        <Alert message="Great!! you are leaning a new skiil..."/>
        <Routes>
          <Route exact path="/" element={<News key="general"/>}/>
          <Route exact path="YourArticles" element={<UserArticle key="your-articles"/>}/>
          <Route exact path="AddYourArticle" element={<AddYourArticle key="your-articles"/>}/>
          <Route exact path="login" element={<Login key="login"/>}/>
          <Route exact path="signup" element={<SignUp key="signup"/>}/>
        </Routes>
        </NewsState>
        </AlertState>
      </BrowserRouter>
  );
}

export default App;
