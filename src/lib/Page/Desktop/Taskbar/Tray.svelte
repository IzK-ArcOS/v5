<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import upload from "../../../../assets/upload.svg";
  import {
    ActionCenterOpened,
    toggleActionCenter,
  } from "../../../../ts/desktop/actioncenter/main";
  import { trayIcons } from "../../../../ts/desktop/tray/main";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { committingUserData } from "../../../../ts/userlogic/main";

  export let hasClock = true;

  let time = "";

  onMount(() => {
    setInterval(() => {
      const tb = $UserData.sh.taskbar;
      const secs = tb.clockSecs && !tb.pos ? ":ss" : "";
      const date = tb.clockDate && !tb.pos ? "MMM D, " : "";

      time = dayjs().format(`${date}HH:mm${secs}`);
    }, 500);
  });
</script>

<div class="tray">
  {#each $trayIcons as icon}
    <button
      class="icon"
      on:click={() => icon.onOpen(icon)}
      title={icon.title || ""}
    >
      {#if icon.icon}
        <span class="material-icons-round">{icon.icon}</span>
      {:else}
        <img src={icon.image} alt={icon.identifier} />
      {/if}
    </button>
  {/each}
  <button class="icon committer" class:inactive={!$committingUserData}>
    <img src={upload} alt="Committing" />
  </button>
  {#if hasClock}
    <div class="clock" data-contextmenu="clockcontext">{time}</div>
  {/if}
  <button
    class="material-icons-round ac-open"
    on:click={toggleActionCenter}
    class:opened={$ActionCenterOpened}
  >
    notifications
  </button>
  <slot />
</div>
