import React from "react";
import { FiSearch } from "react-icons/fi";
import { Timeline } from "react-twitter-widgets";
const Aside = () => {
  return (
    <div className="">
      <div className="flex items-center space-x-2  hover:border-blue-600  border-blue-300 border  p-3 m-3 bg-white rounded-full text-gray-400 ">
        <FiSearch className="h-5 w-5   " />
        <input
          type="text"
          className="focus:outline-none bg-transparent text-sm  bg-slate-900 placeholder-gray-600 w-full"
          placeholder="Search Twiter"
        />
      </div>
      <div className="mt-5 ">
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "reactjs",
          }}
          options={{
            height: "1000",
          }}
        />
      </div>
    </div>
  );
};

export default Aside;
