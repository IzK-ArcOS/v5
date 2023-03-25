import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { loginUsername } from "../login/main";
import { UserData, UserName, UserToken } from "../userlogic/interfaces";
import { generateCredToken } from "./cred";

export async function loginUsingCreds(
  token: string
): Promise<UserData | false> {
  let [name, password] = atob(token).split(":");

  const server = get(ConnectedServer);

  loginUsername.set(name);

  let req = await apiCall(get(ConnectedServer), "auth", {}, null, {
    username: name,
    password,
  });

  if (!req.valid) return false;

  UserToken.set(req.data.token);
  UserName.set(name);

  req = await apiCall(server, `user/properties`, {}, get(UserToken), null);

  if (!req.valid) return false;

  return req;
}

export async function rememberedLogin() {
  const token = localStorage.getItem("arcos-remembered-token");

  if (!token) return false;

  const [username, password] = atob(token).split(":");

  const userdata = await loginUsingCreds(
    generateCredToken({ username, password })
  );

  if (!userdata) return false;

  UserData.set(userdata);
  UserName.set(username);

  return true;
}
