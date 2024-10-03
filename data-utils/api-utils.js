const BASE_URL = "https://comp2140-261d7d0a.uqcloud.net/api";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.7xvfSwhoVhY71cFZLrLCDWHQd4Vyuhw4d9IKiVaacHM";

export async function makeRequest(endpoint, method = "GET", body) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    if (method === "POST" || method === "PATCH" || method === "DELETE") {
      options.headers["Prefer"] = "return=representation";
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();

    // Check if response is OK (status in the range 200-299)
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}

export async function getClub(id) {
  const club = await makeRequest(`/clubs?club_id=eq.${id}`);

  if (club.length === 0) {
    throw new Error("Club does not exist.");
  }
  return club;
}

export async function createClub(club) {
  return makeRequest("/clubs", "POST", club);
}

export async function getClubs() {
  return makeRequest("/clubs");
}

export async function updateClub(id, club) {
  return makeRequest(`/clubs?club_id=eq.${id}`, "PATCH", club);
}

export async function deleteClub(id) {
  return makeRequest(`/clubs?club_id=eq.${id}`, "DELETE");
}

export async function createEvent(event) {
  return makeRequest("/events", "POST", event);
}

export async function deleteEvent(id) {
  return makeRequest(`/events?event_id=eq.${id}`, "DELETE");
}

export async function updateEvent(id, event) {
  return makeRequest(`/events?event_id=eq.${id}`, "PATCH", event);
}

export async function getEvent(id) {
  const event = await makeRequest(`/events?event_id=eq.${id}`);

  if (event.length === 0) {
    throw new Error("Event does not exist.");
  }
  return event;
}

export async function getEvents() {
  return makeRequest("/events");
}

// returns an array of event id and location
export async function getEventLocations() {
  const events = await getEvents();
  const locations = events.map((event) => ({
    id: event.event_id,
    location: event.event_location,
  }));

  return locations;
}

// async function createEventAsync() {
//   await createEvent({
//     event_name: "the big gaming event",
//     event_description: "gaming meow",
//     event_datetime: "2024-12-13T12:00:00+00:00",
//     event_location: "(-40,40)",
//     creator_name: "uh",
//     ticket_link: "https://jonathanyun.com/",
//     club_id: 27,
//   });
// }

// console.log(await );

// async function createClubAsync() {
//   await createClub({
//     club_name: "big gaming club",
//     description: "we love gaming",
//     creator_name: "uh",
//     group_chat_link:
//       "https://discordapp.com/channels/809997432011882516/910694743728619540",
//     icon_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXV698gnQnUw3jsiVUClkOgAn7KiOAAs2SLA&s",
//   });
// }

// createClubAsync();
