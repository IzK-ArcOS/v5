import { Log, LogLevel } from "../console";

export function getSwitches(argv: string[]) {
  Log({
    source: "ArcTerm",
    msg: `getSwitches: parsing argv with ${argv.length} items...`,
    level: LogLevel.info,
  });

  let switches: { [key: string]: string } = {};
  let currentArg = "";

  const prefix = "--";

  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith(prefix)) {
      const arg = argv[i].replace(prefix, "");

      currentArg = arg == currentArg ? currentArg : arg;

      if (!switches[currentArg]) switches[currentArg] = "";
    } else if (currentArg) {
      switches[currentArg] += `${argv[i]} `;
    }
  }

  for (const key in switches) {
    switches[key] = switches[key].trim();
  }

  return switches;
}

export function switchExists(argv: string[], key: string): boolean {
  Log({
    source: "ArcTerm",
    msg: `switchExists: ${key}`,
    level: LogLevel.info,
  });

  const switches = getSwitches(argv);

  for (const sw in switches) {
    if (sw == key) return true;
  }

  return false;
}
