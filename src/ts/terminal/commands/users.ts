import Fuse from "fuse.js";
import { tryJsonConvert } from "../../json";
import { UserCache } from "../../userlogic/cache";
import type { AllUsers } from "../../userlogic/interfaces";
import { getUsers } from "../../userlogic/main";
import { getSwitches } from "../argv";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";

export const Users: Command = {
  keyword: "users",
  async exec(cmd, argv, term) {
    const username = tryJsonConvert<string>(getSwitches(argv)["search"]);

    UserCache.clear();

    if (!username) return allUsers(term);

    return searchFor(username, await getUsers(), term);
  },
  description: "Display ArcAPI users",
};

async function allUsers(term: ArcTerm) {
  const users = (await getUsers()) as AllUsers;
  const entries = Object.entries(users);
  const names = Object.keys(users);

  for (let i = 0; i < entries.length; i++) {
    const role = entries[i][1].acc.admin ? "Administrator" : "Regular user";
    const name = entries[i][0].padEnd(getMaxLength(names), " ");
    term.std.writeColor(`[${name}]: ${role}`, "blue");
  }
}

function searchFor(username: string, users: AllUsers, term: ArcTerm) {
  const userObject = Object.entries(users).map((a) => ({
    ...a[1],
    name: a[0],
  }));

  const options = {
    includeScore: true,
    keys: ["name"],
  };

  const fuse = new Fuse(userObject, options);
  const result = fuse.search(username);
  const names = Object.keys(users);

  for (let i = 0; i < result.length; i++) {
    const role = result[i].item.acc.admin ? "Administrator" : "Regular user";
    const name = result[i].item.name.padEnd(getMaxLength(names), " ");

    term.std.writeColor(`[${name}]: ${role}`, "blue");
  }

  return result;
}

function getMaxLength(users: string[]) {
  let length = 0;

  for (let i = 0; i < users.length; i++) {
    if (users[i].length > length) length = users[i].length;
  }

  return length + 2;
}
