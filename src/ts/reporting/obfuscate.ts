import { getAuthcode } from "../api/authcode";
import { getServer } from "../api/server";

export function removeApiSensitive(str: string): string {
  const api = getServer();
  const ac = getAuthcode(api);

  str = str.replaceAll(api, "<api>");

  if (ac && ac.length) str = str.replaceAll(ac, "<ac>");

  return str;
}
