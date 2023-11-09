import { get, writable } from "svelte/store";
import { generateCredToken } from "./cred";
import type { Cred, DefaultResponse, Params } from "./interface";
import { generateParamStr } from "./params";
import { manualCrash } from "../reporting/crash";

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

  if (statusCode == 429) {
    manualCrash(
      "ts/api/main.ts",
      `Rate limited! This should not happen on its own.`
    );

    return {};
  }

  if (statusCode == 500) {
    manualCrash(
      "ts/api/main.ts",
      `Server returned status code 500! Please contact BDT`,
      `  at apiCall`
    );
    return { statusCode, valid: false };
  }

  if (
    !req.ok &&
    (tokenAuth || credAuth) &&
    !`200|304`.includes(`${req.status}`)
  ) {
    return { statusCode, valid: false };
  }

  const txt = await req.text();

  if (!noBody) {
    try {
      return { ...JSON.parse(txt), statusCode };
    } catch {
      return { statusCode };
    }
  }

  return { statusCode };
}
