import { AppInfo } from "../apps/AppInfo";
import { AppManager } from "../apps/AppManager";
import { ArcTerm } from "../apps/ArcTerm";
import { CalculatorApp } from "../apps/Calculator";
import { DonutApp } from "../apps/Donut";
import { ErrorCreator } from "../apps/ErrorCreator";
import { Exit } from "../apps/Exit";
import { FileBrowserApp } from "../apps/FileBrowser";
import { HelpCenter } from "../apps/HelpCenter";
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
  SettingsApp: SettingsApp,
  AppMan: AppManager /* 
  TestApp: TestApp, */,
  LoggerApp,
  /** Hidden applications */
  Exit: Exit,
  AppInfo,
  ImageViewer,
  OpenWithApp,
  MarkDownViewer,
  MediaPlayerApp,
  ArcShell,
  DesktopWallpaper,
  DonutApp,
  ArcTerm,
  HelpCenter,
  LightsOff,
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
