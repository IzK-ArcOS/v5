<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import {
    applyLoginState,
    CurrentLoginState,
    loginUsername,
  } from "../../../ts/login/main";
  import { getAllServers, getServer, setServer } from "../../../ts/api/server";
  import { applyState } from "../../../ts/state/main";

  let time: string = "";
  let selectedServer = getServer();
  let show = false;
  let servers = [];

  onMount(() => {
    setInterval(() => (time = dayjs().format("HH:mm")), 500);
    setTimeout(() => (show = true), 750);

    servers = getAllServers();
  });

  function shutdown() {
    loginUsername.set("ArcOS");
    applyLoginState("shutdown");
  }

  function restart() {
    loginUsername.set("ArcOS");
    applyLoginState("restart");
  }

  function changeServer() {
    setTimeout(() => {
      if (selectedServer == "$new") return applyState("fts");

      setServer(selectedServer);

      restart();
    });
  }
</script>

{#if $CurrentLoginState}
  <div
    class="topbar"
    class:show={($CurrentLoginState.attribs.topbar || false) && show}
  >
    <select on:change={changeServer} bind:value={selectedServer} class="host">
      {#each servers as server}
        <option value={server}>{server}</option>
      {/each}
      <option value="$new">Add Server...</option>
    </select>
    <div class="clock">
      {time}
    </div>
    <div class="right">
      <button class="nopad" on:click={shutdown}>
        <span class="material-icons-round">power_settings_new</span>
      </button>
      <button class="nopad" on:click={restart}>
        <span class="material-icons-round">restart_alt</span>
      </button>
    </div>
  </div>
{/if}
