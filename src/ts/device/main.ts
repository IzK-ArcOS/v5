import { getCPU } from "./cpu";
import { getGPU } from "./gpu";
import { getMEM } from "./mem";
import { getNET } from "./net";

import type { DeviceInfo } from "./interface";

export function getDeviceInfo(): DeviceInfo {
  return {
    gpu: getGPU(),
    cpu: getCPU(),
    mem: getMEM(),
    net: getNET(),
  };
}
