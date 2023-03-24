<script lang="ts">
  import { applyLoginState, loginUsername } from "../../../../../ts/login/main";
  import ProfilePicture from "../../../../ProfilePicture.svelte";
  import Loading from "../Content/Loading.svelte";
  import Input from "./AuthForm/Input.svelte";
  import Stay from "./AuthForm/Stay.svelte";

  let stay = true;
  export let authenticating = false;
  let pfp: string;

  async function cancel() {
    loginUsername.set(undefined);

    applyLoginState("selector");
  }
</script>

{#if !authenticating}
  <ProfilePicture src={pfp} height={151} />
  <h1>{$loginUsername}</h1>
{/if}

<div class="cloudlogin">
  <div class="field" class:hidden={authenticating}>
    <Input bind:stay bind:authenticating bind:pfp />
  </div>

  {#if !authenticating}
    <Stay bind:stay />
    <button class="switchuser" on:click={cancel}>Cancel</button>
  {:else}
    <Loading caption="Welcome" />
  {/if}
</div>
