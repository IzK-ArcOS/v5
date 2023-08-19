import { get } from "svelte/store";
import { UserName, UserToken } from "../userlogic/interfaces";
import type { Cred } from "./interface";
import { apiCall, ConnectedServer } from "./main";
import { Log } from "../console";
import { LogLevel } from "../console/interface";

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
  Log(
    "ts/api/cred.ts: changePassword",
    `Attempting to change password for user ${username}`,
    LogLevel.info
  );

  if (newPswd != confirmPswd) return false;

  const req = await apiCall(
    get(ConnectedServer),
    "user/changepswd",
    { new: btoa(newPswd) },
    null,
    { username, password: old }
  );

  const isValid = req.statusCode == 200;

  const remembed = localStorage.getItem("arcos-remembered-token");

  if (!remembed || !isValid) {
    Log(
      "ts/api/cred.ts: changePassword",
      `Password change failed: not valid or no remembered token`,
      LogLevel.error
    );

    return isValid;
  }

  const rememberedUsername = atob(remembed).split(":")[0];

  if (rememberedUsername != username) {
    Log(
      "ts/api/cred.ts: changePassword",
      `Password change failed: the username does not match the current user`,
      LogLevel.error
    );

    return isValid;
  }

  localStorage.setItem(
    "arcos-remembered-token",
    btoa(`${username}:${newPswd}`)
  );

  return isValid;
}

export async function changeUsername(old: string, newName: string) {
  Log(
    "ts/api/cred.ts: changeUsername",
    `Attempting to change the username for user ${old}`,
    LogLevel.info
  );

  if (get(UserName) != old) {
    Log(
      "ts/api/cred.ts: changeUsername",
      `Username change failed: the old username does not match the current user`,
      LogLevel.error
    );

    return false;
  }

  const req = await apiCall(
    get(ConnectedServer),
    "user/rename",
    { newname: btoa(newName) },
    get(UserToken)
  );

  const isValid = req.statusCode == 200;

  UserName.set(newName);

  if (!isValid) {
    Log(
      "ts/api/cred.ts: changeUsername",
      `Username change failed: the API did not permit the username change`,
      LogLevel.error
    );

    return false;
  }

  const remembed = localStorage.getItem("arcos-remembered-token");

  if (!remembed) {
    Log(
      "ts/api/cred.ts: changeUsername",
      `Could not update remembered token: it doesn't exist`,
      LogLevel.warn
    );

    return false;
  }

  const rememberedUsername = atob(remembed).split(":")[0];

  if (rememberedUsername != old) {
    Log(
      "ts/api/cred.ts: changeUsername",
      `Could not update remembered token: the token's `,
      LogLevel.warn
    );

    return false;
  }

  localStorage.setItem(
    "arcos-remembered-token",
    btoa(`${newName}:${atob(remembed).split(":")[1]}`)
  );

  return isValid;
}

export async function logoffToken() {
  Log(
    "ts/api/cred.ts: logoffToken",
    `Discontinuing token if present`,
    LogLevel.info
  );

  const token = get(UserToken);
  const server = get(ConnectedServer);

  if (!token || !server) return;

  UserToken.set(null);

  return await apiCall(server, "logoff", {}, token);
}
