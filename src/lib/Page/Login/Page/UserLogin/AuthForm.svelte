<script lang="ts">
  import { applyLoginState, loginUsername } from "../../../../../ts/login/main";
  import ProfilePicture from "../../../../ProfilePicture.svelte";
  import Loading from "../Content/Loading.svelte";
  import Input from "./AuthForm/Input.svelte";

  let stay = true;
  export let authenticating = false;
  let pfp: string;
  let wrongpswd = false;

  async function cancel() {
    if (wrongpswd) return (wrongpswd = false);
    loginUsername.set(undefined);

    applyLoginState("selector");
  }
</script>

{#if !authenticating}
  <ProfilePicture src={pfp} height={151} />
  <h1>{$loginUsername}</h1>
{/if}

<div class="cloudlogin">
  {#if !wrongpswd}
    <div class="field" class:hidden={authenticating}>
      <Input bind:authenticating bind:pfp bind:wrongpswd />
    </div>
  {:else}
    <p class="error">The password is incorrect. Try again.</p>
  {/if}

  {#if !authenticating}<!-- 
    <Stay bind:stay /> -->
    <button class="switchuser" on:click={cancel} type="button">
      {wrongpswd ? "Okay" : "Cancel"}
    </button>
  {:else}
    <Loading caption="Welcome" />
  {/if}
</div>
