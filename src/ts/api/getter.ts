import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { loginUsername } from "../login/main";
import { UserData, UserName, UserToken } from "../userlogic/interfaces";

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
