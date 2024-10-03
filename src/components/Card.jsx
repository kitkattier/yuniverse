import React, { useState } from "react";
import { deleteClub, deleteEvent } from "../../data-utils/api-utils";

function Card({ options, isClub, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize edit data based on isClub
  const initialEditData = isClub
    ? { ...options } // For club
    : {
        event_name: options.event_name,
        event_description: options.event_description,
        event_datetime: options.event_datetime,
        event_location: options.event_location,
        creator_name: options.creator_name,
        ticket_link: options.ticket_link,
      }; // For event

  const [editData, setEditData] = useState(initialEditData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const performAndRefresh = async (action) => {
    try {
      if (action === "delete") {
        if (isClub) {
          await deleteClub(options.club_id);
        } else {
          await deleteEvent(options.event_id);
        }
        window.location.reload();
      } else if (action === "save") {
        await onUpdate(editData);
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      window.alert(`Error ${action} ${isClub ? "club" : "event"}:`, error);
    }
  };

  return (
    <div className="card flex outline w-64 shadow-lg shadow-neutral mt-[5%] mx-5">
      <div className="flex">
        <button
          className="btn btn-warning absolute justify-start rounded-full flex-row"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>

        <button
          className="btn btn-error absolute rounded-full ml-[70%] flex-row"
          onClick={() => performAndRefresh("delete")}
        >
          Delete
        </button>
      </div>

      {isEditing ? (
        <div className="card-body items-center text-center">
          {/* Conditional input fields for Clubs */}
          {isClub ? (
            <>
              <input
                type="text"
                name="club_name"
                value={editData.club_name}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                name="icon_url"
                value={editData.icon_url}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                name="group_chat_link"
                value={editData.group_chat_link}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
            </>
          ) : (
            <>
              {/* Conditional input fields for Events */}
              <input
                type="text"
                name="event_name"
                value={editData.event_name}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                name="event_description"
                value={editData.event_description}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
              <input
                type="datetime-local"
                name="event_datetime"
                value={editData.event_datetime}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                name="event_location"
                value={editData.event_location}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                name="creator_name"
                value={editData.creator_name}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                name="ticket_link"
                value={editData.ticket_link}
                onChange={handleInputChange}
                className="input input-bordered mb-2"
              />
            </>
          )}

          <button
            className="btn btn-success"
            onClick={() => performAndRefresh("save")}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <figure className="px-10 pt-10">
            <img
              src={options.icon_url}
              alt={`${isClub ? options.club_name : options.event_name}-logo`}
              className="rounded-full w-[50%] border-2 border-default"
            />
          </figure>
          <div className="card-body items-center text-center text-wrap">
            <h2 className="card-title text-3xl hover:text-shadow-lg">
              {isClub ? options.club_name : options.event_name}
            </h2>

            {isClub && <p className="text-lg">club id : {options.club_id}</p>}
            <p className="text-xl truncate">
              {isClub ? options.description : options.event_description}
            </p>

            <div className="card-actions mt-2">
              {isClub ? (
                <button className="btn btn-accent scale-125 rounded-full">
                  <a href={options.group_chat_link}>Join!</a>
                </button>
              ) : (
                <div className="text-center">
                  <p>{new Date(options.event_datetime).toLocaleString()}</p>
                  <p>Location: {options.event_place_name}</p>
                  <a href={options.ticket_link} className="btn btn-accent">
                    Get Tickets
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
