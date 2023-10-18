<script lang="ts">
  import { writable } from "svelte/store";
  import type { Login } from "../../../../ts/newlogin/main";
  import UserHeader from "../UserHeader.svelte";
  import WelcomeSpinner from "../WelcomeSpinner.svelte";
  import { createUser } from "../../../../ts/userlogic/mutate";

  export let runtime: Login;

  let loading = false;
  let errored = false;

  let username = writable("");
  let password = "";
  let confirm = "";

  async function createAccount() {
    loading = true;

    const userdata = await createUser($username, password);

    if (!userdata) {
      errored = true;
      loading = false;

      return false;
    }

    runtime.proceed(userdata, $username);

    return false;
  }

  function keydown(e: KeyboardEvent) {
    if (e.key == "Enter") createAccount();
  }

  function existing() {
    runtime.navigate("existinguserauth");
  }

  username.subscribe((v) => v && runtime.setUser(v));
</script>

<div class="login-loading">
  <UserHeader {runtime} />
  {#if !loading}
    {#if !errored}
      <input
        type="text"
        placeholder="Username"
        class="field"
        bind:value={$username}
      />
      <input
        type="password"
        placeholder="Password"
        class="field"
        bind:value={password}
        disabled={loading}
      />
      <div class="password-wrapper">
        <input
          type="password"
          placeholder="Confirm Password"
          bind:value={confirm}
          disabled={loading}
          on:keydown={keydown}
        />
        <button
          class="material-icons-round continue"
          on:click={createAccount}
          disabled={loading ||
            !username ||
            !password ||
            !confirm ||
            password !== confirm}
        >
          arrow_forward_ios
        </button>
      </div>
      <button class="normal link createaccount" on:click={existing}
        >I have an account</button
      >
    {:else}
      <p class="incorrect">The user already exists.</p>
      <button class="normal switchuser" on:click={() => (errored = false)}>
        Okay
      </button>
    {/if}
  {:else}
    <WelcomeSpinner />
  {/if}
</div>
