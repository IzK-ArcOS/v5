<script lang="ts">
  import { onMount } from "svelte";
  import type { PartialMessage } from "../../../ts/messaging/interface";
  import { messagingPage } from "../../../ts/messaging/paging/store";
  import {
    messageSubscribe,
    messageUpdateTrigger,
  } from "../../../ts/messaging/updates";
  import MessageItem from "./ListBar/MessageItem.svelte";

  let items: PartialMessage[] = [];
  let loading = false;

  onMount(() => {
    messageUpdateTrigger();
  });

  messageSubscribe(refresh);

  async function refresh() {
    loading = true;
    if (!$messagingPage) return;

    items = [];
    items = await $messagingPage.msgGetter();

    items = items.sort(function (a, b) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    loading = false;
  }
</script>

<div class="listbar">
  {#if $messagingPage}
    <div class="header">
      <p class="title">{$messagingPage.name}</p>
      <button class="material-icons-round refresh" on:click={refresh}
        >sync</button
      >
    </div>
  {/if}
  <div class="list">
    {#each items as item}
      <MessageItem {item} />
    {/each}
    {#if !items.length}
      <div class="noitems">{!loading ? "No messages!" : "Loading..."}</div>
    {/if}
  </div>
</div>
