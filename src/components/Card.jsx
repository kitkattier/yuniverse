import React from "react";

function Card({ options }) {
  return (
    <>
      <div className="card outline w-64 shadow-lg shadow-neutral mt-[5%] mx-5">
        <figure className="px-10 pt-10">
          <img
            src={options.icon_url}
            alt={
              options.club_name.trim().replaceAll(" ", "-").toLowerCase() +
              "-logo"
            }
            className="rounded-full w-[50%] border-2 border-default"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl hover:text-shadow-lg">
            {options.club_name}
          </h2>
          <p className="text-xl">{options.description}</p>

          <div className="card-actions mt-2">
            <button className="btn btn-accent scale-125 rounded-full ">
              <a href={options.group_chat_link}>Join!</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
