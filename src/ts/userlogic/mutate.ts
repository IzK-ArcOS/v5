import { get } from "svelte/store";
import { ConnectedServer, apiCall } from "../api/main";
import { loginUsingCreds } from "../api/getter";
import { generateCredToken } from "../api/cred";
import type { UserData } from "./interfaces";

export async function createUser(
  username: string,
  password: string
): Promise<UserData | false> {
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(server, "user/create", {}, null, {
    username: username.trim(),
    password,
  });

  if (!req.valid) {
    return false;
  }

  const token = generateCredToken({ username, password });

  const userdata = (await loginUsingCreds(token)) as UserData;

  if (!userdata) return false;

  userdata.acc.profilePicture = Math.floor(Math.random() * 29);

  await apiCall(
    server,
    "user/properties/update",
    {},
    token,
    null,
    JSON.stringify(userdata)
  );

  return userdata;
}
