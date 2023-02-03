<script lang="ts">
  import type { SettingsPage } from "../../../../ts/applogic/apps/SettingsApp/interface";
  import {
    currentSettingsPage,
    setSettingsPage,
  } from "../../../../ts/applogic/apps/SettingsApp/main";

  export let page: SettingsPage;
</script>

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
