import React from "react";
import SearchBar from "../components/SearchBar.jsx";
import CardGroup from "../CardGroup.jsx";

const options = {
  club_name: "UQ Poop",
  club_logo:
    "https://img.freepik.com/premium-vector/cute-character-poop-kawaii-black-outline-vector-isolated-illustration-doodle-style_485992-757.jpg?w=360",
  club_description: "The official UQ Poop Club",
  club_website: "https://uq-potty-pal.vercel.app",
};

function Clubs() {
  return (
    <>
      <div className="flex w-full justify-center items-center flex-col align-middle mt-[2%]">
        <div className="flex w-[50%] flex-row justify-center z-40 sticky top-6">
          <SearchBar
            width={`w-[100%] hover:w-[100%] input-info rounded-lg`}
            placeholder="Search for clubs"
          />
          <button className="btn btn-outline w-36 rounded-lg flex-row ml-3">
            Search
          </button>
        </div>
        <CardGroup />
      </div>
    </>
  );
}

export default Clubs;
