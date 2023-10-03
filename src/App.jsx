import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "./firebase/config";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="bg-white sticky top-0">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
