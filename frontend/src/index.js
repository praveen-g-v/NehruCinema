import React from "react";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<Home />}>
              <Route path="addmovie" element={<AddMovie />} />
              <Route path="viewmovie" element={<viewShowtime />} />
            </Route>
          </Routes>

          {/* <Route
          path="library"
          element={
            <Home
              userLog={userLog}
              userBasicData={userBasicData}
              setUserLog={updateUserLog}
              ScreenSize={ScreenSize}
            />
          }
        >
          <Route path="bookscatalogue" element={<BookCatalogue />} />
          <Route path="actionitem" element={<PendingBooks />} />
          <Route path="addbook" element={<AddNewBook />} />
          <Route path="managebooks" element={<ManageBooks />} />
          <Route path="*" element={<Error />} /> 
          </Route> */}
          {/* <Header /> */}
          {/* <App /> */}
          {/* <Login /> */}
          {/* <AddMovie /> */}
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
