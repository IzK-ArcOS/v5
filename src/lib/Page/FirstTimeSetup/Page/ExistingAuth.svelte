<script lang="ts">
  import { onMount } from "svelte";
  import { generateCredToken } from "../../../../ts/api/cred";
  import { loginUsingCreds } from "../../../../ts/api/getter";
  import { applyFTSState } from "../../../../ts/fts/main";
  import { getUsers } from "../../../../ts/userlogic/main";
  import Spinner from "../../../Spinner.svelte";
  import { Busy } from "../../../../ts/env/main";
  import { AccountIcon } from "../../../../ts/icon/main";

  let username = "";
  let password = "";
  let error = false;
  let working = false;
  let loading = true;

  onMount(async () => {
    loading = true;
    Busy.set(true);

    const users = await getUsers();

    if (!Object.entries(users).length) applyFTSState("finish");

    loading = false;
    Busy.set(false);
  });

  async function login() {
    working = true;
    Busy.set(true);
    const token = generateCredToken({ username, password });
    const req = await loginUsingCreds(token);

    if (!req) {
      error = true;
      working = false;
      Busy.set(false);

      setTimeout(() => {
        error = false;
      }, 1000);

      return;
    }

    localStorage.setItem("arcos-remembered-token", token);
    applyFTSState("finish");
    working = false;
    Busy.set(false);
  }
</script>

{#if !loading}
  <div class="header centered">
    <img src={AccountIcon} alt="Login" />
    <h1>Who are you?</h1>
    <p class="subtitle">Let's get you logged in</p>
  </div>

  <input
    type="text"
    class="fullwidth centered"
    class:error
    placeholder="Username"
    bind:value={username}
  />
  <div class="input-wrap">
    <input
      type="password"
      class="fullwidth centered"
      class:error
      placeholder="Password"
      bind:value={password}
    />
    <button
      class="login material-icons-round"
      disabled={!username || !password || working}
      on:click={login}
    >
      {#if working}
        <Spinner height={16} />
      {:else}
        arrow_forward_ios
      {/if}
    </button>
  </div>
{/if}

<style scoped>
  button.login {
    width: 36px;
    height: 36px;
    border-radius: 50% !important;
    padding: 0 !important;
    font-size: 18px;
  }

  div.input-wrap {
    display: flex;
    margin: 5px auto;
    width: 65%;
  }

  div.input-wrap input {
    margin: 0;
    min-width: 100%;
  }

  input.error {
    border-bottom: var(--clr-red-fg) 2px solid !important;
  }

  div.input-wrap button {
    min-width: 36px;
    margin-left: 10px;
  }
</style>
