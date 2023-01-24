<script lang="ts">
  import { DevModeOverride } from "../../../../../ts/devmode/props";
  import { UserData, UserName } from "../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../ts/userlogic/pfp";

  let pfp = "";

  UserData.subscribe((v) => {
    pfp = getProfilePicture(parseInt(v.acc.profilePicture as string));
  });
</script>

<div class="info">
  <div>
    <img src={pfp} alt={$UserName} />
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
