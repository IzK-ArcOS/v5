import { UserData, UserName } from "../../userlogic/interfaces";
import type { Command } from "../interface";

export const Logout: Command = {
  keyword: "logout",
  exec(cmd, argv, term) {
    if (term.process) return term.std.Error("This command requires ArcTerm Mode");

    localStorage.removeItem("arcos-remembered-token");
    UserName.set(undefined);

    term.dispose();
    setTimeout(() => {
      term.initialize();
    });
  },
  description: "Logout ArcTerm Mode",
};
