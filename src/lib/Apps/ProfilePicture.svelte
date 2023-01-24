<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/ProfilePicture.css";
  import { closeWindow } from "../../ts/applogic/events";
  import type { App } from "../../ts/applogic/interface";
  import { UserData } from "../../ts/userlogic/interfaces";
  import { ProfilePictures } from "../../ts/userlogic/pfp";
  import { hideOverlay } from "../../ts/window/overlay";

  let pfps: string[] = [];
  export let id: string;
  export let app: App;

  onMount(() => {
    pfps = Object.values(ProfilePictures);
  });

  function ch(i: number | null) {
    $UserData.acc.profilePicture = i;
    hideOverlay(id, app.id);
  }
</script>

<div class="wrapper">
  {#each pfps as pfp, i}
    <button on:click={() => ch(i + 1)}>
      <img src={pfp} alt={`${i + 1}`} />
    </button>
  {/each}
</div>

<style scoped>
  button img {
    height: 50px;
  }

  div.wrapper {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(6, 60px);
    grid-template-rows: repeat(5, 60px);
  }

  button {
    margin-bottom: 5px;
    padding: 0;
    overflow: hidden;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin: 5px;
  }
</style>
