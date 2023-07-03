<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import {
    actionCenterOpened,
    toggleActionCenter,
  } from "../../../../ts/desktop/actioncenter/main";
  import { trayIcons } from "../../../../ts/desktop/tray/main";
  import { committingUserData } from "../../../../ts/userlogic/main";
  import upload from "../../../../assets/upload.svg";

  export let hasClock = true;

  let time = "";

  onMount(() => {
    setInterval(() => {
      time = dayjs().format("HH:mm");
    });
  });
</script>

<div class="tray">
  {#each $trayIcons as icon}
    <button class="icon" on:click={() => icon.onOpen(icon)}>
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
    <div class="clock">{time}</div>
  {/if}
  <button
    class="material-icons-round ac-open"
    on:click={toggleActionCenter}
    class:opened={$actionCenterOpened}
  >
    notifications
  </button>
  <slot />
</div>
