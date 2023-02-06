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

  onMount(() => {
    messageUpdateTrigger();
  });

  messageSubscribe(async () => {
    if (!$messagingPage) return;

    const messages = await $messagingPage.msgGetter();

    for (let i = 0; i < messages.length; i++) {
      if (!messages[i] || !items[i] || items[i].id != messages[i].id) {
        items = [];
        items = await $messagingPage.msgGetter();
        break;
      }
    }
  });
</script>

<div class="listbar">
  {#each items as item}
    <MessageItem {item} />
  {/each}
</div>
