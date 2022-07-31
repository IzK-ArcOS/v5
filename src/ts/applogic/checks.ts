import { get } from "svelte/store";
import { OpenApps, WindowStore } from "./store";

export function isLoaded(id: string): boolean {
    const ws = get(WindowStore);
    
    for (let i = 0; i < ws.length; i++) {
        if (ws[i].id == id) return true;
    }
    
    return false;
}

export function isOpened(id: string): boolean {
    const oa = get(OpenApps);
    
    for (let i = 0; i < oa.length; i++) {
        if (oa[i].id == id) return true;
    }
    
    return false;
}