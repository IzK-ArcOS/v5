<script lang="ts">
  import { trayIcons } from "../../../../../ts/desktop/tray/main";
</script>

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
