import { restart } from "../../desktop/power";
import { UserName } from "../../userlogic/interfaces";
import type { Command } from "../interface";

export const Logout: Command = {
  keyword: "logout",
  exec(cmd, argv, term) {
    if (term.app) return restart(true);

    localStorage.removeItem("arcos-remembered-token");
    UserName.set(undefined);

    term.dispose();
    setTimeout(() => {
      term.initialize();
    });
  },
  description: "Logout ArcOS",
};
