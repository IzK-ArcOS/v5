<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/serverselect.css";
  import type { ServerSelectOption } from "../../ts/api/interface";
  import Logo from "../../assets/fts/connect.svg";
  import sleep from "../../ts/sleep";
  import Selector from "./ServerSelect/Selector.svelte";
  import { getAllServers, getServer } from "../../ts/api/server";
  import { applyState } from "../../ts/state/main";

  let selected = "";
  let servers: ServerSelectOption[] = [];
  let show = false;

  onMount(async () => {
    if (!getAllServers().length) {
      applyState("fts");
      return;
    }

    selected = getServer();

    await sleep(500);
    show = true;
  });
</script>

<div class="serverselect theme-amoled" class:show>
  <div class="ss-inner">
    <div class="left">
      <img src={Logo} alt="" class="logo" />
      <h1 class="header">Select Server</h1>
    </div>
    <Selector bind:selected bind:servers />
  </div>
</div>
