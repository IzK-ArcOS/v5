import { get } from "svelte/store";
import { BugReportData } from "../bugrep";
import { Log, LogLevel } from "../console";
import { userDataKey } from "../env/main";
import { applyState } from "../state/main";
import { AllUsers, defaultUserData, UserData, UserName } from "./interfaces";

export function getUsers() {
  Log({
    msg: `Getting users`,
    source: "userlogic/main.ts: getUsers",
    level: LogLevel.info,
  });

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

  localStorage.setItem(userDataKey, btoa(JSON.stringify(data)));
}

export function createUser(name: string) {
  Log({
    msg: `Creating userdata for "${name}"`,
    source: "userlogic/main.ts: createUser",
    level: LogLevel.info,
  });

  const users = getUsers();

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

export function deleteUser(name: string) {
  Log({
    msg: `Delete users`,
    source: "userlogic/main.ts: deleteUsers",
    level: LogLevel.info,
  });

  const users = getUsers();

  if (!users[name]) return false;

  delete users[name];

  return setUsers(users);
}

export function resetUser(name: string) {
  Log({
    msg: `Resetting user "${name}"`,
    source: "userlogic/main.ts: resetUser",
    level: LogLevel.info,
  });

  const users = getUsers();

  if (!users[name]) return false;

  users[name] = defaultUserData;

  return setUsers(users);
}

export function getUserdata(name: string) {
  Log({
    msg: `Getting userdata for "${name}"`,
    source: "userlogic/main.ts: getUserdata",
    level: LogLevel.info,
  });

  const users = getUsers();

  if (users[name]) return users[name];

  return defaultUserData;
}

export function setUserdata(name: string, data: UserData): boolean {
  Log({
    msg: `Setting userdata`,
    source: "userlogic/main.ts: setUserdata",
    level: LogLevel.info,
  });

  const users = getUsers();

  if (!users[name]) return false;

  users[name] = data;

  setUsers(users);

  return true;
}

UserData.subscribe((v) => {
  const source = "UserLogic: UserData watch";

  if (get(UserName)) {
    Log({
      level: LogLevel.info,
      msg: "Change Detected, committing",
      source,
    });

    const changed = setUserdata(get(UserName), v);

    if (!changed) {
      Log({
        level: LogLevel.error,
        msg: "Commit failed, setter returned false",
        source,
      });

      if (BugReportData)
        BugReportData.set([
          true,
          {
            icon: "person_off",
            title: "User data commit failed",
            message:
              "The user data could not be saved. This happens if the<br>user data is altered while ArcOS is running.",
            details: "UserLogic: UserData watch: setter returned false",
            button: {
              action: () => {
                applyState("fts");
              },
              caption: "Reset",
            },
          },
        ]);
    }

    return;
  }

  Log({
    level: LogLevel.warn,
    msg: "Not committing, no username",
    source,
  });
});
