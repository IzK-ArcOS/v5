import dayjs from "dayjs";
import { getUnreadMessages } from "../../messaging/get";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";
import { getMessages } from "../../messaging/main";
import { filterPartial } from "../../messaging/partial";

export const MsgCtl: Command = {
  keyword: "msgctl",
  async exec(cmd, argv, term) {
    const options = {
      "Show unread messages": () => showUnread(term),
      "Search for a message": () => search(term),
      "Send a message": () => send(term),
      Exit: null,
    };

    const choice =
      Object.keys(options)[
        await term.std.select(Object.keys(options), "yellow")
      ];

    if (choice == "Exit") return;

    const func = options[choice];

    if (!func)
      return term.std.Error(
        "Snap! This option is broken... Please create a GitHub issue!"
      );

    await func();
  },
  description: "Manage messages",
};

async function showUnread(term: ArcTerm) {
  const messages = await getUnreadMessages();

  term.std.writeLine(`Showing ${messages.length} unread messages\n`);
  term.std.writeSeparator(30);
  term.std.writeLine("\n");

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const timestamp = dayjs(msg.timestamp)
      .format("M MMM YYYY, HH:mm")
      .padEnd(20, " ");
    const sender = msg.sender.padEnd(28, " ");
    const partial = filterPartial(msg.partialBody.replaceAll("\n", " ")).padEnd(
      20,
      " "
    );

    term.std.writeColor(`[${timestamp}]${sender}${partial}`, "gray");
  }
}

async function search(term: ArcTerm) {}

async function send(term: ArcTerm) {}
