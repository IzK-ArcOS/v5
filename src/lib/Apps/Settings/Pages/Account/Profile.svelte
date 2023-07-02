<script lang="ts">
  import { getServer } from "../../../../../ts/api/server";
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
</script>

<div class="info">
  <div>
    <ProfilePicture src={pfp} height={52} />
    <button class="change material-icons-round" on:click={changePfp}
      >edit</button
    >
  </div>
  <div>
    <p class="username">
      {$UserName}
    </p>
    <p class="host" data-caller="accountpage-hostname">
      {getServer() || location.hostname}
    </p>
  </div>
</div>
