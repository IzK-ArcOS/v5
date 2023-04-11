import { Log, LogLevel } from "../console";
import { minArcAPI } from "../env/main";
import ttlFetch from "../ttlFetch";
import { ConnectedServer } from "./main";

// [https?,port][]
export const TEST_MODES: [boolean, number][] = [
  [true, 443],
  [false, 3333],
  [true, 80],
  [false, 80],
  [true, 3333],
];

export async function testConnection(server: string) {
  for (let i = 0; i < TEST_MODES.length; i++) {
    const proto = `http${TEST_MODES[i][0] ? "s" : ""}`;
    const port = TEST_MODES[i][1];
    const url = `${proto}://${server}:${port}/connect`;

    Log({
      msg: `Testing ${server} on port ${port} and protocol ${proto}...`,
      source: "api/test.ts: testConnection",
      level: LogLevel.info,
    });

    try {
      const req = await (await ttlFetch(url, {})).json();

      Log({
        msg: `Got a response from URL ${url}`,
        source: "api/test.ts: testConnection",
        level: LogLevel.warn,
      });

      const rev = req.revision || 0;

      if (rev < minArcAPI) return false;

      ConnectedServer.set(`${proto}://${server}:${port}`);

      return req && !!req.valid;
    } catch {
      Log({
        msg: `Did not get a valid response from ${url}`,
        source: "api/test.ts: testConnection",
        level: LogLevel.error,
      });

      continue;
    }
  }

  Log({
    msg: `Can't connect to server ${server}: none of the modes match`,
    source: "api/test.ts: testConnection",
    level: LogLevel.critical,
  });

  return false;
}
