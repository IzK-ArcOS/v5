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
<input
  type="password"
  class="fullwidth centered"
  placeholder="Password"
  bind:value={password}
/>
<button class="option fullwidth" disabled={!username || !password}
  >Continue</button
>
