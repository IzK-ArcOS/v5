import { get } from "svelte/store";
import { generateCredToken } from "../../api/cred";
import { rememberedLogin } from "../../api/getter";
import { testConnection } from "../../api/test";
import { ArcOSVersion } from "../../env/main";
import sleep from "../../sleep";
import { UserName } from "../../userlogic/interfaces";
import type { ArcTerm } from "../main";
import { addServer, getServer } from "../../api/server";
import { setAuthcode } from "../../api/authcode";
import { ARCOS_MODE } from "../../branding";

export async function authPrompt(term: ArcTerm, usr = "") {
  const udata = get(UserName);

  if (udata) return true;

  let api = getServer();

  if (!api) api = await serverConnect(term);

  await rememberedLogin();

  await sleep(250);

  if (get(UserName)) {
    await term.env.config.loadConfigFile();
    return true;
  }

  term.std.clear();
  term.std.writeLine(`ArcTerm ${ArcOSVersion} ${ARCOS_MODE} ${api} atm1\n\n`);

  const username = await term.std.read(`${api} login: `, "", 100, false, usr);
  const password = await term.std.read("Password: ", "", 100, true);

  const token = generateCredToken({ username: username, password });

  localStorage.setItem("arcos-remembered-token", token);

  await rememberedLogin();

  if (!get(UserName)) return await authPrompt(term, username);

  await term.env.config.loadConfigFile();

  return true;
}

async function serverConnect(term: ArcTerm) {
  term.std.clear();
  term.std.writeLine(`ArcTerm ${ArcOSVersion} - Connect to server\n\n`);

  const server = await term.std.read("Server: ", "", 50);
  const authCode = await term.std.read("Code (optional): ", "", 64, true);

  term.std.writeLine(`Connecting to ${server}...`);

  if (!(await testConnection(server, authCode)))
    return await serverConnect(term);

  addServer(server);
  setAuthcode(server, authCode);

  return server;
}
