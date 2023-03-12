<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import "../../../../css/desktop/apps/messagingapp/content.css";
  import type { Message } from "../../../../ts/messaging/interface";
  import {
    creatingMessage,
    replyMessageId,
    selectedMessageId,
    threadMessageId,
  } from "../../../../ts/messaging/main";
  import { getParentMessage } from "../../../../ts/messaging/thread";
  import { showOverlay } from "../../../../ts/window/overlay";
  import Header from "./Viewer/Header.svelte";

  export let message: Message;

  let threadLoading = false;

  async function openThread() {
    threadLoading = true;
    const id =
      message.replies && !message.replyingTo
        ? message.id
        : (await getParentMessage(message.id)).id;

    threadMessageId.set(id);

    showOverlay("thread", "MessagingApp");

    threadLoading = false;
  }

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
{#if message.replyingTo || message.replies}
  <div class="reply-wrapper">
    <p class="caption">Message is part of a thread.</p>
    <div class="right">
      <button on:click={openThread} disabled={threadLoading}>
        {threadLoading ? "Loading..." : "View Thread"}
      </button>
    </div>
  </div>
{/if}
