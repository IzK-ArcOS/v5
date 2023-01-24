<script lang="ts">
  import { openWindow } from "../../../../ts/applogic/events";
  import { startOpened } from "../../../../ts/desktop/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";

  let pfp: string;

  function exit() {
    openWindow("Exit");
    startOpened.set(false);
  }

  function settings() {
    openWindow("SettingsApp");
  }

  UserData.subscribe(() => {
    pfp = getProfilePicture(parseInt($UserData.acc.profilePicture as string));
  });
</script>

<div class="bottom">
  <h1 class="username">
    <img class="pfp" alt={$UserName} src={pfp} />{$UserName}
  </h1>
  <div class="options">
    <button class="material-icons" on:click={settings}>settings</button>
    <button class="material-icons" on:click={exit}>logout</button>
  </div>
</div>
