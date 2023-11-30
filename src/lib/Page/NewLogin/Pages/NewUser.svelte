<script lang="ts">
  import { writable } from "svelte/store";
  import type { Login } from "../../../../ts/newlogin/main";
  import UserHeader from "../UserHeader.svelte";
  import WelcomeSpinner from "../WelcomeSpinner.svelte";
  import Actions from "./NewUser/Actions.svelte";
  import Confirm from "./NewUser/Confirm.svelte";
  import Incorrect from "./NewUser/Incorrect.svelte";
  import UserPassword from "./NewUser/UserPassword.svelte";

  export let runtime: Login;

  let loading = false;
  let errored = false;
  let username = writable("");
  let password = "";

  //username.subscribe((v) => v && runtime.setUser(v));
</script>

<div class="login-loading">
  <UserHeader {runtime} />
  {#if !loading}
    {#if !errored}
      <UserPassword {loading} bind:username={$username} bind:password />
      <Confirm
        username={$username}
        {password}
        bind:loading
        bind:errored
        {runtime}
      />
      <Actions {runtime} />
    {:else}
      <Incorrect bind:errored />
    {/if}
  {:else}
    <WelcomeSpinner />
  {/if}
</div>
