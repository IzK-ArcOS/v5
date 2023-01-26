<script lang="ts">
  import { DevModeOverride } from "../../../../../ts/devmode/props";
  import { UserData, UserName } from "../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../ts/userlogic/pfp";
  import { showOverlay } from "../../../../../ts/window/overlay";
  import ProfilePicture from "../../../../ProfilePicture.svelte";

  let pfp = "";

  UserData.subscribe((v) => {
    pfp = getProfilePicture(v.acc.profilePicture);
  });

  function changePfp() {
    showOverlay("pfpSel", "SettingsApp");
  }

  function viewPfp() {
    showOverlay("largePfp", "SettingsApp");
  }
</script>

<div class="info">
  <div>
    <span on:click={viewPfp}><ProfilePicture src={pfp} height={52} /></span>
    <button class="change material-icons-round" on:click={changePfp}
      >edit</button
    >
  </div>
  <div>
    <p class="username">
      {$UserName}
    </p>
    <p class="host">
      {localStorage.getItem("arcos-server") || location.hostname}
      {#if $DevModeOverride}
        (developer)
      {/if}
    </p>
  </div>
</div>
