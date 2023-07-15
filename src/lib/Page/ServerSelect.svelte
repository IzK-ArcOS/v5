<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/serverselect.css";
  import type { ServerSelectOption } from "../../ts/api/interface";
  import Logo from "../../assets/fts/connect.svg";
  import sleep from "../../ts/sleep";
  import Selector from "./ServerSelect/Selector.svelte";
  import { getServer } from "../../ts/api/server";

  let selected = "";
  let servers: ServerSelectOption[] = [];
  let show = false;

  onMount(async () => {
    selected = getServer();

    await sleep(500);
    show = true;
  });
</script>

<div class="serverselect" class:show>
  <div class="ss-inner">
    <div class="left">
      <img src={Logo} alt="" class="logo" />
      <h1 class="header">Select Server</h1>
    </div>
    <Selector bind:selected bind:servers />
  </div>
</div>
