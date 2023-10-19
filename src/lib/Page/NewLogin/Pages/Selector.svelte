<script lang="ts">
  import { onMount } from "svelte";
  import { getUsers } from "../../../../ts/userlogic/main";
  import User from "./Selector/User.svelte";
  import type { Login } from "../../../../ts/newlogin/main";

  export let runtime: Login;

  let users;

  onMount(async () => {
    users = await getUsers();
  });

  function register() {
    runtime.navigate("newuserauth");
  }
</script>

<div class="login-selector">
  <div class="users">
    {#if users}
      {#each Object.keys(users) as username}
        <User {runtime} data={users[username]} name={username} />
      {/each}
    {/if}
  </div>
  <button class="register normal" on:click={register}>Create Account</button>
</div>
