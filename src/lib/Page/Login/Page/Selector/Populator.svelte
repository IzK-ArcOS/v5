<script lang="ts">
  import { onMount } from "svelte";
  import { getUsers } from "../../../../../ts/userlogic/main";
  import User from "../../User.svelte";

  let users;

  onMount(async () => {
    users = await getUsers();
  });
</script>

{#if users}
  {#each Object.keys(users) as username}
    <User data={users[username]} name={username} />
  {/each}
{/if}
