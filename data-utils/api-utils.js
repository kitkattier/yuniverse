const BASE_URL = "https://comp2140-261d7d0a.uqcloud.net/api";

const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;
console.log(JWT_TOKEN);

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

// async function createClubAsync() {
//   await createClub({
//     club_name: "UQ Gamer Society",
//     description: "we are gamers",
//     creator_name: "uh",
//     group_chat_link:
//       "https://discordapp.com/channels/809997432011882516/910694743728619540",
//     icon_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXV698gnQnUw3jsiVUClkOgAn7KiOAAs2SLA&s",
//   });
// }

// createClubAsync();
