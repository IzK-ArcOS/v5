<script lang="ts">
  import { onMount } from "svelte";
  import type { App } from "../../../../../../ts/applogic/interface";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";
  import { ProfilePictures } from "../../../../../../ts/userlogic/pfp";
  import {
    hideOverlay,
    showOverlay,
  } from "../../../../../../ts/window/overlay";
  import "../../../../../../css/desktop/apps/settings/account/changePfp.css";

  let pfps: string[] = [];
  export let id: string;
  export let app: App;

  onMount(() => {
    pfps = Object.values(ProfilePictures);
  });

  function ch(i: number | null) {
    $UserData.acc.profilePicture = i;

    hide();
  }

  function hide() {
    hideOverlay(id, app.id);
  }

  function custom() {
    showOverlay("customPfp", "SettingsApp");
  }
</script>

<div class="overlay-head">
  <h2 class="header">Change Profile Picture</h2>
  <p class="subheader">Choose one of the following profile pictures:</p>
</div>

<div class="wrapper">
  {#each pfps as pfp, i}
    <button
      on:click={() => ch(i + 1)}
      class:selected={i + 1 == $UserData.acc.profilePicture}
    >
      <img src={pfp} alt={`${i + 1}`} />
    </button>
  {/each}
</div>

<div class="cancel-wrapper">
  <div class="inner">
    <button on:click={custom}>Custom...</button>
    <button class="suggested" on:click={hide}> Close </button>
  </div>
</div>
