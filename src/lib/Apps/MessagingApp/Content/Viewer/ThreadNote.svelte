<script lang="ts">
  import type { Message } from "../../../../../ts/messaging/interface";
  import { threadMessageId } from "../../../../../ts/messaging/main";
  import { getParentMessage } from "../../../../../ts/messaging/thread";
  import { showOverlay } from "../../../../../ts/window/overlay";

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
</script>

{#if message.replyingTo || message.replies.length}
  <div class="reply-wrapper">
    <p class="caption">Message is part of a thread.</p>
    <div class="right">
      <button on:click={openThread} disabled={threadLoading}>
        {threadLoading ? "Loading..." : "View Thread"}
      </button>
    </div>
  </div>
{/if}
