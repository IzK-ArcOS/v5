import { get, writable } from "svelte/store";
import { Log } from "../console";
import type { State } from "../state/interfaces";
import { LogLevel } from "../console/interface";
import { getUsers } from "../userlogic/main";
import { ConnectedServer } from "../api/main";
import sleep from "../sleep";
import { applyState } from "../state/main";
import { loginUsingCreds } from "../api/getter";
import { fromBase64 } from "../base64";
import { applyLoginState } from "../login/main";
import { UserData, UserName } from "../userlogic/interfaces";

export class Login {
  public CurrentState = writable<State>();
  public UserName = writable<string>();
  private _defaultState: string;
  private _states: Map<string, State>;

  constructor(states: Map<string, State>, initialState: string) {
    Log("newlogin/main.ts: Login.constructor", `Creating new login class`);

    this._states = states;
    this._defaultState = initialState;

    this.onMount();
  }

  navigate(state: string, fromInit = false) {
    if (!this._states.has(state) && !fromInit) {
      if (!fromInit) return this.navigate(this._defaultState);

      return Log(
        "newlogin/main.ts: Login.navigate",
        `Can't use non-existent initial state ${this._defaultState}!`,
        LogLevel.critical
      );
    }

    Log("newlogin/main.ts: Login.navigate", `Navigating to ${state}`);

    this.CurrentState.set(this._states.get(state));
  }

  private async onMount() {
    const allUsers = await getUsers();
    const remembered = localStorage.getItem("arcos-remembered-token");
    const loginState = get(this.CurrentState);
    const currentApi = get(ConnectedServer);
    const isFreshApi = !Object.keys(allUsers).length && !remembered;
    const stateIsIncoming = loginState
      ? loginState.key != "shutdown" && loginState.key != "restart"
      : true;

    if (isFreshApi) {
      if (!currentApi) return applyState("fts");

      return this.navigate("newapiuser");
    }

    if (!loginState) this.navigate(remembered ? "autologin" : "todesktop");

    if (!remembered || !stateIsIncoming) return;

    const userdata = await loginUsingCreds(remembered);
    const username = fromBase64(remembered).split(":")[0];

    if (!userdata) {
      applyLoginState("todesktop");

      localStorage.removeItem("arcos-remembered-token");

      return;
    }

    this.UserName.set(username);

    UserData.set(userdata);
    UserName.set(username);

    await sleep(1900);

    applyState("desktop");
  }
}
