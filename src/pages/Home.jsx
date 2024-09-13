import React from "react";

const Home = () => {
  return (
    <>
      <div className="flex w-full">
        <div className="flex-col mt-[8%] ml-[8%]">
          <h1 className="text-6xl mt-1/2 font-weight-200">
            Welcome to the{" "}
            <span className="text-info text-7xl hover:text-shadow-lg shadow-info duration-500 underline-offset-8">
              YunIverse
            </span>
            .
          </h1>
          <h1 className="text-5xl mt-10 font-weight-600">
            Find Events and Clubs
          </h1>
          <h1 className="text-4xl mt-5 shadow-accent text-accent font-weight-600">
            <span className="hover:text-shadow-lg duration-500">Anytime. </span>
            <span className="hover:text-shadow-lg duration-500">Anywhere.</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
