import React, { useState } from "react";
import { createClub, createEvent } from "/data-utils/api-utils.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import Map from "../components/Map.jsx";

function Create() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState(null); // For storing selected coordinates
  const [selectedName, setSelectedName] = useState(null); // For storing selected name

  const navigate = useNavigate();

  const clubQuestions = [
    "What is the name of your club?",
    "Please provide a brief description of your club.",
    "Please provide a link to your club's logo / icon.",
    "Please provide a link to your club's website / group chat.",
    "One last question :3, what is your name?",
  ];

  const eventQuestions = [
    "What is the name of your event?",
    "Please provide a brief description of the event.",
    "Please provide a date for your event",
    "Where will your event be held?",
    "Please provide the link to the tickets.",
    "Is your event a part of a club? If so, which one? (Enter the club ID)",
    "One last question :3, what is your name?",
  ];

  const [formType, setFormType] = useState(null); // 'club' or 'event'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = formType === "club" ? clubQuestions : eventQuestions;

  const loadForm = (isClub) => {
    setFormType(isClub ? "club" : "event");
    setCurrentQuestionIndex(0);
    setAnswers(
      Array(isClub ? clubQuestions.length : eventQuestions.length + 1).fill("")
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleInputChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (formType === "club") {
      try {
        await createClub({
          club_name: answers[0],
          description: answers[1],
          icon_url: answers[2],
          group_chat_link: answers[3],
          creator_name: answers[4],
        });
        navigate("/clubs");
      } catch (error) {
        window.alert(`Error creating club. Please verify your inputs.${error}`);
      }
    } else {
      try {
        await createEvent({
          event_name: answers[0],
          event_description: answers[1],
          event_datetime: answers[2],
          event_location: answers[3],
          ticket_link: answers[4],
          club_id: answers[5],
          creator_name: answers[6],
          event_place_name: answers[7],
        });
        navigate("/events");
      } catch (error) {
        window.alert(
          `Error creating club. Please verify your inputs.${error}. Make sure the club ID is valid. please visit the clubs page to see a list of club IDs`
        );
      }
    }
  };

  // Handle location selection from the map
  const handleLocationSelect = (location, name) => {
    setSelectedName(name);
    setSelectedLocation(location); // Store the selected coordinates
    const newAnswers = [...answers];

    newAnswers[3] = `${location[1]}, ${location[0]}`;
    newAnswers[7] = name;

    setAnswers(newAnswers);
  };

  if (!formType) {
    // Show initial Club/Event selection buttons
    return (
      <div className="flex w-full justify-center items-center flex-col align-middle mt-[2%]">
        <p className="text-3xl">What do you want to create?</p>
        <div className="mt-[1%]">
          <button
            className="btn btn-info btn-outline w-48 mr-4"
            onClick={() => loadForm(true)}
          >
            Club
          </button>
          <button
            className="btn btn-info btn-outline w-48"
            onClick={() => loadForm(false)}
          >
            Event
          </button>
        </div>
      </div>
    );
  }

  // Show questions form based on selection
  return (
    <div className="flex w-full justify-center items-center flex-col align-middle mt-[2%]">
      <p className="text-3xl">{questions[currentQuestionIndex]}</p>
      {
        // Render different input types based on the question
        currentQuestionIndex === 2 && formType === "event" ? (
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              const newAnswers = [...answers];
              newAnswers[currentQuestionIndex] = date.toISOString().replace(); // Store date
              setAnswers(newAnswers);
            }}
          />
        ) : currentQuestionIndex === 3 && formType === "event" ? (
          // Show the map for location selection
          <div className="w-full">
            <Map createMode={true} addLocation={handleLocationSelect} />{" "}
            {/* Pass the handler to the map */}
            <button
              className="btn btn-primary mt-4"
              onClick={() => {
                if (selectedLocation) {
                  handleNext(); // Proceed to the next question if a location is selected
                }
              }}
              disabled={!selectedLocation}
            >
              Confirm Location
            </button>
          </div>
        ) : (
          <input
            type="text"
            value={answers[currentQuestionIndex]}
            onChange={handleInputChange}
            className="mt-4 p-2 border border-gray-300 rounded"
          />
        )
      }

      <div className="mt-4">
        <button
          className="btn btn-info btn-outline mr-4"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button className="btn btn-info btn-outline" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button
            className="btn btn-success btn-outline"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Create;
