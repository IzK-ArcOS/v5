import type { Params } from "./interface";

export function generateParamStr(params: Params) {
  let str = "?";
  const entries = Object.entries(params);

  for (let i = 0; i < entries.length; i++) {
    str += `${entries[i][0]}=${entries[i][1]}&`;
  }

  return str;
}
