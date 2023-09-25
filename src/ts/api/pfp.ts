import { get } from "svelte/store";
import { getUsers } from "../userlogic/main";
import { ProfilePictures, getProfilePicture } from "../userlogic/pfp";
import type { Params } from "./interface";
import { ConnectedServer } from "./main";

const pfpCache: Params = {};

export async function getUserPfp(username: string): Promise<string> {
  const server = get(ConnectedServer);

  if (!server) return ProfilePictures.def;

  if (pfpCache[username]) return getProfilePicture(pfpCache[username]);

  const users = await getUsers();

  const user = users[username];

  if (!user) return ProfilePictures.def;

  pfpCache[username] = getProfilePicture(users[username].acc.profilePicture);

  return pfpCache[username];
}
