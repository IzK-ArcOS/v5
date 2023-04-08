import { get, writable } from "svelte/store";
import { BugReportData } from "../bugrep";
import { createTrayIcon, disposeTrayIcon } from "../desktop/tray/main";
import { errorMessage } from "../errorlogic/main";
import { CurrentState } from "../state/main";
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

  let req;

  try {
    req = await fetch(
      `${host}/${path}${paramStr}`,
      noAuth ? { body: body } : init
    );
  } catch {
    if (get(CurrentState).name == "Desktop") invalidServerResponse(path);

    return {};
  }

  const txt = await req.text();

  if (
    !req.ok &&
    tokenAuth &&
    !`200|304`.includes(`${req.status}`) &&
    get(CurrentState).name == "Desktop"
  ) {
    invalidServerResponse(path);

    return {};
  }

  if (!noBody) {
    try {
      return JSON.parse(txt);
    } catch {
      return {};
    }
  }

  return {};
}

export function invalidServerResponse(path: string) {
  createTrayIcon({
    identifier: "ArcAPI Error",
    icon: "warning",
    image: null,
    onOpen(tray) {
      disposeTrayIcon(tray.identifier);

      errorMessage(
        `ArcAPI Error`,
        `ArcOS was unable to make a request to ArcAPI on path "${path}". Please check your internet connection and try again.`,
        null,
        null,
        { caption: "OK", action() {} }
      );
    },
  });
}
