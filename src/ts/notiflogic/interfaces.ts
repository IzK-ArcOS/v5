export interface NotificationData {
  title: string;
  message: string;
  icon?: string;
  image?: string;
  timeout?: number;
  buttons: NotificationButton[];
}

export interface NotificationButton {
  capt: string;
  action: () => void;
}

export type NotificationStore = { [key: string]: NotificationData };
