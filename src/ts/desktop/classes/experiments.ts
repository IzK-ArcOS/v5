import { get } from "svelte/store";
import { UserData } from "../../userlogic/interfaces";
import { Experiments, getExperiments } from "../experiments/main";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";

export async function experimentsClasses() {
  let result = "";

  if (!get(Experiments)) {
    Log(
      "classes/experiments.ts: experimentsClasses",
      "No experiments! Initializing before generating classes.",
      LogLevel.warn
    );
    await getExperiments();
  }

  const experiments = get(Experiments);

  const udata = get(UserData);
  const loaded = udata.appdata.experiments;

  if (!loaded) return result;

  const entries = Object.entries(loaded);

  for (let i = 0; i < entries.length; i++) {
    if (!experiments[entries[i][0]]) continue;

    if (entries[i][1]) result += `exp-${entries[i][0]} `;
  }

  return result;
}
