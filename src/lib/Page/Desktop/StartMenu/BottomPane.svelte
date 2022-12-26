<script lang="ts">
  import { openWindow } from "../../../../ts/applogic/events";
  import { startOpened } from "../../../../ts/desktop/main";
  import { UserName } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";

  let pfp: string;

  UserName.subscribe((v) => {
    const data = getUserdata(v);

    pfp = getProfilePicture(parseInt(data.acc.profilePicture as string));
  });

  function exit() {
    openWindow("exit");
    startOpened.set(false);
  }
</script>

<div class="bottom">
  <h1 class="username">
    <img class="pfp" alt={$UserName} src={pfp} />{$UserName}
  </h1>
  <div class="options">
    <button class="material-icons" on:click={exit}>logout</button>
  </div>
</div>
