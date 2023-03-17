import { get, writable } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { Log, LogLevel } from "../console";
import { restart } from "../desktop/power";
import { CurrentState } from "../state/main";
import { commitUserdata } from "./commit";
import { AllUsers, defaultUserData, UserData, UserToken } from "./interfaces";

export const committingUserData = writable<boolean>(false);

export async function getUsers() {
  Log({
    msg: `Getting users`,
    source: "userlogic/main.ts: getUsers",
    level: LogLevel.info,
  });

  const server = get(ConnectedServer);

  if (!server) return [];

  const users = await apiCall(server, "users/get", {}, null, null);

  let obj = {};

  const arr = users.data as any[];

  for (let i = 0; i < arr.length; i++) {
    obj[arr[i].username] = arr[i];
  }

  return obj as AllUsers;
}

export async function deleteUser() {
  Log({
    msg: `Delete users`,
    source: "userlogic/main.ts: deleteUsers",
    level: LogLevel.info,
  });

  const server = get(ConnectedServer);
  const token = get(UserToken);

  if (!server) return;

  apiCall(server, "user/delete", {}, token);

  if (get(CurrentState).name == "Desktop") restart();
}

export async function getUserdata(name: string) {
  Log({
    msg: `Getting userdata for "${name}"`,
    source: "userlogic/main.ts: getUserdata",
    level: LogLevel.info,
  });

  const users = await getUsers();

  if (users[name]) return users[name];

  return defaultUserData;
}

export async function setUserdata(data: UserData): Promise<boolean> {
  Log({
    msg: `Setting userdata`,
    source: "userlogic/main.ts: setUserdata",
    level: LogLevel.info,
  });

  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "user/properties/update",
    {},
    get(UserToken),
    null,
    JSON.stringify(data)
  );

  if (req.valid) {
    Log({
      msg: `Userdata committed to API`,
      source: "userlogic/main.ts: setUserdata",
      level: LogLevel.info,
    });
  }

  return;
}

UserData.subscribe(commitUserdata);
