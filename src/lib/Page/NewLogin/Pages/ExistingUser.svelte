<script lang="ts">
  import { get } from "svelte/store";
  import type { Login } from "../../../../ts/newlogin/main";
  import UserHeader from "../UserHeader.svelte";
  import WelcomeSpinner from "../WelcomeSpinner.svelte";
  import Incorrect from "./ExistingUser/Incorrect.svelte";
  import Actions from "./ExistingUser/Actions.svelte";

  export let runtime: Login;

  let loading = false;
  let errored = false;
  let password = "";

  async function login() {
    loading = true;

    const username = get(runtime.UserName);
    const userdata = await runtime.Authenticate(username, password);

    if (!userdata) {
      loading = false;
      errored = true;

      return;
    }

    await runtime.proceed(userdata, username);
  }

  function keydown(e: KeyboardEvent) {
    if (e.key == "Enter") login();
  }
</script>

<div class="login-loading">
  <UserHeader {runtime} />
  {#if !loading}
    {#if !errored}
      <div class="password-wrapper">
        <input
          type="password"
          bind:value={password}
          disabled={loading}
          on:keydown={keydown}
        />
        <button
          class="material-icons-round continue"
          on:click={login}
          disabled={!password}
        >
          arrow_forward_ios
        </button>
      </div>
      <Actions {runtime} />
    {:else}
      <Incorrect bind:errored />
    {/if}
  {:else}
    <WelcomeSpinner />
  {/if}
</div>
