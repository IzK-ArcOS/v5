import { get, writable } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { Log, LogLevel } from "../console";
import { restart } from "../desktop/power";
import { userDataKey } from "../env/main";
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

  if (server) {
    const users = await apiCall(server, "users/get", {}, null, null);

    let obj = {};

    const arr = users.data as any[];

    for (let i = 0; i < arr.length; i++) {
      obj[arr[i].username] = arr[i];
    }

    return obj as AllUsers;
  }

  const users = localStorage.getItem(userDataKey);

  if (!users) {
    localStorage.setItem(userDataKey, btoa("{}"));

    return {};
  }

  return JSON.parse(atob(users)) as AllUsers;
}

export function setUsers(data: AllUsers) {
  Log({
    msg: `Setting users`,
    source: "userlogic/main.ts: setUsers",
    level: LogLevel.info,
  });

  const server = get(ConnectedServer);

  if (server) return;

  localStorage.setItem(userDataKey, btoa(JSON.stringify(data)));
}

export async function createUser(name: string) {
  Log({
    msg: `Creating userdata for "${name}"`,
    source: "userlogic/main.ts: createUser",
    level: LogLevel.info,
  });

  const users = await getUsers();

  if (!users[name]) {
    users[name] = defaultUserData;

    setUsers(users);
    return;
  }

  Log({
    level: LogLevel.error,
    source: "userLogic: createUser",
    msg: "Cannot create a user that already exists.",
  });
}

export async function deleteUser(name: string) {
  Log({
    msg: `Delete users`,
    source: "userlogic/main.ts: deleteUsers",
    level: LogLevel.info,
  });

  const server = get(ConnectedServer);
  const token = get(UserToken);

  if (server) {
    apiCall(server, "user/delete", {}, token);

    if (get(CurrentState).name == "Desktop") restart();

    return;
  }

  const users = await getUsers();

  if (!users[name]) return false;

  delete users[name];

  setUsers(users);

  if (get(CurrentState).name == "Desktop") restart();

  return;
}

export async function resetUser(name: string) {
  Log({
    msg: `Resetting user "${name}"`,
    source: "userlogic/main.ts: resetUser",
    level: LogLevel.info,
  });

  const users = await getUsers();

  if (!users[name]) return false;

  users[name] = defaultUserData;

  return setUsers(users);
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

export async function setUserdata(
  name: string,
  data: UserData
): Promise<boolean> {
  Log({
    msg: `Setting userdata`,
    source: "userlogic/main.ts: setUserdata",
    level: LogLevel.info,
  });

  const server = get(ConnectedServer);

  if (server) {
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

  const users = await getUsers();

  if (!users[name]) return false;

  users[name] = data;

  setUsers(users);

  return true;
}

UserData.subscribe(commitUserdata);
