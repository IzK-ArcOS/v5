<script lang="ts">
  import type {
    AppGroup,
    CompiledAppGroup,
  } from "../../../../../ts/applogic/groups/interface";
  import folderIcon from "../../../../../assets/apps/filemanager/folder.svg";
  import { getWindow } from "../../../../../ts/applogic/store";
  import AppListItem from "../AppListItem.svelte";
  import { isPopulatable } from "../../../../../ts/applogic/checks";

  export let group: CompiledAppGroup;

  let expand = false;

  const toggle = () => (expand = !expand);
</script>

{#if group}
  <div class="group" class:expand>
    <button class="expander" on:click={toggle}>
      <img src={folderIcon} alt="" />
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
