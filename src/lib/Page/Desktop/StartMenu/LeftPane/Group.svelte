<script lang="ts">
  import { isPopulatable } from "../../../../../ts/applogic/checks";
  import type { CompiledAppGroup } from "../../../../../ts/applogic/groups/interface";
  import { getWindow } from "../../../../../ts/applogic/store";
  import { FolderIcon } from "../../../../../ts/icon/general";
  import AppListItem from "../AppListItem.svelte";

  export let group: CompiledAppGroup;

  let expand = false;

  const toggle = () => (expand = !expand);
</script>

{#if group}
  <div class="group" class:expand>
    <button class="expander" on:click={toggle}>
      <img src={FolderIcon} alt="" />
      <span class="capt">{group.name}</span>
    </button>
    <div class="apps">
      {#each group.apps as id}
        {#if isPopulatable(getWindow(id))}
          <AppListItem app={getWindow(id)} />
        {/if}
      {/each}
    </div>
  </div>
{/if}
