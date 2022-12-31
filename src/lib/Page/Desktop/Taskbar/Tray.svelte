<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import {
    ActionCenterOpened,
    toggleActionCenter,
  } from "../../../../ts/desktop/actioncenter/main";
  import { trayIcons } from "../../../../ts/desktop/tray/main";

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
        <span class="material-icons">{icon.icon}</span>
      {:else}
        <img src={icon.image} alt={icon.identifier} />
      {/if}
    </button>
  {/each}
  <div class="clock">{time}</div>
  <button
    class="material-icons ac-open"
    on:click={toggleActionCenter}
    class:opened={$ActionCenterOpened}
  >
    notifications
  </button>
</div>
