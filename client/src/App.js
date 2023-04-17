import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "./components/Chat";
import jwt_decode from "jwt-decode";
import Signup from "./components/Signup";
import Login from "./components/Signin";

function App() {
  const user = localStorage.getItem("token");
  let userId;

  if (user) {
    const decoded = jwt_decode(user);
    userId = decoded._id;
  }
  return (
    <Routes>
      {user && <Route path="/chat/:userId" exact element={<Chat />} />}
      {user && (
        <Route
          path="/"
          exact
          element={<Navigate replace to={`/chat/${userId}`} />}
        />
      )}
      <Route path="/register" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
