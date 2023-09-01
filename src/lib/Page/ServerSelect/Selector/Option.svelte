<script lang="ts">
  import icon from "../../../../assets/fts/connect.svg";
  import type { ServerSelectOption } from "../../../../ts/api/interface";
  import { getAllServers, removeServer } from "../../../../ts/api/server";
  import { applyState } from "../../../../ts/state/main";

  export let server: ServerSelectOption;
  export let selected: string;
  export let update: () => any;

  function select() {
    selected = server.hostname;
  }

  function remove() {
    removeServer(server.hostname);

    const servers = getAllServers();

    if (!servers.length) return applyState("fts");

    selected = servers[0];

    update();
  }
</script>

<button
  class="option"
  on:click={select}
  class:selected={selected == server.hostname}
>
  <img src={icon} alt="" class="icon" />
  <p class="caption">{server.hostname}</p>
  <div class="right">
    <button class="delete material-icons-round" on:click={remove}>delete</button
    >
    {#if server.private}
      <span class="material-icons-round">lock</span>
    {/if}
  </div>
</button>
