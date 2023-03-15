import type { Memory } from "./interface";

export function getMEM(): Memory {
  const nav = navigator as { deviceMemory?: number };
  return { kb: (nav.deviceMemory || 1) * 1024 ** 3 };
}
