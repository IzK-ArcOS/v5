<script lang="ts">
  import { trayIcons } from "../../../../ts/desktop/tray/main";
</script>

<div class="tray">
  {#each $trayIcons as icon}
    {#if icon.icon}
      <span class="material-icons">{icon.icon}</span>
    {:else}
      <img src={icon.image} alt={icon.identifier} />
    {/if}
  {/each}
</div>
