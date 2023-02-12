<script lang="ts">
  import { onMount } from "svelte";
  import defaultProfile from "../../../../../../assets/pfp/null.png";
  import { getUserPfp } from "../../../../../../ts/api/pfp";
  import type { UserData } from "../../../../../../ts/userlogic/interfaces";
  import ProfilePicture from "../../../../../ProfilePicture.svelte";

  export let selecting: boolean;
  export let target: string;
  export let entry: [string, UserData];
  export let pfp: string;

  let profile: string;

  onMount(async () => {
    profile = await getUserPfp(entry[0]);
  });

  function select() {
    selecting = false;
    target = entry[0];
    pfp = profile;
  }
</script>

<button class="user" on:click={select}>
  <ProfilePicture src={profile || defaultProfile} height={24} />
  <p>{entry[0] || "<unknown>"}</p>
</button>
