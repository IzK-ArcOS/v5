<script lang="ts">
  import "../../../../css/desktop/apps/settings/account.css";
  import { showOverlay } from "../../../../ts/window/overlay";
  import Section from "../Section.svelte";
  import DangerZone from "./Account/DangerZone.svelte";
  import Profile from "./Account/Profile.svelte";

  function openExplorer() {
    showOverlay("udataExplorer", "SettingsApp");
  }
</script>

<div class="settingspage-account">
  <Profile />
  <Section header="User Data">
    <p class="context">
      Click the button below to open the User Data Explorer to take a<br />
      look at your user data.
    </p>
    <button on:click={openExplorer}>Explore...</button>
  </Section>
  <hr />

  <DangerZone />
</div>
