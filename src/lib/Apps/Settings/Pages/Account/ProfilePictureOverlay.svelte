<script lang="ts">
  import { onMount } from "svelte";
  import type { App } from "../../../../../ts/applogic/interface";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { ProfilePictures } from "../../../../../ts/userlogic/pfp";
  import { hideOverlay, showOverlay } from "../../../../../ts/window/overlay";

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
  <button on:click={custom}>Custom...</button>
  <button class="cancel" on:click={hide}> Cancel </button>
</div>

<style scoped>
  div.wrapper button img {
    height: 50px;
  }

  div.wrapper {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(6, 60px);
    grid-template-rows: repeat(5, 60px);
  }

  div.wrapper button {
    margin-bottom: 5px;
    padding: 0;
    overflow: hidden;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin: 5px;
    transition: filter 0.1s;
    background-color: transparent;
  }

  div.wrapper button:hover {
    filter: brightness(0.8);
  }

  div.wrapper button:active {
    filter: brightness(0.6);
  }

  div.wrapper button.selected {
    filter: brightness(1.2);
  }

  div.cancel-wrapper {
    display: flex;
    margin: 5px 2px;
  }

  button.cancel {
    margin-left: auto;
  }
</style>
