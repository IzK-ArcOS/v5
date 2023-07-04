import { Log } from "../console";
import { LogLevel } from "../console/interface";

export function setAuthcode(server: string, code: string): void {
  Log({
    source: "api/authcode.ts: setAuthcode",
    msg: `Adding authcode to ${server}`,
    level: LogLevel.info,
  });

  let authCodes = localStorage.getItem("arcos-authcodes");
  if (!authCodes) authCodes = "{}";

  authCodes = JSON.parse(authCodes);

  authCodes[server] = code;

  localStorage.setItem("arcos-authcodes", JSON.stringify(authCodes));
}

export function getAuthcode(server: string) {
  Log({
    source: "api/authcode.ts:getAuthcode",
    msg: `Getting authcode for ${server}`,
    level: LogLevel.info,
  });

  let authCodes = localStorage.getItem("arcos-authcodes");
  if (!authCodes) authCodes = "{}";

  authCodes = JSON.parse(authCodes);

  return authCodes[server];
}
