import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./Pages/LoginAndRegistration/Login";
import AddMovie from "./Pages/Admin/addMovies";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./hooks/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/LoginAndRegistration/Register";
import Home from "./Pages/Home/Home";
import ViewShowtime from "./Pages/User/viewShowtime";
import MovieCard from "./Pages/User/MovieCard";
import Movie from "./Pages/User/Movie";
import AddImage from "./Pages/Admin/AddImage";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const [isLoading, setIsLoading] = useState(false);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
