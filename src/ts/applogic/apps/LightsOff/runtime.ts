import { get, writable, type Writable } from "svelte/store";
import { LogLevel } from "../../../console/interface";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { LightsOffIcon } from "../../../icon/apps";
import { UserData } from "../../../userlogic/interfaces";
import type { App } from "../../interface";
import { AppRuntime } from "../../runtime/main";
import type { LightsOffGrid } from "./interface";
import { LightsOffLevels } from "./levels";

export class LightsOffRuntime extends AppRuntime {
  xModifiers = [-1, 0, +1];
  yModifiers = [-1, +1];
  Grid: Writable<LightsOffGrid> = writable([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);
  Clicks = writable<number>(0);
  LEVEL = writable<number>(0);
  Levels: LightsOffLevels;

  constructor(app: App) {
    super(app);

    this.Levels = new LightsOffLevels(this);

    this.Grid.subscribe((v) => {
      if (!v) return;

      this.Levels.checkNextLevel();
      this.saveData();
    });
    this.LEVEL.subscribe(() => this.saveData());
    this.Clicks.subscribe(() => this.saveData());

    this.loadData();
  }

  containsLights() {
    this.Log("Checking lights", "containsLights");
    return JSON.stringify(get(this.Grid)).includes("true");
  }

  finish() {
    this.Log("User has won! Finishing...", "finish");

    this.LEVEL.set(0);
    this.Clicks.set(0);
    this.Levels.loadLevel(get(this.LEVEL));

    createOverlayableError(
      {
        title: "You Win!",
        message:
          "You've managed to complete all 8 levels of Lights Off. The game will be reset so you can play it again in the future.",
        buttons: [{ caption: "Play again", action() {}, suggested: true }],
        image: LightsOffIcon,
      },
      "LightsOff"
    );
  }

  ToggleLight(x: number, y: number) {
    this.Log(`Toggling ${x}x${y}`, "ToggleLight");

    const grid = get(this.Grid);

    if (!grid[y]) throw new Error(`y doesn't exist ${y}`);
    if (typeof grid[y][x] !== "boolean")
      throw new Error(`x doesn't exist ${y} ${x}`);

    this.Clicks.set(get(this.Clicks) + 1);

    for (let i = 0; i < this.xModifiers.length; i++) {
      const value = grid[y][x + this.xModifiers[i]];

      if (typeof value !== "boolean") continue;

      grid[y][x + this.xModifiers[i]] = !value;
    }

    for (let i = 0; i < this.yModifiers.length; i++) {
      const rowExists = Array.isArray(grid[y + this.yModifiers[i]]);

      if (!rowExists) continue;
      const value = grid[y + this.yModifiers[i]][x];

      if (typeof value !== "boolean") continue;

      grid[y + this.yModifiers[i]][x] = !value;
    }

    this.Grid.set(grid);
  }

  loadData() {
    this.Log("Loading Data from UserData", "loadData");

    const data = get(UserData).appdata[this.app.id];

    if (data) {
      this.Levels.loadLevel(data.level as number);
      this.Grid.set(data.grid as LightsOffGrid);
      this.Clicks.set(data.clicks as number);

      return;
    }

    this.Levels.loadLevel(0);
  }

  saveData() {
    if (get(this.LEVEL) == 0 && !this.containsLights())
      return this.Log("Not saving default state!", "saveData", LogLevel.warn);

    UserData.update((udata) => {
      udata.appdata[this.app.id] = {
        clicks: get(this.Clicks),
        level: get(this.LEVEL),
        grid: get(this.Grid),
      };

      return udata;
    });
  }
}
