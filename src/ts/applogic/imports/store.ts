import { AppInfo } from "../apps/AppInfo";
import { AppManager } from "../apps/AppManager";
import { AppPoker } from "../apps/AppPoke";
import { CalculatorApp } from "../apps/Calculator";
import { DonutApp } from "../apps/Donut";
import { ErrorCreator } from "../apps/ErrorCreator";
import { Exit } from "../apps/Exit";
import { FileBrowserApp } from "../apps/FileBrowser";
import { ImageViewer } from "../apps/ImageViewer";
import { LoggerApp } from "../apps/Logger";
import { MarkDownViewer } from "../apps/MarkDownViewer";
import { MediaPlayerApp } from "../apps/MediaPlayer";
import { MessagingApp } from "../apps/MessagingApp";
import { OpenWithApp } from "../apps/OpenWith";
import { SettingsApp } from "../apps/settings";
import { ArcShell } from "../apps/shell";
import { TextEditor } from "../apps/TextEditor";
import { DesktopWallpaper } from "../apps/wallpaper";
import { ArcTerm } from "../apps/ArcTerm";
import { HelpCenter } from "../apps/HelpCenter";
import { AppLauncher } from "../apps/AppLauncher";
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
  AppPoker: AppPoker,
  Exit: Exit,
  AppInfo,
  ImageViewer,
  OpenWithApp,
  MarkDownViewer,
  MediaPlayerApp,
  ArcShell,
  AppLauncher,
  DesktopWallpaper,
  DonutApp,
  ArcTerm,
  HelpCenter,
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
