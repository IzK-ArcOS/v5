import type { Cred } from "./interface";

export function generateCredToken(cred: Cred) {
  if (!cred) return "";
  return btoa(`${cred.username}:${cred.password}`);
}
