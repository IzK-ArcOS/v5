<script lang="ts">
  import "../../css/desktop/apps/ProfilePicture.css";
  import { onMount } from "svelte";
  import { UserData } from "../../ts/userlogic/interfaces";
  import { ProfilePictures } from "../../ts/userlogic/pfp";
  import { closeWindow } from "../../ts/applogic/events";

  let pfps: string[] = [];

  onMount(() => {
    pfps = Object.values(ProfilePictures);
  });

  function ch(i: number | null) {
    $UserData.acc.profilePicture = i;
    closeWindow("PfpSelector");
  }
</script>

{#each pfps as pfp, i}
  <button on:click={() => ch(i + 1)}>
    <img src={pfp} alt={`${i + 1}`} />
  </button>
{/each}
