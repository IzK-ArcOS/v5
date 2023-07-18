import { get } from "svelte/store";
import defaultImage from "../../assets/pfp/null.png";
import { getUsers } from "../userlogic/main";
import { getProfilePicture } from "../userlogic/pfp";
import type { Params } from "./interface";
import { ConnectedServer } from "./main";

const pfpCache: Params = {};

export async function getUserPfp(username: string): Promise<string> {
  const server = get(ConnectedServer);

  if (!server) return defaultImage;

  if (pfpCache[username]) return getProfilePicture(pfpCache[username]);

  const users = await getUsers();

  const user = users[username];

  if (!user) return defaultImage;

  pfpCache[username] = getProfilePicture(users[username].acc.profilePicture);

  return pfpCache[username];
}
