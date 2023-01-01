<script lang="ts">
  import { applyState } from "../../../../ts/state/main";

  import { onMount } from "svelte";
  import { getUsers } from "../../../../ts/userlogic/main";
  import User from "../User.svelte";

  let users;

  onMount(async () => {
    users = await getUsers();
  });

  function fts() {
    applyState("fts");
  }
</script>

<div class="user-selector">
  {#if users}
    {#each Object.keys(users) as username}
      <User data={users[username]} name={username} />
    {/each}
  {/if}
</div>
