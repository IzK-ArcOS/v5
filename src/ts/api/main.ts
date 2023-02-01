import { writable } from "svelte/store";
import { generateCredToken } from "./cred";
import type { ApiResponse, Cred, DefaultResponse, Params } from "./interface";
import { generateParamStr } from "./params";

export const ConnectedServer = writable<string>(null);

export async function apiCall(
  host: string,
  path: string,
  params: Params,
  tokenAuth?: string,
  credAuth?: Cred,
  JsonBody?: string,
  noBody?: boolean
): Promise<DefaultResponse | any> {
  const credToken = generateCredToken(credAuth);
  const init: RequestInit = {
    headers: {
      Authorization: tokenAuth ? `Bearer ${tokenAuth}` : `Basic ${credToken}`,
    },
    body: JsonBody,
    method: JsonBody ? "post" : "get",
  };

  const noAuth = !credAuth && !tokenAuth;
  const paramStr = generateParamStr(params);

  const req = await fetch(
    `${host}/${path}${paramStr}`,
    noAuth ? { body: JsonBody } : init
  );

  const txt = await req.text();

  if (!noBody) {
    try {
      return JSON.parse(txt);
    } catch {
      return {};
    }
  }

  return {};
}
