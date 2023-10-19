<script lang="ts">
  import { onMount } from "svelte";
  import type { Login } from "../../../../../ts/newlogin/main";
  import type { UserData } from "../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../ts/userlogic/pfp";
  import ProfilePicture from "../../../../ProfilePicture.svelte";

  let pfp = "";

  export let runtime: Login;
  export let data: UserData;
  export let name: string;

  async function go() {
    runtime.setUser(name);
    runtime.navigate("existinguserauth");
  }

  onMount(() => {
    pfp = getProfilePicture(data.acc.profilePicture);
  });
</script>

{#if data.acc.enabled}
  <button class="user" on:click={go}>
    <ProfilePicture src={pfp} height={76} />
    <p class="username">{name}</p>
  </button>
{/if}
