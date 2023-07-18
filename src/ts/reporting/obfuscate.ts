import { getAuthcode } from "../api/authcode";
import { getServer } from "../api/server";

export function removeApiSensitive(str: string): string {
  const api = getServer();
  const ac = getAuthcode(api);

  return str.replaceAll(api, "<api>").replaceAll(ac, "<ac>");
}
