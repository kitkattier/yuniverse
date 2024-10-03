import React, { useState } from "react";
import CardGroup from "../CardGroup.jsx";
import Map from "../components/Map.jsx";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";

function Events() {
  const [isCardView, setCardView] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const cardView = (switchToMap) => {
    setCardView(switchToMap ? 0 : 1); // Set to 0 for map view, 1 for card view
  };

  return (
    <>
      <div className="flex w-full justify-center items-center flex-col align-middle ">
        <div className="flex w-[50%] z-40 sticky top-6">
          <SearchBar
            width={`w-[100%] hover:w-[100%] input-info rounded-lg mb-2`}
            placeholder="Search for events"
            onSearch={(query) => setSearchQuery(query)}
          />
          <button className="btn btn-outline w-36 rounded-lg flex-row ml-3">
            Search
          </button>
        </div>
        <div>
          <button
            className="btn btn-info mx-1 w-28"
            onClick={() => cardView(true)}
          >
            Map View
          </button>
          <button
            className="btn btn-info mx-1 w-28"
            onClick={() => cardView(false)}
          >
            List View
          </button>
        </div>
        <div>
          <p className="text-xl mt-5">
            Can't find what you're looking for?{" "}
            <Link
              to="/create"
              className="text-accent text-xl hover:underline underline-offset-3"
            >
              Make your own event!
            </Link>
          </p>{" "}
        </div>
      </div>
      {isCardView ? (
        <CardGroup isClub={false} searchQuery={searchQuery} />
      ) : (
        <Map createMode={false} />
      )}
    </>
  );
}

export default Events;
