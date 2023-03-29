import type { AllUsers } from "../../userlogic/interfaces";
import { getUsers } from "../../userlogic/main";
import type { Command } from "../interface";

export const Users: Command = {
  keyword: "users",
  async exec(cmd, argv, term) {
    const users = (await getUsers()) as AllUsers;
    const entries = Object.entries(users);
    const names = Object.keys(users);

    for (let i = 0; i < entries.length; i++) {
      const role = entries[i][1].acc.admin ? "Administrator" : "Regular user";
      const name = entries[i][0].padEnd(getMaxLength(names), " ");
      term.std.writeColor(`[${name}]: ${role}`, "blue");
    }
  },
  description: "Display ArcAPI users",
};

function getMaxLength(users: string[]) {
  let length = 0;

  for (let i = 0; i < users.length; i++) {
    if (users[i].length > length) length = users[i].length;
  }

  return length + 5;
}
