import type { App } from "../../interface";
import type { Row, Tablet, TileContent } from "./interface";

export class TwentyUtil {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  genNewTileValue = (): number => (Math.random() > 0.9 ? 2 : 1);

  isEmptyTile = (tile: TileContent): boolean => tile.value === 0;

  transpose = (matrix: Tablet): Tablet => {
    return matrix.reduce(
      (prev: Row[], next: Row) =>
        next.map<Row>((item, i: number) => [...(prev[i] || []), next[i]]),
      []
    );
  };

  reverse = (matrix: Tablet) => matrix.map((row) => row.reverse());
}
