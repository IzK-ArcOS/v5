<script lang="ts">
  import { getUserPfp } from "../../../../../ts/api/pfp";
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

  loginUsername.subscribe(async (v) => (pfp = await getUserPfp(v)));
</script>

{#if !authenticating}
  <ProfilePicture src={pfp} height={151} />
  <h1>{$loginUsername || "Login"}</h1>
  {#if !wrongpswd}
    <input
      type="text"
      class="block username"
      bind:value={$loginUsername}
      placeholder="Username"
    />
  {/if}
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
      {wrongpswd ? "Okay" : "Show Picker"}
    </button>
  {:else}
    <Loading caption="Welcome" />
  {/if}
</div>
