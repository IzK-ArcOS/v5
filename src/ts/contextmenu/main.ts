export function composePosition(
  e: MouseEvent,
  mW: number,
  mH: number
): [number, number] {
  const desktop = document.querySelectorAll(
    "div.app > div.desktop"
  )[0] as HTMLDivElement;

  if (!desktop) return;

  const dW = desktop.offsetWidth;
  const dH = desktop.offsetHeight;

  let x = e.clientX;
  let y = e.clientY;

  if (x + mW > dW) x = dW - mW;
  if (y + mH > dH) y = dH - mH;
  if (x < 0) x = 0;
  if (y < 0) y = 0;

  return [x, y];
}
