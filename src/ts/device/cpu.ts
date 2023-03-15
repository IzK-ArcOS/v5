import type { CPU } from "./interface";

export function getCPU(): CPU {
  const cpu = {
    cores: navigator.hardwareConcurrency || 4,
  };

  return cpu as CPU;
}
