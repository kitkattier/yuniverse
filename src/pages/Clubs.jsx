import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import CardGroup from "../CardGroup.jsx";

function Clubs() {
  return (
    <>
      <div className="flex w-full justify-center items-center flex-col align-middle mt-[2%]">
        <div className="flex w-[50%] z-40 sticky top-6">
          <SearchBar
            width={`w-[100%] hover:w-[100%] input-info rounded-lg`}
            placeholder="Search for clubs"
          />
          <button className="btn btn-outline w-36 rounded-lg flex-row ml-3">
            Search
          </button>
        </div>
        <div>
          <p className="text-xl mt-5">
            Can't find what you're looking for?{" "}
            <Link
              to="/create"
              className="text-accent text-xl hover:underline underline-offset-3"
            >
              Make your own club!
            </Link>
          </p>{" "}
        </div>
        <CardGroup isClub={true} />
      </div>
    </>
  );
}

export default Clubs;
