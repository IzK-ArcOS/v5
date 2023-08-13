export function arrayToText(buffer: ArrayBuffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

export function textToBlob(text: string, type = "text/plain"): Blob {
  return new Blob([text], { type });
}

export function arrayToBlob(buffer: ArrayBuffer, type = "text/plain"): Blob {
  return new Blob([new Uint8Array(buffer)], {
    type,
  });
}
