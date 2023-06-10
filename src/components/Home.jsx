import React, { useEffect, useState } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

const Home = () => {
  return (
    <div className="bg-blue-600 min-h-[100vh] flex">
      <div className="w-[100%]">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-3xl text-white mb-5 mt-5">My Notes</h3>
          <AddNote />
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default Home;
