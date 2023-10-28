export function tryParse(content: string): any | false {
  try {
    return JSON.parse(content);
  } catch {
    return false;
  }
}

export function tryJsonConvert<T>(content: string): T | string {
  try {
    return JSON.parse(content) as T;
  } catch {
    return content;
  }
}
