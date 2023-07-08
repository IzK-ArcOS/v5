<script lang="ts">
  import { getServer } from "../../../../ts/api/server";

  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";
  import { showOverlay } from "../../../../ts/window/overlay";
  import ApiReveal from "../../../APIReveal.svelte";
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
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span on:click={showPfp}><ProfilePicture src={pfp} height={36} /></span>
  <div class="username">
    <p class="name">
      {$UserName}
    </p>
    <p class="hostname">
      <ApiReveal />
    </p>
  </div>
</div>
