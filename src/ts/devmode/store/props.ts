import { writable } from "svelte/store";
import type { DevModeProps, WritableDevModeProps } from "../interface";

export const dmProps: WritableDevModeProps = writable<DevModeProps>([]);
