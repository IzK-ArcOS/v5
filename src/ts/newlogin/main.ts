import { get, writable } from "svelte/store";
import { loginUsingCreds } from "../api/getter";
import { ConnectedServer } from "../api/main";
import { fromBase64, toBase64 } from "../base64";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import sleep from "../sleep";
import type { State } from "../state/interfaces";
import { applyState } from "../state/main";
import { AllUsers, UserData } from "../userlogic/interfaces";
import { getUsers } from "../userlogic/main";

export class Login {
  public CurrentState = writable<State>();
  public UserName = writable<string>();
  public UserCache = writable<AllUsers>();
  public userBackground = writable<string>("img15");
  private _defaultState: string;
  private _states: Map<string, State>;

  constructor(
    states: Map<string, State>,
    initialState: string,
    doOnMount = true
  ) {
    Log("newlogin/main.ts: Login.constructor", `Creating new login class`);

    this._states = states;
    this._defaultState = initialState;

    this.UserCache.subscribe(() => this.updateLoginBackground());
    this.UserName.subscribe(() => this.updateLoginBackground());

    if (doOnMount) this.onMount();
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

    Log(
      "newlogin/main.ts: Login.onMount",
      `isFreshApi=${isFreshApi} StateIsIncoming=${stateIsIncoming}`
    );

    if (isFreshApi) {
      if (!currentApi) return applyState("fts");

      return this.navigate("newuserauth");
    }

    if (!loginState)
      this.navigate(remembered ? "autologin" : "existinguserauth");
    if (!remembered || !stateIsIncoming) return;

    const username = fromBase64(remembered).split(":")[0];

    this.setUser(username);

    const userdata = await loginUsingCreds(remembered);

    if (!userdata) {
      this.navigate("existinguserauth");

      localStorage.removeItem("arcos-remembered-token");

      return;
    }

    this.proceed(userdata, username);
  }

  private updateLoginBackground(v?: AllUsers) {
    v = v || get(this.UserCache);

    if (!v) return this.userBackground.set("img15");

    const username = get(this.UserName);
    const user = v[username];

    if (!user || !user.acc || !user.acc.loginBackground)
      return this.userBackground.set("img15");

    this.userBackground.set(user.acc.loginBackground);
  }

  public async Authenticate(username: string, password: string) {
    const token = toBase64(`${username}:${password}`);
    const userdata = await loginUsingCreds(token);

    if (!userdata) return false;

    localStorage.setItem("arcos-remembered-token", token);
    UserData.set(userdata);

    this.setUser(username);

    return userdata;
  }

  public async proceed(userdata: Object, username: string, delay = 1500) {
    Log(
      "newlogin/main.ts: Login.proceed",
      `Proceeding to desktop after ${delay / 1000} seconds`
    );

    this.UserName.set(username);

    this.setUser(username);
    UserData.set(userdata as UserData);

    await sleep(delay);

    applyState("desktop");
  }

  public setUser(username: string) {
    this.UserName.set(username);
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
}
