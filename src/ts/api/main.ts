import { writable } from "svelte/store";
import { generateCredToken } from "./cred";
import type { Cred, Params } from "./interface";
import { generateParamStr } from "./params";

export const ConnectedServer = writable<string>(null);

export async function apiCall(
  host: string,
  path: string,
  params: Params,
  tokenAuth?: string,
  credAuth?: Cred
) {
  const credToken = generateCredToken(credAuth);
  const init: RequestInit = {
    headers: {
      Authorization: tokenAuth ? `Bearer ${tokenAuth}` : `Basic ${credToken}`,
    },
  };

  console.log(init);

  const noAuth = !credAuth && !tokenAuth;
  const paramStr = generateParamStr(params);

  const req = await fetch(`${host}/${path}${paramStr}`, noAuth ? {} : init);

  return await req.json();
}
