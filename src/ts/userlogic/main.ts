import { Log, LogLevel } from "../console";
import { userDataKey } from "../env/main";
import { AllUsers, defaultUserData, UserData } from "./interfaces";

export function getUsers() {
  const users = localStorage.getItem(userDataKey);

  if (!users) {
    localStorage.setItem(userDataKey, btoa("{}"));

    return {};
  }

  return JSON.parse(atob(users)) as AllUsers;
}

export function setUsers(data: AllUsers) {
  localStorage.setItem(userDataKey, btoa(JSON.stringify(data)));
}

export function createUser(name: string) {
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

export function getUserdata(name: string) {
  const users = getUsers();

  if (users[name]) return users[name];

  createUser(name);

  return defaultUserData;
}
