import React, { useEffect, useState } from "react";
import Card from "./components/Card.jsx";
import {
  getClubs,
  updateClub,
  getEvents,
  updateEvent,
} from "../data-utils/api-utils.js";

function CardGroup({ isClub }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = isClub ? await getClubs() : await getEvents();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [isClub]);

  const handleUpdate = async (updatedItem) => {
    try {
      const updatedData = isClub
        ? await updateClub(updatedItem.club_id, updatedItem)
        : await updateEvent(updatedItem.event_id, updatedItem);

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedData.id ? updatedData : item
        )
      );
    } catch (error) {
      console.error(`Error updating ${isClub ? "club" : "event"}:`, error);
    }
  };

  return (
    <div className="flex flex-wrap flex-row w-full justify-center">
      {items.map((item) => (
        <Card
          options={item}
          key={item.id}
          isClub={isClub}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default CardGroup;
