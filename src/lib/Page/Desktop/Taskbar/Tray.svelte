<script lang="ts">
  import { trayIcons } from "../../../../ts/desktop/tray/main";
</script>

<div class="tray">
  {#each $trayIcons as icon}
    {icon.icon}
  {/each}
</div>
