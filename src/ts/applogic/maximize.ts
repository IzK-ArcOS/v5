import type { App } from "./interface";

export function canMaximize(app: App): boolean {
  const { clientWidth, clientHeight } = document.body;

  return clientWidth > app.minSize.w && clientHeight > app.minSize.h;
}
