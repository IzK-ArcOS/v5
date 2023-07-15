<script lang="ts">
  import { onMount } from "svelte";
  import { getAuthcode } from "../../../ts/api/authcode";
  import type { ServerSelectOption } from "../../../ts/api/interface";
  import { getAllServers } from "../../../ts/api/server";
  import Option from "./Selector/Option.svelte";
  import Actions from "./Actions.svelte";

  export let selected = "";
  export let servers: ServerSelectOption[] = [];

  function update() {
    servers = [];
    const list = getAllServers().sort();

    for (let i = 0; i < list.length; i++) {
      const ac = getAuthcode(list[i]);

      servers.push({
        hostname: list[i],
        private: !!ac,
        authCode: ac,
      });
    }
  }

  onMount(update);
</script>

<div class="selector">
  <div class="options">
    {#each servers as server}
      <Option {server} bind:selected />
    {/each}
  </div>
  <Actions {selected} {servers} />
</div>
