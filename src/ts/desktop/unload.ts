import { AppInfoId } from "../applogic/apps/AppInfo";
import { AppPokerData } from "../applogic/apps/AppManager/Manager";
import { CalculatorValue } from "../applogic/apps/Calculator/main";
import { currentCollapsibleT, currentSettingsPage } from "../applogic/apps/SettingsApp/main";
import { focusedWindowId, isFullscreenWindow, maxZIndex, WindowStore } from "../applogic/store";
import { DevModeOverride } from "../devmode/props";
import { ErrorWindowStore } from "../errorlogic/app";
import { loginUsername } from "../login/main";
import { NotificationStore } from "../notiflogic/main";
import { UserData, UserName } from "../userlogic/interfaces";
import { ActionCenterOpened } from "./actioncenter/main";
import { startOpened } from "./main";
import { trayIcons } from "./tray/main";

export function unloadVariables() {
    NotificationStore.set({});
    currentCollapsibleT.set(null);
    currentSettingsPage.set(null);
    UserData.set(null);
    UserName.set(null);
    loginUsername.set(null);
    isFullscreenWindow.set(false);
    maxZIndex.set(1e9);
    focusedWindowId.set(null);
/*     AppInfoId.set(null);
    AppPokerData.set(null); */
    CalculatorValue.set("");
    startOpened.set(false);
    ActionCenterOpened.set(false);
    
    WindowStore.set([]);
    ErrorWindowStore.set([]);
    trayIcons.set([]);
    DevModeOverride.set(false);
}