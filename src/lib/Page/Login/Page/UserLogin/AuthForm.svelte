<script lang="ts">
  import { loginUsername } from "../../../../../ts/login/main";
  import ProfilePicture from "../../../../ProfilePicture.svelte";
  import Loading from "../Content/Loading.svelte";
  import Input from "./AuthForm/Input.svelte";
  import Stay from "./AuthForm/Stay.svelte";

  let stay = false;
  export let authenticating = false;
  let pfp: string;
</script>

{#if !authenticating}
  <ProfilePicture src={pfp} height={151} />
  <h1>{$loginUsername}</h1>
{/if}

<div class="cloudlogin">
  {#if !authenticating}
    <div class="field">
      <Input bind:stay bind:authenticating bind:pfp />
    </div>
    <Stay bind:stay />
  {:else}
    <Loading caption="Welcome" />
  {/if}
</div>
