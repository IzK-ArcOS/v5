<script lang="ts">
  import { openWindow } from "../../../../ts/applogic/events";
  import { startOpened } from "../../../../ts/desktop/main";
  import { showArcFind } from "../../../../ts/search/main";
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
    startOpened.set(false);
  }

  function search() {
    showArcFind.set(true);
    startOpened.set(false);
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
    <button
      class="material-icons-round"
      on:click={search}
      title="Search (Alt+Shift+S)">search</button
    >
    <button class="material-icons-round" on:click={settings}>settings</button>
    <div class="sep" />
    <button class="material-icons-round" on:click={exit}>
      power_settings_new
    </button>
  </div>
</div>
