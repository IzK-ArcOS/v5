export function getJsonHierarchy<T = any>(
  object: Object,
  hierarchy: string
): T | null {
  const parts = hierarchy.split(".");

  let currentObj = object;

  for (let i = 0; i < parts.length; i++) {
    if (!currentObj[parts[i]]) return null;

    currentObj = currentObj[parts[i]];
  }

  return currentObj as T;
}

export function setJsonHierarchy<T = any>(
  object: Object,
  hierarchy: string,
  value: T
): T {
  const parts = hierarchy.split(".");
  let currentObj = object;

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];

    if (currentObj[key] === undefined) {
      currentObj[key] = {};
    }

    currentObj = currentObj[key];
  }

  currentObj[parts[parts.length - 1]] = value;

  return getJsonHierarchy(object, hierarchy);
}
