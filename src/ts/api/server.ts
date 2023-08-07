import { Log } from "../console";
import { LogLevel } from "../console/interface";

export function getServer(): string {
  Log(
    "api/server.ts: getServer",
    "Getting current server (arcos-current-server)",
    LogLevel.info
  );

  const server = localStorage.getItem("arcos-current-server");

  if (!server) {
    Log(
      "api/server.ts: getServer",
      "arcos-current-server does not exist, falling back to remembered servers",
      LogLevel.warn
    );

    const all = getAllServers();

    if (!all.length) {
      Log(
        "api/server.ts: getServer",
        "Fallback failed: no servers to select from",
        LogLevel.error
      );

      return null;
    }

    const server = all[all.length - 1];

    setServer(server);

    return server;
  }

  return localStorage.getItem("arcos-current-server");
}

export function instanceHasServers(): boolean {
  return getServer() && !!getAllServers().length;
}

export function getAllServers(): string[] {
  Log(
    "api/server.ts: getAllServers",
    "Retrieving all servers from arcos-servers",
    LogLevel.info
  );

  if (!localStorage.getItem("arcos-servers")) return [];

  return JSON.parse(localStorage.getItem("arcos-servers")) as string[];
}

export function addServer(server: string, makeDefault = true): void {
  Log(
    "api/server.ts: addServer",
    `Adding server ${server} to arcos-servers`,
    LogLevel.info
  );

  const all = getAllServers();

  if (!all.includes(server)) all.push(server);

  localStorage.setItem("arcos-servers", JSON.stringify(all));

  if (makeDefault) setServer(server);
}

export function removeServer(server: string): boolean {
  Log(
    "api/server.ts: removeServer",
    `Removing ${server} from arcos-servers`,
    LogLevel.info
  );

  const all = getAllServers();

  if (!all.includes(server)) return false;

  all.splice(all.indexOf(server), 1);

  localStorage.setItem("arcos-servers", JSON.stringify(all));

  return true;
}

export function migrateToMulti() {
  Log(
    "api/server.ts: migrateToMulti",
    "Migrating single-API localStorage state to multi-API",
    LogLevel.info
  );

  const server = localStorage.getItem("arcos-server");

  if (!server) return;

  addServer(server);

  localStorage.removeItem("arcos-server");
}

export function setServer(server: string) {
  localStorage.setItem("arcos-current-server", server);
  localStorage.removeItem("arcos-current-token");
}
