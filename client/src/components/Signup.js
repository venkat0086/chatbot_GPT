import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AlertPop from "./AlertPop";
import Spinner from "./Spinner";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    description: "",
  });
  const [popup, setPopup] = useState(false);
  const [popUpContent, setPopUpContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLoading = () => {
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_SERVER_URI}/api/users`;
      const { data: res } = await axios.post(url, data);
      if (res.message) {
        handleLoading();
      }
      console.log(res.message);
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
      {popup && <AlertPop content={popUpContent} variant severity="info" />}
      {loading && <Spinner />}
      <div className="flex justify-center items-center h-screen text-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md"
        >
          <h2 className="text-lg font-medium mb-6">Create Your Account</h2>
          <div className="flex gap-6 justify-between">
            <div className="mb-4">
              <label
                htmlFor="Name"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Firstname
              </label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Mobile Number"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Lastname
              </label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-6 justify-between">
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
                value={data.email}
                required
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
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
          </div>
          <div className="flex gap-6 justify-between mb-6">
            <div className="mb-4">
              <label
                htmlFor="Number"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                maxLength="10"
                pattern="[0-9]{0,10}"
                onChange={handleChange}
                value={data.mobile}
                required
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Description"
                className="block text-gray-700 font-medium mb-2 text-left"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={data.description}
                required
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 text-center rounded-md"
          >
            Register
          </button>
          <div className="flex justify-center items-center mt-6">
            <span className="text-sm text-gray-600 mr-2">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="text-sm text-blue-500 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
