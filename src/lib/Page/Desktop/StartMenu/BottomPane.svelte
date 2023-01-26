<script lang="ts">
  import { openWindow } from "../../../../ts/applogic/events";
  import { startOpened } from "../../../../ts/desktop/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";
  import ProfilePicture from "../../../ProfilePicture.svelte";

  let pfp: string;

  function exit() {
    openWindow("Exit");
    startOpened.set(false);
  }

  function settings() {
    openWindow("SettingsApp");
  }

  UserData.subscribe(() => {
    pfp = getProfilePicture($UserData.acc.profilePicture);
  });
</script>

<div class="bottom">
  <h1 class="username">
    <ProfilePicture src={pfp} height={21} />
    {$UserName}
  </h1>
  <div class="options">
    <button class="material-icons-round" on:click={settings}>settings</button>
    <button class="material-icons-round" on:click={exit}>logout</button>
  </div>
</div>
