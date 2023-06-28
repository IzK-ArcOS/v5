import { get } from "svelte/store";
import { generateCredToken } from "../../api/cred";
import { rememberedLogin } from "../../api/getter";
import { testConnection } from "../../api/test";
import { ArcOSVersion } from "../../env/main";
import sleep from "../../sleep";
import { UserName } from "../../userlogic/interfaces";
import type { ArcTerm } from "../main";
import { addServer, getServer } from "../../api/server";

export async function authPrompt(a: ArcTerm, usr = "") {
  const udata = get(UserName);

  if (udata) return true;

  let server = getServer();

  if (!server) server = await serverConnect(a);

  await rememberedLogin();

  await sleep(250);

  if (get(UserName)) {
    await a.env.config.loadConfigFile();
    return true;
  }

  a.std.clear();
  a.std.writeLine(`ArcTerm ${ArcOSVersion} - ${server}\n\n`);

  const username = await a.std.read(`${server} login: `, "", 100, false, usr);
  const password = await a.std.read("Password: ", "", 100, true);

  const token = generateCredToken({ username: username, password });

  localStorage.setItem("arcos-remembered-token", token);

  await rememberedLogin();

  if (!get(UserName)) return await authPrompt(a, username);

  await a.env.config.loadConfigFile();

  return true;
}

async function serverConnect(a: ArcTerm) {
  a.std.clear();
  a.std.writeLine(`ArcTerm ${ArcOSVersion} - Connect to server\n\n`);

  const s = await a.std.read("Server: ", "", 50);

  a.std.writeLine(`Connecting to ${s}...`);

  if (!(await testConnection(s))) {
    a.std.writeLine(`Connection failed! Restarting...`);

    await sleep(1000);

    location.reload();

    await sleep(2000);

    return "";
  }

  addServer(s);

  return s;
}
