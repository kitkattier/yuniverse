import React, { useEffect, useState } from "react";
import Card from "./components/Card.jsx";
import { getClubs } from "../data-utils/api-utils.js";

function CardGroup() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const clubsData = await getClubs();
        setClubs(clubsData);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    }

    fetchClubs();
  }, []);

  return (
    <div className="flex flex-wrap flex-row w-full justify-center">
      {clubs.map((club) => (
        <Card options={club} key={club.id} />
      ))}
    </div>
  );
}

export default CardGroup;
