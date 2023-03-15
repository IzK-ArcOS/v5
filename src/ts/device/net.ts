import type { Network } from "./interface";

export const defaultNetwork: Network = {
  downlink: 0,
  effectiveType: "0G",
  rtt: 0,
  saveData: false,
  online: false,
};

export function getNET(): Network {
  const connection = (navigator as any).connection;

  if (!connection) return defaultNetwork;

  return connection as Network;
}
