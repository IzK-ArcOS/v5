<script lang="ts">
  import { onMount } from "svelte";
  import account from "../../../../assets/fts/account.svg";
  import { generateCredToken } from "../../../../ts/api/cred";
  import { loginUsingCreds } from "../../../../ts/api/getter";
  import { applyFTSState } from "../../../../ts/fts/main";
  import { getUsers } from "../../../../ts/userlogic/main";
  import Spinner from "../../../Spinner.svelte";
  import L from "../../../Language/L.svelte";
  import { D } from "../../../../ts/language/main";

  let username = "";
  let password = "";
  let error = false;
  let working = false;
  let loading = true;

  onMount(async () => {
    loading = true;

    const users = await getUsers();

    if (!Object.entries(users).length) applyFTSState("finish");

    loading = false;
  });

  async function login() {
    working = true;
    const token = generateCredToken({ username, password });
    const req = await loginUsingCreds(token);

    if (!req) {
      error = true;
      working = false;

      setTimeout(() => {
        error = false;
      }, 1000);

      return;
    }

    localStorage.setItem("arcos-remembered-token", token);
    applyFTSState("finish");
    working = false;
  }
</script>

{#if !loading}
  <div class="header centered">
    <img src={account} alt="Login" />
    <h1>
      <L id="fts.ea.header" />
    </h1>
    <p class="subtitle">
      <L id="fts.ea.subtitle" />
    </p>
  </div>

  <input
    type="text"
    class="fullwidth centered"
    class:error
    placeholder={D("username")}
    bind:value={username}
  />
  <div class="input-wrap">
    <input
      type="password"
      class="fullwidth centered"
      class:error
      placeholder={D("password")}
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
