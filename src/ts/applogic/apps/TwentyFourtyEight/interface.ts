export type GameKeys = "ArrowUp" | "ArrowDown" | "ArrowRight" | "ArrowLeft";

export type GameActions = {
  [key in GameKeys]: (state: GameState) => GameState;
};

export enum Moves {
  "up",
  "down",
  "left",
  "right",
}

export type MovesType = keyof typeof Moves;

export type PositionTile = {
  top: number;
  left: number;
};

export type TileContent = {
  prevPosition?: PositionTile;
  position?: PositionTile;
  value: number;
  merged: boolean;
  swipe: boolean;
  new: boolean;
};
export type Row = Array<TileContent>;
export type Tablet = Array<Row>;

export type GameState = {
  dimension: number;
  tablet: Tablet;
  actions: GameActions;
  score: number;
  finished: boolean;
};
