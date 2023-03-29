import { get } from "svelte/store";
import { generateCredToken } from "../../api/cred";
import { rememberedLogin } from "../../api/getter";
import { ArcOSVersion } from "../../env/main";
import sleep from "../../sleep";
import { UserData } from "../../userlogic/interfaces";
import type { ArcTerm } from "../main";

export async function authPrompt(a: ArcTerm) {
  const udata = get(UserData);

  if (udata) return true;

  const server = localStorage.getItem("arcos-server");

  a.std.writeLine(`ArcTerm ${ArcOSVersion} login\n\n`);

  const username = await a.std.read(`${server} login: `, "", 100);
  const password = await a.std.read("Password: ", "", 100, true);

  const token = generateCredToken({ username, password });

  localStorage.setItem("arcos-remembered-token", token);

  await rememberedLogin();

  if (!get(UserData)) {
    a.std.writeLine("Login incorrect, restarting in 5 seconds...");

    await sleep(5000);

    location.reload();

    return false;
  }

  await a.env.config.loadConfigFile();

  return true;
}
