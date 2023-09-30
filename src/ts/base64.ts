import { Log } from "./console";
import { LogLevel } from "./console/interface";

export function toBase64(input: string) {
  try {
    return btoa(input);
  } catch {
    Log(
      `ts/base64.ts: toBase64`,
      `Couldn't convert ${input.length} bytes to Base64.`,
      LogLevel.error
    );
    return input;
  }
}

export function fromBase64(input: string) {
  try {
    return atob(input);
  } catch {
    Log(
      `ts/base64.ts: toBase64`,
      `Couldn't convert ${input.length} bytes to string.`,
      LogLevel.error
    );
    return input;
  }
}
