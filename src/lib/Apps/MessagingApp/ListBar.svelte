<script lang="ts">
  import { onMount } from "svelte";
  import type { PartialMessage } from "../../../ts/messaging/interface";
  import { messagingPage } from "../../../ts/messaging/paging/store";
  import {
    messageSubscribe,
    messageUpdateTrigger,
  } from "../../../ts/messaging/updates";

  let items: PartialMessage[] = [];

  onMount(() => {
    messageUpdateTrigger();
  });

  messageSubscribe(async () => {
    if (!$messagingPage) return;

    items = await $messagingPage.msgGetter();
  });
</script>

<div class="listbar">
  {#each items as item}
    <p>{item.sender} -> {item.receiver} ({item.id})</p>
  {/each}
</div>
