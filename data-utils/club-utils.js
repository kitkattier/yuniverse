import {
  getClub,
  createClub,
  getClubs,
  updateClub,
  deleteClub,
} from "./api-utils.js";

export async function makeClubCards() {
  const clubs = await getClubs();
}

async function main() {
  await makeClubCards();
}

main();
