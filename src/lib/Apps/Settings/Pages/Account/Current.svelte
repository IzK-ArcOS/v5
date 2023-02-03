<script lang="ts">
  import { UserData, UserName } from "../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../ts/userlogic/pfp";
  import ProfilePicture from "../../../../ProfilePicture.svelte";

  let pfp: string = "";

  UserData.subscribe((v) => {
    pfp = getProfilePicture(v.acc.profilePicture);
  });
</script>

<div class="currentpfp">
  <div class="center">
    <ProfilePicture src={pfp} height={30} />
    <p class="uname">{$UserName}</p>
  </div>
</div>
