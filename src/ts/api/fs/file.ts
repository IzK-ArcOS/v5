import { get } from "svelte/store";
import { Log, LogLevel } from "../../console";
import { UserToken } from "../../userlogic/interfaces";
import { ConnectedServer } from "../main";
import { generateParamStr } from "../params";

export async function readFile(path: string): Promise<ArrayBuffer> {
  Log({
    source: "fs/directory.ts: getDirectory",
    msg: `Requesting directory contents of "${path}" from ArcAPI`,
    level: LogLevel.info,
  });

  const defaultValue = new ArrayBuffer(0);
  const server = get(ConnectedServer);

  if (!server) return defaultValue;

  const init: RequestInit = {
    headers: {
      Authorization: `Bearer ${get(UserToken)}`,
    },
  };

  const params = generateParamStr({ path: btoa(path) });
  const req = await fetch(`${server}/fs/file/get${params}`, init);

  if (req.status != 200) return defaultValue;

  const x = await (await req).text();

  const enc = new TextEncoder();

  return enc.encode(x) as ArrayBuffer;
}
