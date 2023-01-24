<script lang="ts">
  import { DevModeOverride } from "../../../../ts/devmode/props";

  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";
  import ProfilePicture from "../../../ProfilePicture.svelte";

  let pfp = "";

  UserData.subscribe(() => {
    pfp = getProfilePicture($UserData.acc.profilePicture);
  });
</script>

<div class="userprofile">
  <ProfilePicture src={pfp} height={36} />
  <div class="username">
    <p class="name">
      {$UserName}
      {#if $DevModeOverride}
        <span class="material-icons developer">bug_report</span>
      {/if}
    </p>
    <p class="hostname">
      {localStorage.getItem("arcos-server") || location.hostname}
    </p>
  </div>
</div>
