import type { Command } from "../interface";
import type { ArcTerm } from "../main";
import { gooseBumpsCommands as commands } from "../store";
import { Default } from "./default";

export const Goose: Command = {
  keyword: "goose",
  async exec(c, argv, term) {
    if (argv[0] != "bumps") {
      await Default.exec(c, argv, term);

      return;
    }
    if (!term.env.gooseBumps) {
      return dummy(term);
    }

    return await gooses(term);
  },
  description: "GooseBumps 👀",
};

function dummy(term: ArcTerm) {
  const parts = [
    "                                   ___",
    '                               ,-""   `.',
    "                             ,'  _   e )`-._",
    "                            /  ,' `-._<.===-'",
    "                           /  /",
    "                          /  ;",
    "              _          /   ;",
    ' (`._    _.-"" ""--..__,\'    |',
    ' <_  `-""                     \\',
    "  <`-                          :",
    "   (__   <__.                  ;",
    "     `-.   '-.__.      _.'    /",
    "        \\      `-.__,-'    _,'",
    "         `._    ,    /__,-'",
    '            ""._\\__,\'< <____',
    "                 | |  `----.`.",
    "                 | |        \\ `.",
    "                 ; |___      \\-``",
    "                 \\   --<",
    "                  `.`.<",
    "                    `-'",
  ];

  parts.forEach((part) => {
    term.std.writeLine(part);
  });
}

async function gooses(term: ArcTerm) {
  term.std.Warning(
    "Super duper secret thingy approaching! Welcome to the GooseBumps."
  );
  term.std.writeLine("\n");

  const options = {
    "(Cancel)": "$cancel",
    "Change State": "state",
    "Print Colors": "colors",
    "Dump UserData": "udd",
    "Dump Logs": "logdump",
    "Submit Test Bug Report": "bugrep",
    "View base report info": "repinfo",
    "Crash ArcOS": "err",
  };

  const cmd =
    Object.values(options)[
      await term.std.select(Object.keys(options), "orange")
    ];

  if (cmd == "$cancel") return;

  term.std.writeLine("\n");

  const arg = (await term.std.read("Arguments: [", "]", 128)).split(" ");

  const result = await term.commandHandler.evaluate(cmd, arg, false, commands);

  return result;
}
