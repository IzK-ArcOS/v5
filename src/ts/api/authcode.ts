import { Log } from "../console";
import { LogLevel } from "../console/interface";

export function setAuthcode(server: string, code: string): void {
  Log(
    "api/authcode.ts: setAuthcode",
    `Adding authcode to ${server}`,
    LogLevel.info
  );

  let authCodes = localStorage.getItem("arcos-authcodes");
  if (!authCodes) authCodes = "{}";

  authCodes = JSON.parse(authCodes);

  authCodes[server] = code;

  localStorage.setItem("arcos-authcodes", JSON.stringify(authCodes));
}

export function getAuthcode(server: string) {
  Log(
    "api/authcode.ts: getAuthcode",
    `Getting authcode for ${server}`,
    LogLevel.info
  );

  let authCodes = localStorage.getItem("arcos-authcodes");
  if (!authCodes) authCodes = "{}";

  authCodes = JSON.parse(authCodes);

  return authCodes[server];
}
