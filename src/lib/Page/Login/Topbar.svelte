<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import {
    applyLoginState,
    CurrentLoginState,
    loginUsername,
  } from "../../../ts/login/main";
  import { getServer } from "../../../ts/api/server";

  let time: string = "";
  let show = false;
  let host = "";

  onMount(() => {
    setInterval(() => (time = dayjs().format("HH:mm")), 500);
    setTimeout(() => (show = true), 750);

    const server = getServer();

    host = server ? `API: ${server}` : `Local: ${location.hostname}`;
  });

  function shutdown() {
    loginUsername.set("ArcOS");
    applyLoginState("shutdown");
  }

  function restart() {
    loginUsername.set("ArcOS");
    applyLoginState("restart");
  }
</script>

{#if $CurrentLoginState}
  <div
    class="topbar"
    class:show={($CurrentLoginState.attribs.topbar || false) && show}
  >
    <div class="hostname">
      {host}
    </div>
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
