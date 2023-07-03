<script lang="ts">
  import "../../../../css/desktop/apps/settings/account.css";
  import type { Process } from "../../../../ts/applogic/interface";
  import DangerZone from "./Account/DangerZone.svelte";
  import Profile from "./Account/Profile.svelte";

  export let process: Process;
</script>

<div class="settingspage-account">
  <Profile {process} />
  <DangerZone {process} />
</div>
