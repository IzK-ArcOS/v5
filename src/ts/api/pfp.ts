import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "./main";
import defaultImage from "../../assets/pfp/null.png";
import { getProfilePicture } from "../userlogic/pfp";
import { getUsers } from "../userlogic/main";

export async function getUserPfp(username: string): Promise<string> {
  const server = get(ConnectedServer);

  if (!server) return defaultImage;

  const users = await getUsers();

  const user = users[username];

  return user
    ? getProfilePicture(users[username].acc.profilePicture)
    : defaultImage;
}
