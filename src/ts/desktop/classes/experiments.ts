import { get } from "svelte/store";
import { UserData } from "../../userlogic/interfaces";

export function experimentsClasses() {
  let result = "";

  const udata = get(UserData);

  const experiments = udata.appdata.experiments;

  if (!experiments) return result;

  const entries = Object.entries(experiments);

  for (let i = 0; i < entries.length; i++) {
    if (entries[i][1]) result += `exp-${entries[i][0]} `;
  }

  return result;
}
