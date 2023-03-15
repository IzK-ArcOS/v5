export const CAPTIONS = {
  gpu: "Graphics Card",
  cpu: "Processor",
  mem: "Memory",
  net: "Networking",
};

export interface DeviceInfo {
  gpu: GPU;
  cpu: CPU;
  mem: Memory;
  net: Network;
}

export interface GPU {
  supported: boolean;
  active: boolean;
  vendor: string;
  model: string;
}

export interface CPU {
  cores: number;
}

export interface Network {
  downlink: number;
  effectiveType: string;
  onchange?: Event;
  rtt: number;
  saveData: boolean;
  online: boolean;
}

export interface Memory {
  kb: number;
}
