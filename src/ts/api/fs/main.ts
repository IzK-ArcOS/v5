import { get } from "svelte/store";
import { Log, LogLevel } from "../../console";
import { UserToken } from "../../userlogic/interfaces";
import { apiCall, ConnectedServer } from "../main";

export function getParentDirectory(p: string) {
  const split = p.split("/");

  if (p == "./") return p;
  if (!split.length) return p;

  if (split.length == 1) return "./";

  split.splice(-1);

  const newPath = split.join("/");

  console.warn(newPath);

  return newPath;
}
