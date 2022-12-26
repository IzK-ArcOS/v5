<script lang="ts">
  import { onMount } from "svelte";
  import { applyLoginState, loginUsername } from "../../../ts/login/main";
  import type { UserData } from "../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../ts/userlogic/pfp";

  let pfp = "";

  export let data: UserData;
  export let name: string;

  function go() {
    loginUsername.set(name);
    applyLoginState("todesktop");
  }

  onMount(() => {
    pfp = getProfilePicture(parseInt(data.acc.profilePicture as string));
  });
</script>

{#if data.acc.enabled}
  <button class="user" on:click={go}>
    <img alt="user" src={pfp} />
    <p class="username">{name}</p>
  </button>
{/if}
