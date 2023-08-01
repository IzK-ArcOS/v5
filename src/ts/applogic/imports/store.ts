import { AppInfo } from "../apps/AppInfo";
import { AppManager } from "../apps/AppManager";
import { ArcTerm } from "../apps/ArcTerm";
import { BugReports } from "../apps/BugReports";
import { CalculatorApp } from "../apps/Calculator";
import { DonutApp } from "../apps/Donut";
import { ErrorCreator } from "../apps/ErrorCreator";
import { Exit } from "../apps/Exit";
import { FileBrowserApp } from "../apps/FileBrowser";
import { ImageViewer } from "../apps/ImageViewer";
import { LightsOff } from "../apps/LightsOff";
import { LoggerApp } from "../apps/Logger";
import { MarkDownViewer } from "../apps/MarkDownViewer";
import { MediaPlayerApp } from "../apps/MediaPlayer";
import { MessagingApp } from "../apps/MessagingApp";
import { OpenWithApp } from "../apps/OpenWith";
import { TextEditor } from "../apps/TextEditor";
import { SettingsApp } from "../apps/settings";
import { ArcShell } from "../apps/shell";
import { DesktopWallpaper } from "../apps/wallpaper";
import type { App } from "../interface";

export const DefaultApps: { [key: string]: App } = {
  ErrCre: ErrorCreator,
  /** Visible Applications */
  FileManager: FileBrowserApp,
  TextEditor,
  CalculatorApp,
  MessagingApp,
  SettingsApp,
  AppMan: AppManager,
  LoggerApp,
  ArcTerm,
  DonutApp,
  LightsOff,
  ArcShell,

  /** Hidden applications */
  Exit,
  AppInfo,
  ImageViewer,
  OpenWithApp,
  MarkDownViewer,
  MediaPlayerApp,
  DesktopWallpaper,
  BugReports,
};

export const SystemApps: string[] = [
  "AppMan",
  "Exit",
  "SettingsApp",
  "PfpSelector",
  "AppInfo",
  "LoggerApp",
  "FileManager",
  "ArcShell",
  "DesktopWallpaper",
];
