<script lang="ts">
  import { onMount } from "svelte";
  import type { AllUsers, UserData } from "../../../../ts/userlogic/interfaces";
  import { getUsers } from "../../../../ts/userlogic/main";

  let users: [string, UserData][] = [];
  let target = "";

  onMount(async () => {
    users = Object.entries(await getUsers());
  });
</script>

<div class="message-header">
  <div class="context singlerow">
    <p class="name">New Message</p>
  </div>

  <div class="actions">
    <button class="material-icons-round">delete</button>
    <button class="material-icons-round">send</button>
  </div>
  <!-- 
  <div class="setting to">
    <p class="caption">To:</p>
    <div class="content">
      <select bind:value={target}>
        {#each users as user}
          <option value={user[0]}>{user[0]}</option>
        {/each}
      </select>
    </div>
  </div> -->
</div>
