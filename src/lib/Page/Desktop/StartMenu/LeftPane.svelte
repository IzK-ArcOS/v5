<script lang="ts">
  import { WindowStore } from "../../../../ts/applogic/store";
  import AppListItem from "./AppListItem.svelte";
</script>

<div class="left">
  {#each Object.values($WindowStore) as window}
    <AppListItem app={window} />
  {/each}
</div>
