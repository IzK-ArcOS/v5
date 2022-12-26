<script lang="ts">
  import {
    currentSettingsPage,
    setSettingsPage,
    SettingsPages,
  } from "../../../ts/applogic/apps/SettingsApp/main";
</script>

<div class="sidebar">
  {#each SettingsPages as page}
    <button
      class="page"
      class:selected={$currentSettingsPage &&
        page.name == $currentSettingsPage.name}
      on:click={() => setSettingsPage(page)}
      disabled={page.disabled}
    >
      <img src={page.icon} alt={page.name} class="icon" />
      <span class="caption">{page.name}</span>
    </button>
    {#if page.sep}<hr />{/if}
  {/each}
</div>
