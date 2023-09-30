import { get } from "svelte/store";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { UserToken } from "../userlogic/interfaces";
import type { Cred } from "./interface";
import { ConnectedServer, apiCall } from "./main";
import { toBase64 } from "../base64";

export function generateCredToken(cred: Cred) {
  if (!cred) return "";
  try {
    return toBase64(`${cred.username}:${cred.password}`);
  } catch {
    return "";
  }
}

export async function logoffToken() {
  Log(
    "ts/api/cred.ts: logoffToken",
    `Discontinuing token if present`,
    LogLevel.info
  );

  const token = get(UserToken);
  const server = get(ConnectedServer);

  if (!token || !server) return;

  UserToken.set(null);

  return await apiCall(server, "logoff", {}, token);
}
