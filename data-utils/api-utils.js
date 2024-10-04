const BASE_URL = "https://comp2140-261d7d0a.uqcloud.net/api";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.7xvfSwhoVhY71cFZLrLCDWHQd4Vyuhw4d9IKiVaacHM";

/**
 * Makes a request to the specified endpoint using the given method and body.
 * @param {string} endpoint - The endpoint to make the request to.
 * @param {string} [method="GET"] - The HTTP method to use for the request.
 * @param {Object} [body] - The body of the request.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 * @throws {Error} - If the request fails or the response status is not in the range 200-299.
 */
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

/**
 * Retrieves a club by its ID.
 *
 * @param {number} id - The ID of the club to retrieve.
 * @returns {Promise<Array>} - A promise that resolves to an array containing the club information.
 * @throws {Error} - If the club does not exist.
 */
export async function getClub(id) {
  const club = await makeRequest(`/clubs?club_id=eq.${id}`);

  if (club.length === 0) {
    throw new Error("Club does not exist.");
  }
  return club;
}

/**
 * Creates a new club.
 *
 * @param {Object} club - The club object to be created.
 * @returns {Promise} A promise that resolves with the created club.
 */
export async function createClub(club) {
  return makeRequest("/clubs", "POST", club);
}

/**
 * Retrieves a list of clubs from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of clubs.
 */
export async function getClubs() {
  return makeRequest("/clubs");
}

/**
 * Updates a club with the given ID.
 *
 * @param {number} id - The ID of the club to update.
 * @param {object} club - The updated club object.
 * @returns {Promise} - A promise that resolves with the updated club.
 */
export async function updateClub(id, club) {
  return makeRequest(`/clubs?club_id=eq.${id}`, "PATCH", club);
}

/**
 * Deletes a club with the specified ID.
 *
 * @param {number} id - The ID of the club to delete.
 * @returns {Promise} A promise that resolves when the club is successfully deleted.
 */
export async function deleteClub(id) {
  return makeRequest(`/clubs?club_id=eq.${id}`, "DELETE");
}

/**
 * Creates an event by making a POST request to the "/events" endpoint.
 *
 * @param {Object} event - The event object to be created.
 * @returns {Promise} A promise that resolves with the created event.
 */
export async function createEvent(event) {
  return makeRequest("/events", "POST", event);
}

/**
 * Deletes an event with the specified ID.
 *
 * @param {number} id - The ID of the event to delete.
 * @returns {Promise} A promise that resolves when the event is successfully deleted.
 */
export async function deleteEvent(id) {
  return makeRequest(`/events?event_id=eq.${id}`, "DELETE");
}

/**
 * Updates an event with the specified ID.
 *
 * @param {string} id - The ID of the event to update.
 * @param {object} event - The updated event object.
 * @returns {Promise} - A promise that resolves with the updated event.
 */
export async function updateEvent(id, event) {
  return makeRequest(`/events?event_id=eq.${id}`, "PATCH", event);
}

/**
 * Retrieves an event by its ID.
 *
 * @param {number} id - The ID of the event to retrieve.
 * @returns {Promise<Array>} - A promise that resolves to an array containing the event data.
 * @throws {Error} - If the event does not exist.
 */
export async function getEvent(id) {
  const event = await makeRequest(`/events?event_id=eq.${id}`);

  if (event.length === 0) {
    throw new Error("Event does not exist.");
  }
  return event;
}

/**
 * Retrieves events from the server.
 * @returns {Promise} A promise that resolves with the events data.
 */
export async function getEvents() {
  return makeRequest("/events");
}

/**
 * Retrieves the event locations from the API.
 * @returns {Promise<Array<{id: string, location: string}>>} The array of event locations, each containing an id and a location.
 */
export async function getEventLocations() {
  const events = await getEvents();
  const locations = events.map((event) => ({
    id: event.event_id,
    location: event.event_location,
  }));

  return locations;
}
