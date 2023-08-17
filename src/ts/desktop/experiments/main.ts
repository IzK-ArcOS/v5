import { writable } from "svelte/store";
import type { Experiments as ExperimentsType } from "./interface";

const EXPERIMENTS_URL =
  "https://arcapi.nl/topsecret/experiments/experiments.json";

export const Experiments = writable<ExperimentsType>({});

export async function getExperiments() {
  const req = await fetch(EXPERIMENTS_URL);
  if (!req.ok) return false;

  try {
    const json = JSON.parse(await req.text()) as ExperimentsType;

    Experiments.set(json);

    return json;
  } catch {
    return false;
  }
}
