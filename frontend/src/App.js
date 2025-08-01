import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import Login from "./Pages/LoginAndRegistration/Login";
import Register from "./Pages/LoginAndRegistration/Register";
import Home from "./Pages/Home/Home";
import AddMovie from "./Pages/Admin/addMovies";
import AddImage from "./Pages/Admin/AddImage";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./hooks/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewShowtime from "./Pages/User/viewShowtime";
import PlayVideo from "./Pages/Admin/PlayVideo";
import ViewMovie from "./Pages/Admin/viewMovie";
import CreateShowtime from "./Pages/Admin/ShowTiming";
import TheatreHall from "./Pages/Admin/TheatreHall";
import ShowsAiring from "./Pages/Main Page/ShowAiring";
import BookingPage from "./Pages/BookingPage/BookingPage";
import BookShow from "./Pages/BookingPage/BookShow";
import TicketBooked from "./Pages/BookingPage/TicketBooked";
import AdminDashboard from "./Pages/Admin/AdminHome";
import MovieDetails from "./Pages/User/MovieDetails";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route
                exact
                path="/login"
                element={
                  <Login isLoading={isLoading} setIsLoading={setIsLoading} />
                }
              />
              <Route
                exact
                path="/register"
                element={
                  <Register isLoading={isLoading} setIsLoading={setIsLoading} />
                }
              />
              <Route
                exact
                path="/"
                element={
                  <Home isLoading={isLoading} setIsLoading={setIsLoading} />
                }
              >
                <Route
                  path="admin-home"
                  element={
                    <AdminDashboard
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="moviedetails"
                  element={
                    <MovieDetails
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path=""
                  element={
                    <ShowsAiring
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="bookedTicket"
                  element={
                    <TicketBooked
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="bookshow"
                  element={
                    <BookShow
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="addmovie"
                  element={
                    <AddMovie
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="viewmovies"
                  element={
                    <ViewShowtime
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />

                <Route
                  path="addimage"
                  element={
                    <AddImage
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="playVideo"
                  element={
                    <PlayVideo
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="showDetails"
                  element={
                    <BookingPage
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="createshowtime"
                  element={
                    <CreateShowtime
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="theatrehall"
                  element={
                    <TheatreHall
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route
                  path="viewMovie"
                  element={
                    <ViewMovie
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
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

    //   <div className="App">
    //     <div class="min-h-full">
    //       <nav class="bg-gray-800">
    //         <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //           <div class="flex h-16 items-center justify-between">
    //             <div class="flex items-center">
    //               <div class="flex-shrink-0">
    //                 <img
    //                   class="h-8 w-8"
    //                   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
    //                   alt="Your Company"
    //                 />
    //               </div>
    //               <div class="hidden md:block">
    //                 <div class="ml-10 flex items-baseline space-x-4">
    //                   {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
    //                   <a
    //                     href="#"
    //                     class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
    //                     aria-current="page"
    //                   >
    //                     Dashboard
    //                   </a>
    //                   <a
    //                     href="#"
    //                     class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    //                   >
    //                     Team
    //                   </a>
    //                   <a
    //                     href="#"
    //                     class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    //                   >
    //                     Projects
    //                   </a>
    //                   <a
    //                     href="#"
    //                     class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    //                   >
    //                     Calendar
    //                   </a>
    //                   <a
    //                     href="#"
    //                     class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    //                   >
    //                     Reports
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //             <div class="hidden md:block">
    //               <div class="ml-4 flex items-center md:ml-6">
    //                 <button
    //                   type="button"
    //                   class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //                 >
    //                   <span class="absolute -inset-1.5"></span>
    //                   <span class="sr-only">View notifications</span>
    //                   <svg
    //                     class="h-6 w-6"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke-width="1.5"
    //                     stroke="currentColor"
    //                     aria-hidden="true"
    //                   >
    //                     <path
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                       d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    //                     />
    //                   </svg>
    //                 </button>

    //                 {/* <!-- Profile dropdown --> */}
    //                 <div class="relative ml-3">
    //                   <div>
    //                     <button
    //                       type="button"
    //                       class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //                       id="user-menu-button"
    //                       aria-expanded="false"
    //                       aria-haspopup="true"
    //                     >
    //                       <span class="absolute -inset-1.5"></span>
    //                       <span class="sr-only">Open user menu</span>
    //                       <img
    //                         class="h-8 w-8 rounded-full"
    //                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //                         alt=""
    //                       />
    //                     </button>
    //                   </div>

    //                   {/* <!--
    //               Dropdown menu, show/hide based on menu state.

    //               Entering: "transition ease-out duration-100"
    //                 From: "transform opacity-0 scale-95"
    //                 To: "transform opacity-100 scale-100"
    //               Leaving: "transition ease-in duration-75"
    //                 From: "transform opacity-100 scale-100"
    //                 To: "transform opacity-0 scale-95"
    //             --> */}
    //                   <div
    //                     class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    //                     role="menu"
    //                     aria-orientation="vertical"
    //                     aria-labelledby="user-menu-button"
    //                     tabindex="-1"
    //                   >
    //                     {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
    //                     <a
    //                       href="#"
    //                       class="block px-4 py-2 text-sm text-gray-700"
    //                       role="menuitem"
    //                       tabindex="-1"
    //                       id="user-menu-item-0"
    //                     >
    //                       Your Profile
    //                     </a>
    //                     <a
    //                       href="#"
    //                       class="block px-4 py-2 text-sm text-gray-700"
    //                       role="menuitem"
    //                       tabindex="-1"
    //                       id="user-menu-item-1"
    //                     >
    //                       Settings
    //                     </a>
    //                     <a
    //                       href="#"
    //                       class="block px-4 py-2 text-sm text-gray-700"
    //                       role="menuitem"
    //                       tabindex="-1"
    //                       id="user-menu-item-2"
    //                     >
    //                       Sign out
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div class="-mr-2 flex md:hidden">
    //               {/* <!-- Mobile menu button --> */}
    //               <button
    //                 type="button"
    //                 class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //                 aria-controls="mobile-menu"
    //                 aria-expanded="false"
    //               >
    //                 <span class="absolute -inset-0.5"></span>
    //                 <span class="sr-only">Open main menu</span>
    //                 {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
    //                 <svg
    //                   class="block h-6 w-6"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke-width="1.5"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    //                   />
    //                 </svg>
    //                 {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
    //                 <svg
    //                   class="hidden h-6 w-6"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke-width="1.5"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     d="M6 18L18 6M6 6l12 12"
    //                   />
    //                 </svg>
    //               </button>
    //             </div>
    //           </div>
    //         </div>

    //         {/* <!-- Mobile menu, show/hide based on menu state. --> */}
    //         <div class="md:hidden" id="mobile-menu">
    //           <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
    //             {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
    //             <a
    //               href="#"
    //               class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
    //               aria-current="page"
    //             >
    //               Dashboard
    //             </a>
    //             <a
    //               href="#"
    //               class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
    //             >
    //               Team
    //             </a>
    //             <a
    //               href="#"
    //               class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
    //             >
    //               Projects
    //             </a>
    //             <a
    //               href="#"
    //               class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
    //             >
    //               Calendar
    //             </a>
    //             <a
    //               href="#"
    //               class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
    //             >
    //               Reports
    //             </a>
    //           </div>
    //           <div class="border-t border-gray-700 pb-3 pt-4">
    //             <div class="flex items-center px-5">
    //               <div class="flex-shrink-0">
    //                 <img
    //                   class="h-10 w-10 rounded-full"
    //                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //                   alt=""
    //                 />
    //               </div>
    //               <div class="ml-3">
    //                 <div class="text-base font-medium leading-none text-white">
    //                   Tom Cook
    //                 </div>
    //                 <div class="text-sm font-medium leading-none text-gray-400">
    //                   tom@example.com
    //                 </div>
    //               </div>
    //               <button
    //                 type="button"
    //                 class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    //               >
    //                 <span class="absolute -inset-1.5"></span>
    //                 <span class="sr-only">View notifications</span>
    //                 <svg
    //                   class="h-6 w-6"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke-width="1.5"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    //                   />
    //                 </svg>
    //               </button>
    //             </div>
    //             <div class="mt-3 space-y-1 px-2">
    //               <a
    //                 href="#"
    //                 class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
    //               >
    //                 Your Profile
    //               </a>
    //               <a
    //                 href="#"
    //                 class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
    //               >
    //                 Settings
    //               </a>
    //               <a
    //                 href="#"
    //                 class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
    //               >
    //                 Sign out
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </nav>

    //       <header class="bg-white shadow">
    //         <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    //           <h1 class="text-3xl font-bold tracking-tight text-gray-900">
    //             Dashboard
    //           </h1>
    //         </div>
    //       </header>
    //       <main>
    //         <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    //           {/* <!-- Your content --> */}
    //         </div>
    //       </main>
    //     </div>
    //   </div>
  );
}

export default App;
