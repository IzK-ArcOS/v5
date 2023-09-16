<script lang="ts">
  import { openWindow } from "../../../../../ts/applogic/events";
  import { getOriginalIcon } from "../../../../../ts/applogic/icon";
  import type { App } from "../../../../../ts/applogic/interface";
  import { DragEventData, draggable } from "@neodrag/svelte";
  import {
    getAppPreference,
    setAppPreference,
  } from "../../../../../ts/applogic/pref";
  import { onMount } from "svelte";
  import { UserData } from "../../../../../ts/userlogic/interfaces";

  export let app: App;

  let position = { x: 0, y: 0 };

  function open() {
    openWindow(app.id);
  }

  function updatePos() {
    const pos = getAppPreference("ArcShell", `icon$${app.id}`) as {
      x: number;
      y: number;
    };

    position = pos || { x: 0, y: 0 };
  }

  onMount(updatePos);
  UserData.subscribe(updatePos);

  function endDrag(e: CustomEvent<DragEventData>) {
    setAppPreference("ArcShell", `icon$${app.id}`, {
      x: e.detail.offsetX,
      y: e.detail.offsetY,
    });
  }
</script>

<button
  class="desktopIcon"
  on:dblclick={open}
  use:draggable={{
    grid: $UserData.sh.desktop.noIconGrid ? null : [40, 42.5],
    bounds: $UserData.sh.desktop.noIconGrid
      ? { bottom: 80, left: 10, right: 10, top: 10 }
      : { bottom: 110, left: 0, right: 40, top: 0 },
    position,
  }}
  on:neodrag:end={endDrag}
>
  <img src={getOriginalIcon(app.id) || app.info.icon} alt={app.info.name} />
  <p class="name">{app.info.name}</p>
</button>
