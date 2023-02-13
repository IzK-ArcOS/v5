<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import "../../../../css/desktop/apps/messagingapp/content.css";
  import type { Message } from "../../../../ts/messaging/interface";
  import {
    creatingMessage,
    replyMessageId,
    selectedMessageId,
  } from "../../../../ts/messaging/main";
  import Header from "./Viewer/Header.svelte";

  export let message: Message;

  function openReply() {
    selectedMessageId.set(message.replyingTo);

    creatingMessage.set(false);
    replyMessageId.set(null);
  }
</script>

<Header {message} />
<div class="markdownrenderer">
  <SvelteMarkdown source={message.body} />
</div>
{#if message.replyingTo}
  <div class="reply-wrapper">
    <p class="caption">Reply to {message.replyingTo}</p>
    <div class="right"><button on:click={openReply}>View</button></div>
  </div>
{/if}
