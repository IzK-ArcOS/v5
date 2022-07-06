import dayjs from "dayjs";

export interface LogItem {
  timestamp?: number;
  level: LogLevel;
  msg: string;
  source: string;
}

export enum LogLevel {
  info,
  warn,
  error,
  critical,
}

export const LogLevelData: { [key: string]: { capt: string; css: string } } = {
  info: {
    capt: "INFO",
    css: "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#83A598;margin-right:10px;",
  },
  warn: {
    capt: "WARN",
    css: "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#fabd2f;margin-right:10px;",
  },
  error: {
    capt: "ERRR",
    css: "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#CC241D;margin-right:10px;",
  },
  critical: {
    capt: "CRIT",
    css: "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#71120E;margin-right:10px;",
  },
};

export const log: LogItem[] = [];

export function Log(data: LogItem) {
  data.timestamp = new Date().getTime();
  log.push(data);

  const levelData = LogLevelData[LogLevel[data.level]];

  const timeStampCSS = "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px";
  const dataSourceCSS = "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#555;";

  console.log(
    `%c${dayjs(data.timestamp || 0).format("DD-MM-YYYY HH:mm:ss.mmm")}%c${levelData.capt}%c${data.source}%c${data.msg}`,
    timeStampCSS,
    levelData.css,
    dataSourceCSS,
    "margin-left:10px"    
  );
}
