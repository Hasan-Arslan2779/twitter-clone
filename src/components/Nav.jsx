import React, { useState } from "react";
import { auth } from "../firebase/config";
import { navSections } from "../utils/constant";
import userPng from "../assets/user.png";
import { signOut } from "firebase/auth";
const Nav = () => {
  useState;
  return (
    <nav className=" pl-4 flex pr-8 flex-col   justify-between h-[100vh]">
      {/* Navigasayyon Linkleri */}
      <div className="  ">
        <img
          className="w-10 pb-10 pt-2 "
          src="/public/twiter-white.webp"
          alt=""
        />
        {navSections.map((sec, i) => (
          <div className="m-2 flex items-center  rounded-full  hover:bg-blue-300 transition  p-3 cursor-pointer  text-md  ">
            <div className=" inline-block" key={i}>
              {sec.icon}
            </div>
            <span className="ml-3 gap-4 font-bold pr-2  ">{sec.title}</span>
          </div>
        ))}
      </div>
      {/* Kullanıcı Bilgileri */}
      <div className="flex flex-wrap  p-2 gap-3 items-center">
        <img
          src={
            auth?.currentUser?.photoURL ? auth.currentUser.photoURL : userPng
          }
          className="rounded-full  w-14"
          alt=""
        />
        <div className="flex items-center flex-col">
          <span className="text-md font-bold text-gray-600">
            {auth?.currentUser?.displayName}
          </span>
          <span className="text-sm text-gray-400">
            @{auth?.currentUser?.displayName?.toLocaleLowerCase()}
          </span>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="hover:bg-blue-300 font-bold w-full rounded-full py-2 px-6   p-3 mb-4 md"
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Nav;
