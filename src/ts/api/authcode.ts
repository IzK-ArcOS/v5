import { get } from "svelte/store";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import ttlFetch from "../ttlFetch";
import { ConnectedServer } from "./main";
import { testConnection } from "./test";

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

export async function detectAuthcode(
  server: string
): Promise<"protected" | "public" | "error"> {
  const cs = get(ConnectedServer);
  const test = await testConnection(server);

  if (!test) return "error";

  const host = get(ConnectedServer);

  ConnectedServer.set(cs);

  const req = await (await ttlFetch(`${host}/connect`, {}, 3000)).json();

  if (!req) return "error";

  return req.protected ? "protected" : "public";
}
