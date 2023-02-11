import { writable } from "svelte/store";
import BugReport from "../../lib/BugReport.svelte";
import { BugReportData } from "../bugrep";
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

  if (!req.ok && tokenAuth) {
    BugReportData.set([
      true,
      {
        title: "Unable to access API",
        message: "The server returned an invalid status code.",
        source: "APICall",
        icon: "warning",
        button: { caption: "Restart", action: () => location.reload() },
      },
    ]);

    return;
  }

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
