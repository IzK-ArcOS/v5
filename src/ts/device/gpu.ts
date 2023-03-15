// Parsed from v3.windows93.xyz, all rights belong to their respective owners.
// Code cleanup and Typescript conversion by IzKuipers <izaak.kuipers@gmail.com>

import type { GPU } from "./interface";

const GPU_VENDOR_REGEX = /(intel|nvidia|sis|amd|apple|powervr)\W? (.+)/i;
const GPU_RENDERER_REGEX = /(((?:radeon|adreno|geforce|mali).+))/i;
const GPU_CLEANUP_REGEX = / ?(\(.+?\)| direct3d.+| opengl.+|\/.+$| gpu$)/gi;

export function getGPU(): GPU {
  const gpu: GPU = {
    supported: "WebGLRenderingContext" in globalThis,
    active: false,
    vendor: undefined,
    model: undefined,
  };

  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const gl: any =
    canvas.getContext("webgl2") ||
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl");

  if (!gl) return gpu;

  gpu.active = true;

  const info = gl.getExtension("WEBGL_debug_renderer_info");

  gpu.vendor = gl.getParameter(info.UNMASKED_VENDOR_WEBGL);

  const renderer = gl.getParameter(info.UNMASKED_RENDERER_WEBGL) ?? "";
  const vendorMathes = renderer.match(GPU_VENDOR_REGEX);
  const modelMathes = renderer.match(GPU_RENDERER_REGEX);

  if (vendorMathes) gpu.vendor = vendorMathes[1];

  gpu.model = modelMathes ? modelMathes[1] : renderer;
  gpu.model = gpu.model.replace(GPU_CLEANUP_REGEX, "");

  return gpu;
}
