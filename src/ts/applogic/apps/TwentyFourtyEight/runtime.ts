import type { App } from "../../interface";
import { AppRuntime } from "../../runtime/main";
import type { GameState, Row, Tablet, TileContent } from "./interface";
import { TwentyUtil } from "./util";

export class TwentyRuntime extends AppRuntime {
  util: TwentyUtil;

  constructor(app: App) {
    super(app);

    this.util = new TwentyUtil(app);
  }

  genRow = (dimension: number): Row =>
    [...Array<TileContent>(dimension).keys()].map(() => ({
      value: 0,
      merged: false,
      new: false,
      swipe: false,
    }));

  genTablet = (dimension: number): Tablet =>
    [...Array<Row>(dimension).keys()].map(() => this.genRow(dimension));

  hasEmptyTiles = (tablet: Tablet): boolean =>
    tablet.filter(
      (row) => row.filter((tile) => this.util.isEmptyTile(tile)).length > 0
    ).length > 0;

  populateNewTile = (arr: Tablet, row: number, tile: number): Tablet => {
    return [
      ...arr.slice(0, row),
      [
        ...arr[row].slice(0, tile),
        {
          ...arr[row][tile],
          value: this.util.genNewTileValue(),
          new: true,
          position: { top: row, left: tile },
        },
        ...arr[row].slice(tile + 1, arr[row].length),
      ],
      ...arr.slice(row + 1, arr.length),
    ];
  };

  reposition = (tablet: Tablet): Tablet => {
    return tablet.map((row, rowIndex) =>
      row.map((tile, tileIndex) => ({
        ...tile,
        new: false,
        ...(tile.position ? { prevPosition: tile.position } : {}),
        ...(tile.value > 0
          ? { position: { top: rowIndex, left: tileIndex } }
          : {}),
      }))
    );
  };

  genNewTiles = (tablet: Tablet): Tablet => {
    if (!this.hasEmptyTiles(tablet)) return tablet;

    const randomRow = Math.floor(Math.random() * tablet.length);
    const randomTile = Math.floor(Math.random() * tablet.length);

    return this.util.isEmptyTile(tablet[randomRow][randomTile])
      ? this.populateNewTile(tablet, randomRow, randomTile)
      : this.genNewTiles(tablet);
  };

  merge = (row: Row): Row => {
    const current = row[0];
    const next = row[1];
    const canMerge =
      Boolean(current) && Boolean(next) && current.value === next.value;
    const newRow = row.slice(canMerge ? 2 : 1);
    return [
      ...(canMerge
        ? [{ ...current, value: current.value + 1, merged: true }]
        : [...(Boolean(current) ? [current] : [])]),
      ...(newRow.length > 1
        ? this.merge(newRow)
        : Boolean(next) && !canMerge
        ? [next]
        : newRow),
    ];
  };

  normalize = (tablet: Tablet): Tablet => {
    return tablet.map((row, rowIndex) => {
      const noZeroTiles = row.filter((tile) => !this.util.isEmptyTile(tile));
      const merged = this.merge(noZeroTiles);
      return [...merged, ...this.genRow(tablet.length - merged.length)];
    });
  };

  getScore = (tablet: Tablet) =>
    tablet.reduce(
      (score: number, row: Row) =>
        row.reduce(
          (rowScore: number, tile: TileContent) =>
            (tile.value > 0 ? 2 ** tile.value : 0) + rowScore,
          0
        ) + score,
      0
    );

  nextState = (state: GameState, newTablet: Tablet) => ({
    ...state,
    finished: false,
    score: this.getScore(newTablet),
    tablet: newTablet,
  });

  genInitialState = (dimension: number): GameState => {
    const state = {
      dimension,
      score: 0,
      finished: false,
      tablet: this.genNewTiles(this.genTablet(dimension)),
      actions: {
        ArrowUp: (state: GameState) =>
          this.nextState(
            state,
            this.genNewTiles(
              this.reposition(
                this.util.transpose(
                  this.normalize(this.util.transpose(state.tablet))
                )
              )
            )
          ),
        ArrowDown: (state: GameState) =>
          this.nextState(
            state,
            this.genNewTiles(
              this.reposition(
                this.util
                  .transpose(
                    this.normalize(this.util.transpose(state.tablet.reverse()))
                  )
                  .reverse()
              )
            )
          ),
        ArrowLeft: (state: GameState) =>
          this.nextState(
            state,
            this.genNewTiles(this.reposition(this.normalize(state.tablet)))
          ),
        ArrowRight: (state: GameState) =>
          this.nextState(
            state,
            this.genNewTiles(
              this.reposition(
                this.util.reverse(
                  this.normalize(this.util.reverse(state.tablet))
                )
              )
            )
          ),
      },
    };

    console.log(state);

    return state;
  };
}
