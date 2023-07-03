import { Log, LogLevel } from "../console";

export function getServer(): string {
  Log({
    source: "api/server.ts: getServer",
    msg: "Getting current server (arcos-current-server)",
    level: LogLevel.info,
  });

  const server = localStorage.getItem("arcos-current-server");

  if (!server) {
    Log({
      source: "api/server.ts: getServer",
      msg: "arcos-current-server does not exist, falling back to remembered servers",
      level: LogLevel.warn,
    });

    const all = getAllServers();

    if (!all.length) {
      Log({
        source: "api/server.ts: getServer",
        msg: "Fallback failed: no servers to select from",
        level: LogLevel.error,
      });

      return null;
    }

    localStorage.setItem("arcos-current-server", all[all.length - 1]);

    return all[all.length - 1];
  }

  return localStorage.getItem("arcos-current-server");
}

export function instanceHasServers(): boolean {
  return getServer() && !!getAllServers().length;
}

export function getAllServers(): string[] {
  Log({
    source: "api/server.ts: getAllServers",
    msg: "Retrieving all servers from arcos-servers",
    level: LogLevel.info,
  });

  if (!localStorage.getItem("arcos-servers")) return [];

  return JSON.parse(localStorage.getItem("arcos-servers")) as string[];
}

export function addServer(server: string, makeDefault = true): void {
  Log({
    source: "api/server.ts: addServer",
    msg: `Adding server ${server} to arcos-servers`,
    level: LogLevel.info,
  });

  const all = getAllServers();

  if (!all.includes(server)) all.push(server);

  localStorage.setItem("arcos-servers", JSON.stringify(all));

  if (makeDefault) localStorage.setItem("arcos-current-server", server);
}

export function removeServer(server: string): boolean {
  Log({
    source: "api/server.ts: removeServer",
    msg: `Removing ${server} from arcos-servers`,
    level: LogLevel.info,
  });

  const all = getAllServers();

  if (!all.includes(server)) return false;

  all.splice(all.indexOf(server), 1);

  localStorage.setItem("arcos-servers", JSON.stringify(all));

  return true;
}

export function migrateToMulti() {
  Log({
    source: "api/server.ts: migrateToMulti",
    msg: "Migrating single-API localStorage state to multi-API",
    level: LogLevel.info,
  });

  const server = localStorage.getItem("arcos-server");

  if (!server) return;

  addServer(server);

  localStorage.removeItem("arcos-server");
}
