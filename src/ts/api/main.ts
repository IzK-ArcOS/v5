import { get, writable } from "svelte/store";
import { CurrentState } from "../state/main";
import { generateCredToken } from "./cred";
import type { Cred, DefaultResponse, Params } from "./interface";
import { generateParamStr } from "./params";

export const ConnectedServer = writable<string>(null);
export const ServerAuthCode = writable<string>(null);

export async function apiCall(
  host: string,
  path: string,
  params: Params,
  tokenAuth?: string,
  credAuth?: Cred,
  body?: string,
  noBody?: boolean
): Promise<DefaultResponse | any> {
  console.trace("ah yes");
  const credToken = generateCredToken(credAuth);
  const init: RequestInit = {
    headers: {
      Authorization: tokenAuth ? `Bearer ${tokenAuth}` : `Basic ${credToken}`,
    },
    body,
    method: body ? "post" : "get",
  };

  const noAuth = !credAuth && !tokenAuth;
  const paramStr = generateParamStr({ ...params, ac: get(ServerAuthCode) });

  let req;

  try {
    req = await fetch(
      `${host}/${path}${paramStr}`,
      noAuth ? { body: body } : init
    );
  } catch {
    return {};
  }

  const statusCode = req.status;

  const txt = await req.text();

  if (
    !req.ok &&
    (tokenAuth || credAuth) &&
    !`200|304`.includes(`${req.status}`)
  ) {
    return { statusCode, valid: false };
  }

  if (!noBody) {
    try {
      return { ...JSON.parse(txt), statusCode };
    } catch {
      return { statusCode };
    }
  }

  return { statusCode };
}
