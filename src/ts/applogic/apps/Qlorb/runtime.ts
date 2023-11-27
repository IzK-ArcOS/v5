import { get, writable } from "svelte/store";
import type { App } from "../../interface";
import { AppRuntime } from "../../runtime/main";

export class QlorbRuntime extends AppRuntime {
  public random = (m: number) => Math.floor(Math.random() * m);
  public Boxes = writable<Box[]>([]);
  public BoxesOffset = writable<number>(0);
  public Clicks = writable<number>(0);
  public Score = writable<number>(0);
  public OldScore = writable<number>(0);
  public OldClicks = writable<number>(0);
  public BOX_SIZE = 30;
  public BOX_VALUES = [1, -1, -1, 5, 2, -5, -4, 1, -2];

  constructor(app: App) {
    super(app);
  }

  public spawnBox(
    props?: Nullable<Box>,
    useOffset?: boolean,
    forcePositive = false
  ) {
    const boxProps: Box =
      props || this.createRandomBox(useOffset, forcePositive);

    this.Boxes.update((v) => {
      v.push(boxProps);

      return v;
    });

    this.BoxesOffset.update((v) => v + 1);

    return boxProps;
  }

  public createRandomBox(useOffset = true, forcePositive = false): Box {
    const values = !forcePositive
      ? this.BOX_VALUES
      : this.BOX_VALUES.filter((v) => v > 0);
    const modifier = values[this.random(values.length)];
    const offset = this.random(this.BOX_SIZE * 2);

    const box: Box = {
      modifier,
      class: this.findBoxClass(modifier),
      yoffset: useOffset ? offset : 0,
    };

    return box;
  }

  public findBoxClass(mod: number): string {
    if (mod > 3) return "golden";
    if (mod < 0) return "bad";
    if (mod == 1) return "good";
    if (mod == 0) return "neutral";

    return "good";
  }

  public ScorePoints(box: Box, button?: HTMLButtonElement) {
    if (box.modifier < 0) return this.clickReset();

    this.Score.update((v) => v + box.modifier);
    this.Clicks.update((v) => v + 1);

    this.spawnBox();

    if (button) button.blur();
  }

  public ScoreNegativePoints(box: Box, button?: HTMLButtonElement) {
    this.ScorePoints({ ...box, modifier: -box.modifier }, button);
  }

  public levelDown() {
    const score = get(this.Score);

    if (score < 100) return this.Score.set(0);

    return this.Score.set(score - 100);
  }

  public clickReset() {
    this.saveOldScore();
    this.Clicks.set(0);
    this.levelDown();
  }

  public saveOldScore() {
    this.OldScore.set(get(this.Score));
    this.OldClicks.set(get(this.Clicks));
  }
}
