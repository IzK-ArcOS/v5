import { get } from "svelte/store";
import { Log, LogLevel } from "../../console";
import { UserToken } from "../../userlogic/interfaces";
import { apiCall, ConnectedServer } from "../main";

export function getParentDirectory(p: string) {
  const split = p.split("/");

  console.log(split);

  if (p == "./") return p;
  if (!split.length) return p;

  if (split.length == 1) return "./";

  const newPath = split.splice(0, 1).join("/");

  console.log(newPath);

  return newPath;
}
