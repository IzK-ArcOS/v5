<script lang="ts">
  import { onMount } from "svelte";
  import {
    getAllServers,
    getServer,
    setServer,
  } from "../../../../ts/api/server";
  import type { Login } from "../../../../ts/newlogin/main";
  import sleep from "../../../../ts/sleep";
  import { applyState } from "../../../../ts/state/main";

  export let runtime: Login;

  let selectedServer = getServer();
  let servers = [];

  onMount(() => {
    servers = getAllServers();
  });

  async function changeServer() {
    await sleep(0);

    if (selectedServer == "$new") return applyState("fts");

    setServer(selectedServer);

    runtime.UserName.set("ArcOS");
    runtime.navigate("restart");
  }
</script>

<select on:change={changeServer} bind:value={selectedServer} class="host">
  {#each servers as server}
    <option value={server}>{server}</option>
  {/each}
  <option value="$new">Add Server...</option>
</select>
