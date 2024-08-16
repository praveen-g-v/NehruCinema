import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../hooks/Theme";
import logo from "../../assets/NehruCimenaLogo.png";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../hooks/Loader";
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme if using Context

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}
function Login({ isLoading, setIsLoading }) {
  // const { theme } = useContext(ThemeContext);
  // const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme if using Context
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  const submit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.get("/login", {
        params: {
          email,
          password,
        },
      });
      if (res.status == 200) {
        setIsLoading(false);
        navigate(-1);
      }
      // if(res.status==)
      console.log(res);
    } catch (err) {
      if (err.response.status === 401) {
        alert(err.response.data.message);
        setEmail("");
        setPassword("");
        setIsLoading(false);
      }

      console.log(err);
    }
  };
  return (
    <>
      {isLoading ? <Loader isLoading={isLoading} /> : null}
      <div
        className={`w-screen flex h-full min-h-full flex-col justify-center px-6 py-12 lg:px-8 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        {/* <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button> */}
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class={`mx-auto h-25 w-25 ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            }`}
            src={logo}
            alt="Nehru Cinema"
          />
          {/* <h2
            class={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${
              theme === "light" ? "text-gray-900" : "text-gray-100"
            }`}
          >
            Sign in to your account
          </h2> */}
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6">
            <div>
              <label
                for="email"
                class={`block text-sm font-medium leading-6 ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class={`block text-sm font-medium leading-6 ${
                    theme === "light" ? "text-gray-900" : "text-gray-100"
                  }`}
                >
                  Password
                </label>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  autocomplete="current-password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(e) => {
                  submit(e);
                }}
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p
            class={`block text-sm font-medium leading-6 ${
              theme === "light" ? "text-gray-900" : "text-gray-100"
            }`}
          >
            Not a member?
            <Link
              to="/register"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              click here to Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
