<script lang="ts">
  import "../../../../css/desktop/apps/settings/account.css";
  import { showOverlay } from "../../../../ts/window/overlay";
  import Section from "../Section.svelte";
  import DangerZone from "./Account/DangerZone.svelte";
  import Profile from "./Account/Profile.svelte";
</script>

<div class="settingspage-account">
  <Profile />
  <DangerZone />
</div>
