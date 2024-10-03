import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteEvent } from "../../data-utils/api-utils";

function MapModal({ event, modal }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteEvent(event.event_id); // Call the delete API
      setIsDeleting(false);
      window.loaction.reload(); // Redirect after successful deletion
    } catch (error) {
      console.error("Error deleting event:", error);
      setIsDeleting(false);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <>
      <dialog id="my_modal_2" className="modal" ref={modal}>
        <div className="modal-box">
          <h2 className="font-bold text-lg">{event.event_name}</h2>
          <h4 className="text-md font-bold">{event.event_place_name}</h4>

          <h5 className="text-md">
            When : {new Date(event.event_datetime).toLocaleString()}
          </h5>
          <p className="py-4">{event.event_description}</p>
          <p className="py-4">made by: {event.creator_name}</p>

          <Link className="btn btn-info" to={event.ticket_link}>
            Get tickets!
          </Link>

          <button
            className={`btn-error btn mx-2 ${isDeleting ? "loading" : ""}`}
            onClick={handleDelete}
            disabled={isDeleting} // Disable the button while deleting
          >
            {isDeleting ? "Deleting..." : "Delete Event!"}
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default MapModal;
