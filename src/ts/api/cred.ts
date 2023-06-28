import { get } from "svelte/store";
import { UserName, UserToken } from "../userlogic/interfaces";
import type { Cred } from "./interface";
import { apiCall, ConnectedServer } from "./main";

export function generateCredToken(cred: Cred) {
  if (!cred) return "";
  return btoa(`${cred.username}:${cred.password}`);
}

export async function changePassword(
  username: string,
  old: string,
  newPswd: string,
  confirmPswd: string
) {
  if (newPswd != confirmPswd) return false;

  const req = await apiCall(
    get(ConnectedServer),
    "user/changepswd",
    { new: btoa(newPswd) },
    null,
    { username, password: old }
  );

  const remembed = localStorage.getItem("arcos-remembered-token");

  if (!remembed || !req.valid) return req.valid;

  const rememberedUsername = atob(remembed).split(":")[0];

  if (rememberedUsername != username) return req.valid;

  localStorage.setItem(
    "arcos-remembered-token",
    btoa(`${username}:${newPswd}`)
  );

  return req.valid;
}

export async function changeUsername(old: string, newName: string) {
  if (get(UserName) != old) return false;

  const req = await apiCall(
    get(ConnectedServer),
    "user/rename",
    { newname: btoa(newName) },
    get(UserToken)
  );

  const isValid = req.statusCode == 200;

  UserName.set(newName);

  if (!isValid) return false;

  const remembed = localStorage.getItem("arcos-remembered-token");

  if (!remembed) return false;

  const rememberedUsername = atob(remembed).split(":")[0];

  if (rememberedUsername != old) return false;

  localStorage.setItem(
    "arcos-remembered-token",
    btoa(`${newName}:${atob(remembed).split(":")[1]}`)
  );

  return isValid;
}

export async function logoffToken() {
  const token = get(UserToken);
  const server = get(ConnectedServer);

  if (!token || !server) return;

  return await apiCall(server, "logoff", {}, token);
}
