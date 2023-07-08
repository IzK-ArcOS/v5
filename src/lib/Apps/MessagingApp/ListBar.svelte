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

    const messages = await $messagingPage.msgGetter();

    if (!isSame(items, messages)) set(sort(messages));

    loading = false;
  }

  function sort(content: PartialMessage[]): PartialMessage[] {
    return content.sort(function (a, b) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

  function set(messages: PartialMessage[]) {
    items = [];

    // Implement delay to overcome common Svelte update "bug"
    setTimeout(() => {
      items = messages;
    });
  }

  function isSame(a: PartialMessage[], b: PartialMessage[]) {
    if (a.length != b.length) return false;

    for (let i = 0; i < b.length; i++) {
      let exists = false;

      for (let j = 0; j < a.length; j++) {
        if (a[j].id == b[i].id) exists = true;
      }

      if (!exists) return false;
    }

    return true;
  }
</script>

<div class="listbar">
  {#if $messagingPage}
    <div class="header">
      <p class="title">{$messagingPage.name}</p>
      <button
        class="material-icons-round refresh"
        disabled={loading}
        on:click={refresh}>sync</button
      >
    </div>
    <div class="list">
      {#each items as item}
        <MessageItem {item} />
      {/each}
      {#if !items.length}
        <div class="noitems">{!loading ? "No messages!" : "Loading..."}</div>
      {/if}
    </div>
  {/if}
</div>
