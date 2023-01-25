<script lang="ts">
  import "../../../../css/desktop/apps/settings/account.css";
  import { ConnectedServer } from "../../../../ts/api/main";
  import Section from "../Section.svelte";
  import DangerZone from "./Account/DangerZone.svelte";
  import Profile from "./Account/Profile.svelte";
  import StorageBar from "./Account/StorageBar.svelte";
</script>

<div class="settingspage-account">
  <Profile />
  <DangerZone />

  <!-- <Section header="LocalStorage usage">
    <p class="context">
      {#if !$ConnectedServer}
        Because you're running ArcOS locally, you can only store as<br />
        much data as the LocalStorage API allows. Connect to an ArcAPI<br />
        in order to be able to store more data.
        <br />
        <br />
        Storage usage:
      {/if}
    </p>
    <StorageBar />
  </Section> -->
</div>
