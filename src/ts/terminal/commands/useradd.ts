import { createUser } from "../../userlogic/mutate";
import type { Command } from "../interface";

export const UserAdd: Command = {
  keyword: "useradd",
  async exec(cmd, argv, term) {
    const username = await term.std.read("Username: ", "", 25);
    const password = await term.std.read("Password: ", "", 128, true);
    const confirm = await term.std.read("Confirm Password: ", "", 128, true);

    if (!username) return term.std.Error(`Invalid username!`);

    if (password !== confirm)
      return term.std.Error(`Can't create ${username}: passwords don't match`);

    term.std.writeLine(`\nContinue creating ${username}?\n`);

    const confirmCreate =
      (await term.std.select(["Confirm creation", "Stop!"])) == 0;

    if (!confirmCreate) return term.std.Warning("Aborted.");

    const userdata = await createUser(username, password);

    if (!userdata) return term.std.Error(`Creating user ${username} failed.`);

    term.std.writeColor(`User [${username}] created successfully!`, "aqua");
  },
  description: "Create a new user",
};
