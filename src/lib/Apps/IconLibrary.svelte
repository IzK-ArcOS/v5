<script lang="ts">
  import "../../css/desktop/apps/iconlibrary.css";
  import { onMount } from "svelte";
  import { ICON_GROUP_CAPTIONS, getGroupedIcons } from "../../ts/icon/main";

  let groups: { [key: string]: { [key: string]: string } };

  onMount(() => {
    groups = getGroupedIcons();
  });
</script>

{#if groups}
  {#each Object.entries(groups) as [id, items]}
    <div class="group group-{id}">
      <h2 class="header">{ICON_GROUP_CAPTIONS[id] || id}</h2>
      <div class="icons">
        {#each Object.entries(items) as [icon, url]}
          <img src={url} title={icon} alt={icon} class="icon" />
        {/each}
      </div>
    </div>
  {/each}
{/if}
