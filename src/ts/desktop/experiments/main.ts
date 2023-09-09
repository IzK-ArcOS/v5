import { writable } from "svelte/store";
import type { Experiments as ExperimentsType } from "./interface";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";

const EXPERIMENTS_URL =
  "https://arcapi.nl/topsecret/experiments/experiments.json";

export const Experiments = writable<ExperimentsType>({});

export async function getExperiments() {
  Log(
    "desktop/experiments/main.ts: getExperiments",
    "Getting experiments from CDN"
  );
  try {
    const req = await fetch(EXPERIMENTS_URL);

    if (!req.ok) return false;

    try {
      const json = JSON.parse(await req.text()) as ExperimentsType;

      Experiments.set(json);
      Log("desktop/experiments/main.ts: getExperiments", "Experiments updated");

      return json;
    } catch {
      Log(
        "desktop/experiments/main.ts: getExperiments",
        "Could not get experiments",
        LogLevel.error
      );
      return false;
    }
  } catch {
    return false;
  }
}
