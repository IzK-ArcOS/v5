<script lang="ts">
  import { SettingsPages } from "../../../ts/applogic/apps/SettingsApp/store";
  import type { App } from "../../../ts/applogic/interface";
  import { ScopedAppData, UserData } from "../../../ts/userlogic/interfaces";
  import Page from "./Sidebar/Page.svelte";
  import UserProfile from "./Sidebar/UserProfile.svelte";

  export let appdata: ScopedAppData;
  export let app: App;

  function toggleCollapsed() {
    appdata.collapsed = !appdata.collapsed;

    $UserData.appdata[app.id] = appdata;
  }
</script>

<div class="sidebar" class:collapsed={appdata.collapsed}>
  <div class="pages">
    {#if appdata}
      <button
        class="page menu"
        class:active={appdata.collapsed}
        on:click={toggleCollapsed}
      >
        <span class="material-icons-round"> menu </span>
      </button>
    {/if}
    {#each SettingsPages as page}
      <Page {page} />
    {/each}
    </div>
  <UserProfile />
</div>
