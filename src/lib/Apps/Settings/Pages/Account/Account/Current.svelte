<script lang="ts">
  import {
    UserData,
    UserName,
  } from "../../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../../ts/userlogic/pfp";

  let pfp: string = "";

  UserData.subscribe((v) => {
    pfp = getProfilePicture(parseInt(v.acc.profilePicture as string));
  });
</script>

<div class="currentpfp">
  <div class="center">
    <img src={pfp} alt={$UserName} />
    <p class="uname">{$UserName}</p>
  </div>
</div>
