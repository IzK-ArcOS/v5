<script lang="ts">
  import { SettingsPages } from "$$ts/applogic/apps/SettingsApp/store";
  import Page from "./Sidebar/Page.svelte";
  import UserProfile from "./Sidebar/UserProfile.svelte";
</script>

<div class="sidebar">
  <div class="pages">
    {#each SettingsPages as page}
      <Page {page} />
    {/each}
  </div>
  <UserProfile />
</div>
