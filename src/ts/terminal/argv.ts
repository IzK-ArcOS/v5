export function getSwitches(argv: string[]) {
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
  const switches = getSwitches(argv);

  for (const sw in switches) {
    if (sw == key) return true;
  }

  return false;
}
