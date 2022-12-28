export interface TrayIcon {
  onOpen: (tray: TrayIcon) => void;
  image: string;
  // Override for the image to display a material-icon instead.
  icon?: string;
  identifier: string;
}
