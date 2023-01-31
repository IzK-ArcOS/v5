export function tryParse(content: string): any | false {
  try {
    return JSON.parse(content);
  } catch {
    return false;
  }
}
