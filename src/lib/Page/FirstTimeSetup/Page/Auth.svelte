<script lang="ts">
  import account from "../../../../assets/fts/account.svg";
  import { onMount } from "svelte";
  import { getUsers } from "../../../../ts/userlogic/main";
  import Nav from "../Nav.svelte";

  let users: string[] = [];
  let username = "";
  let password = "";

  onMount(async () => {
    users = Object.keys(await getUsers());
  });
</script>

<div class="header centered">
  <img src={account} alt="Login" />
  <h1>Who are you?</h1>
  <p class="subtitle">Let's get you logged in</p>
</div>

<input
  type="text"
  class="fullwidth centered"
  placeholder="Username"
  bind:value={username}
/>
<div class="input-wrap">
  <input
    type="password"
    class="fullwidth centered"
    placeholder="Password"
    bind:value={password}
  />
  <button class="login material-icons-round" disabled={!username || !password}
    >arrow_forward_ios</button
  >
</div>

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
  }
</style>
