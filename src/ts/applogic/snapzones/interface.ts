export interface SnapTriggerBounds {
  lTrig: TriggerCord;
  rTrig: TriggerCord;
  lZone: TriggerCord;
  rZone: TriggerCord;
}

export interface TriggerCord {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
}
