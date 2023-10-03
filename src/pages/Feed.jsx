import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../components/Aside";
import Main from "../components/Main";
import Nav from "../components/Nav";
const Feed = () => {
  return (
    <div className="bg-white min-h-[100vh] text-black overflow-x-hidden">
      <div className="grid grid-cols-5">
        <Nav />
        <Main />
        <Aside />
      </div>
    </div>
  );
};

export default Feed;
