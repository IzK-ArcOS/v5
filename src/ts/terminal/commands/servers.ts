import { getAuthcode } from "../../api/authcode";
import { getAllServers } from "../../api/server";
import type { Command } from "../interface";

export const Servers: Command = {
  keyword: "servers",
  exec(cmd, argv, term) {
    const servers = getAllServers();

    term.std.writeLine("\n# | Server");
    term.std.writeSeparator(20);

    for (let i = 0; i < servers.length; i++) {
      const server = servers[i];
      const ac = getAuthcode(server);

      term.std.writeColor(`${ac ? "[#]" : " "} | ${server}`, "orange");
    }

    term.std.writeLine("\n");
    term.std.Info("Servers marked with a '[#]' indicates a protected server.");
  },
  description: "List saved servers",
};
