import { get } from "svelte/store";
import { UserName, UserToken } from "../../userlogic/interfaces";
import type { FSQuota } from "../interface";
import { apiCall, ConnectedServer } from "../main";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";

export const defaultQuota: FSQuota = {
  used: 0,
  max: 0,
  free: 0,
  username: "ArcOS",
};

export async function getFSQuota(): Promise<FSQuota> {
  const username = get(UserName);
  const server = get(ConnectedServer);

  Log(
    `fs/quota.ts: getFSQuota`,
    `Getting FSQuota for ${username}`,
    LogLevel.info
  );

  if (!server || !username) return defaultQuota;

  const req = await apiCall(server, "fs/quota", {}, get(UserToken));

  if (!req.valid) return defaultQuota;

  return req.data as FSQuota;
}
