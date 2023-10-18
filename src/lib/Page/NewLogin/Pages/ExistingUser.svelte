<script lang="ts">
  import { get } from "svelte/store";
  import type { Login } from "../../../../ts/newlogin/main";
  import UserHeader from "../UserHeader.svelte";
  import WelcomeSpinner from "../WelcomeSpinner.svelte";

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

  function register() {
    runtime.navigate("newuserauth");
  }
</script>

<div class="login-loading">
  <UserHeader {runtime} />
  {#if !loading}
    {#if !errored}
      <div class="password-wrapper">
        <input type="password" bind:value={password} disabled={loading} />
        <button class="material-icons-round continue" on:click={login}>
          arrow_forward_ios
        </button>
      </div>
      <button class="normal switchuser">Switch User</button>
      <button class="normal link createaccount" on:click={register}
        >I have no account</button
      >
    {:else}
      <p class="incorrect">The password is incorrect. Try again.</p>
      <button class="normal switchuser" on:click={() => (errored = false)}
        >Okay</button
      >
    {/if}
  {:else}
    <WelcomeSpinner />
  {/if}
</div>
