<script lang="ts">
  import { DevModeOverride } from "../../../../ts/devmode/props";

  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";

  let pfp = "";

  UserData.subscribe(() => {
    pfp = getProfilePicture(parseInt($UserData.acc.profilePicture as string));
  });
</script>

<div class="userprofile">
  <img src={pfp} alt={$UserName} class="pfp" />
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
