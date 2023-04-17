import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AlertPop from "./AlertPop";
import jwt_decode from "jwt-decode";
import Spinner from "./Spinner";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  // const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popUpContent, setPopUpContent] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_SERVER_URI}/api/auth`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      if (res) {
        handleLoading();
        const decoded = jwt_decode(res.data);
        console.log(decoded);
        window.location = `/chat/${decoded._id}`;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setLoading(false);
        setPopup(true);
        setPopUpContent(error.response.data.message);
        setTimeout(() => {
          setPopup(false);
        }, 3000);
      }
    }
  };

  return (
    <div>
      {popup && <AlertPop content={popUpContent} severity="error" />}
      {loading && <Spinner />}
      <div className="flex justify-center items-center h-screen text-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md"
        >
          <h2 className="text-lg font-medium mb-6">Login to your Account</h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2 text-left"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
              value={data.email}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-left"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
          <div className="flex justify-center items-center mt-6">
            <span className="text-sm text-gray-600 mr-2">
              Don't have an account?
            </span>
            <Link
              to="/register"
              className="text-sm text-blue-500 hover:text-blue-700 font-medium"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
