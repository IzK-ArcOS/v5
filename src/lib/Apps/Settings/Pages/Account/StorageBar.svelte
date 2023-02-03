<script lang="ts">
  import "../../../../../css/desktop/apps/settings/account/storagebar.css";
  import { onMount } from "svelte";
  import type { StorageStat } from "../../../../../ts/storage/interface";
  import { getLocalStorageUsage } from "../../../../../ts/storage/main";
  import AllUsers from "./StorageBar/AllUsers.svelte";
  import OtherItems from "./StorageBar/OtherItems.svelte";
  import User from "./StorageBar/User.svelte";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  let data: StorageStat;

  let bar: HTMLDivElement;

  onMount(() => {
    data = getLocalStorageUsage();
  });

  UserData.subscribe(() => {
    data = null;

    setTimeout(() => {
      data = getLocalStorageUsage();
    });
  });

  function perc(total: number, val: number): string {
    return `${((100 / total) * val).toFixed(2)}%`;
  }
</script>

<div class="storagebar" bind:this={bar}>
  {#if bar && data}
    <User total={bar.offsetWidth} {data} />
    <AllUsers total={bar.offsetWidth} {data} />
    <OtherItems total={bar.offsetWidth} {data} />
  {/if}
</div>
