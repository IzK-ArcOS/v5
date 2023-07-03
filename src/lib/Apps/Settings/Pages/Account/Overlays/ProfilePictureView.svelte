<script lang="ts">
  import { getServer } from "../../../../../../ts/api/server";
  import type { App, Process } from "../../../../../../ts/applogic/interface";
  import {
    UserData,
    UserName,
  } from "../../../../../../ts/userlogic/interfaces";
  import CloseButton from "../../../../../Page/Desktop/WindowStore/OverlayableWindow/CloseButton.svelte";
  import ProfilePicture from "../../../../../ProfilePicture.svelte";

  export let id: string;
  export let parent: Process;
</script>

<CloseButton {id} {parent} />
<div class="center-flex text-center">
  <div class="flex-stop">
    <ProfilePicture
      src={$UserData.acc.profilePicture.toString()}
      height={150}
    />
    <h1>{$UserName}</h1>
    <p class="hostname">
      {getServer() || location.hostname}
    </p>
  </div>
</div>

<style scoped>
  h1 {
    margin-top: 15px !important;
  }

  p.hostname {
    opacity: 0.5;
  }
</style>
