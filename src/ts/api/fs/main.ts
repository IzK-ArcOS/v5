export function getParentDirectory(p: string) {
  const split = p.split("/");

  if (p == "./") return p;
  if (!split.length) return p;

  if (split.length == 1) return "./";

  split.splice(-1);

  const newPath = split.join("/");

  return newPath;
}
