import { Writable } from "svelte/store";
import type { AppRuntime } from "../../runtime/main";
import { App } from "../../interface";

type Nullable<T> = T | null;

interface Box {
  modifier: number;
  class: string;
  yoffset: number;
}

declare class QlorbRuntime extends AppRuntime {
  public readonly random: (m: number) => number;
  public readonly Boxes: Writable<number>;
  public readonly BoxesOffset: Writable<number>;
  public readonly Clicks: Writable<number>;
  public readonly Score: Writable<number>;
  public readonly OldScore: Writable<number>;
  public readonly OldClicks: Writable<number>;
  public readonly BOX_SIZE: number;
  public readonly BOX_VALUES: number[];

  constructor(app: App);

  /**
   * Spawn a new box (orb) with provided or random data.
   * @param props The box data
   * @param useOffset (for createRandomBox) Use the vertical offset?
   * @param forcePositive (for createRandomBox) Force the value to be positive?
   * @returns The box that it spawned
   */
  public spawnBox(
    props?: Nullable<Box>,
    useOffset?: boolean,
    forcePositive?: boolean
  ): Box;

  /**
   * Generate a box with random `yoffset` and `modifier`
   * @param useOffset Use the vertical offset?
   * @param forcePositive Force the value to be positive?
   */
  public createRandomBox(useOffset?: boolean, forcePositive?: boolean): Box;

  /**
   * Returns the class the box should get based on the modifier.
   * @param mod The modifier
   */
  private findBoxClass(mod: number): string;

  /**
   * Appends the specified Box's score to the user's score
   * @param box The Box to get the modifier from
   * @param button The box button (to blur it)
   */
  public ScorePoints(box: Box, button?: HTMLButtonElement): void;

  /**
   * Turns the score to negative before passing the arguments through to `ScorePoints`
   * @param box The Box to get the modifier from
   * @param button The box button (to blur it)
   */
  public ScoreNegativePoints(box: Box, button?: HTMLButtonElement): void;

  /**
   * Reduces the score by 100. It sets the score to 0 if it is already below 100
   */
  private levelDown(): void;

  /**
   * Calls `levelDown` to subtract the score and resets the clicks
   */
  public clickReset(): void;

  /**
   * Saves the Score and Clicks writables to OldScore and OldClicks respectively.
   */
  private saveOldScore(): void;

  /**
   * Resets all stores to their default values.
   */
  public flushStores(): void;
}
