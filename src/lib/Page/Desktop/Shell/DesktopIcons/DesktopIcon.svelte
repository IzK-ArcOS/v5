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
  import { isIconSpotAvailable } from "../../../../../ts/desktop/icons";

  export let app: App;

  let position = { x: 0, y: 0 };
  let previousPosition = { x: 0, y: 0 };

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
    const { offsetX, offsetY } = e.detail;
    const available = isIconSpotAvailable(offsetX, offsetY);

    if (!available) {
      position = previousPosition;

      return;
    }

    setAppPreference("ArcShell", `icon$${app.id}`, {
      x: offsetX,
      y: offsetY,
    });
  }

  function startDrag(e: CustomEvent<DragEventData>) {
    previousPosition = { x: e.detail.offsetX, y: e.detail.offsetY };
  }
</script>

<button
  class="desktopIcon"
  data-contextmenu="desktopicon-app"
  data-id={app.id}
  on:dblclick={open}
  use:draggable={{
    grid: $UserData.sh.desktop.noIconGrid ? null : [40, 42.5],
    bounds: $UserData.sh.desktop.noIconGrid
      ? { bottom: 80, left: 10, right: 10, top: 10 }
      : { bottom: 110, left: 0, right: 80, top: 0 },
    position,
    disabled: $UserData.sh.desktop.lockIcons,
  }}
  on:neodrag:start={startDrag}
  on:neodrag:end={endDrag}
>
  <img
    draggable={false}
    src={getOriginalIcon(app.id) || app.info.icon}
    alt={app.info.name}
  />
  <p class="name">{app.info.name}</p>
</button>
