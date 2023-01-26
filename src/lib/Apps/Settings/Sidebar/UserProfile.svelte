<script lang="ts">
  import { DevModeOverride } from "../../../../ts/devmode/props";

  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";
  import { showOverlay } from "../../../../ts/window/overlay";
  import ProfilePicture from "../../../ProfilePicture.svelte";

  let pfp = "";

  UserData.subscribe(() => {
    pfp = getProfilePicture($UserData.acc.profilePicture);
  });

  function showPfp() {
    if (typeof $UserData.acc.profilePicture == "string")
      showOverlay("largePfp", "SettingsApp");
  }
</script>

<div class="userprofile">
  <span on:click={showPfp}><ProfilePicture src={pfp} height={36} /></span>
  <div class="username">
    <p class="name">
      {$UserName}
      {#if $DevModeOverride}
        <span class="material-icons-round developer">bug_report</span>
      {/if}
    </p>
    <p class="hostname">
      {localStorage.getItem("arcos-server") || location.hostname}
    </p>
  </div>
</div>
