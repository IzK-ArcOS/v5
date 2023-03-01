import { writable } from "svelte/store";
import { BugReportData } from "../bugrep";
import { generateCredToken } from "./cred";
import type { Cred, DefaultResponse, Params } from "./interface";
import { generateParamStr } from "./params";

export const ConnectedServer = writable<string>(null);

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
  const paramStr = generateParamStr(params);

  const req = await fetch(
    `${host}/${path}${paramStr}`,
    noAuth ? { body: body } : init
  );

  const txt = await req.text();

  if (!req.ok && tokenAuth && !`200|304`.includes(`${req.status}`))
    return invalidServerResponse(req.status, host, path, txt);

  if (!noBody) {
    try {
      return JSON.parse(txt);
    } catch {
      return {};
    }
  }

  return {};
}

export function invalidServerResponse(
  code: number,
  host: string,
  path: string,
  txt: string
) {
  let json;

  return;

  try {
    json = JSON.parse(txt);
  } catch {
    json = {
      error: {
        title: "Could not access ArcAPI",
        message:
          "The server did not return a valid status code. This may be because your token is invalid.",
      },
    };
  }
  BugReportData.set([
    true,
    {
      icon: "settings_ethernet",
      title: json.error.title,
      message: `${json.error.message} This session can't continue. You can choose to restart.`,
      button: {
        action: () => location.reload(),
        caption: "Restart",
      },
      source: `apiCall`,
      details: `Host "${host}" returned invalid status code ${code} on endpoint /${path}`,
    },
  ]);
}
