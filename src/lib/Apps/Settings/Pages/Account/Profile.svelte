<script lang="ts">
  import { DevModeOverride } from "../../../../../ts/devmode/props";
  import { UserData, UserName } from "../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../ts/userlogic/pfp";
  import { showOverlay } from "../../../../../ts/window/overlay";

  let pfp = "";

  UserData.subscribe((v) => {
    pfp = getProfilePicture(parseInt(v.acc.profilePicture as string));
  });

  function changePfp() {
    showOverlay("pfpSel", "SettingsApp");
  }
</script>

<div class="info">
  <div>
    <img src={pfp} alt={$UserName} />
    <button class="change material-icons" on:click={changePfp}>edit</button>
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
