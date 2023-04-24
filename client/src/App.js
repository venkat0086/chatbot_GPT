import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./components/Chat";
import jwt_decode from "jwt-decode";
import Signup from "./components/Signup";
import Login from "./components/Signin";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [googleUser, setGoogleUser] = useState(null);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [manualUser, setManualUser] = useState(localStorage.getItem("token"));

  // // const manualUser = localStorage.getItem("token");

  // // if (manualUser) {
  // //   const decoded = jwt_decode(manualUser);
  // //   setUserId(decoded._id);
  // // }

  useEffect(() => {
    if (manualUser) {
      const decoded = jwt_decode(manualUser);
      setUserId(decoded._id);
      setUser(decoded);
    }
  }, [manualUser]);

  const getUser = async () => {
    // try {
    //   const url = `${process.env.REACT_APP_SERVER_URI}/auth/login/success`;
    //   const { data } = await axios.get(url, { withCredentials: true });
    //   console.log(data.user);
    //   setGoogleUser(data.user);
    //   setUserId(data.user._id);
    // } catch (err) {
    //   console.log(err);
    // }
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/auth/login/success`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setGoogleUser(res.data);
          setUserId(res.data._id);
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={manualUser || googleUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        exact
        path="/"
        element={
          manualUser || googleUser ? (
            <Navigate to={`/chat/${userId}`} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {(manualUser || googleUser) && (
        <Route
          path="/chat/:userId"
          exact
          element={
            <Chat userData={manualUser ? null : googleUser} manualUser={user} />
          }
        />
      )}
      {/* {user && (
        <Route
          path="/"
          exact
          element={<Navigate replace to={`/chat/${userId}`} />}
        />
      )} */}
      <Route path="/register" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
    </Routes>
  );
}

export default App;
