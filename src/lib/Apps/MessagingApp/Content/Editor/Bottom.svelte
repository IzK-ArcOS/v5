<script lang="ts">
  import { Busy } from "../../../../../ts/env/main";
  import {
    creatingMessage,
    replyMessageId,
  } from "../../../../../ts/messaging/main";
  import {
    replyToMessage,
    sendMultipleMessages,
  } from "../../../../../ts/messaging/send";
  import { messageUpdateTrigger } from "../../../../../ts/messaging/updates";
  import Cancel from "./Bottom/Cancel.svelte";

  export let content: string;
  export let target: string[];
  export let viewing: boolean;
  export let title: string;

  let loading = false;

  async function send() {
    Busy.set(true);
    loading = true;

    const fullBody = `### ${title}\n${content}`;

    if ($replyMessageId)
      await replyToMessage($replyMessageId, target[0], fullBody);
    else {
      await sendMultipleMessages(target, fullBody);
    }

    creatingMessage.set(false);
    messageUpdateTrigger();
    loading = false;
    Busy.set(false);
  }

  function editor() {
    viewing = false;
  }

  function viewer() {
    viewing = true;
  }
</script>

<div class="editor-send">
  <div class="view-group">
    <button
      class="material-icons-round"
      class:selected={viewing}
      on:click={viewer}
    >
      remove_red_eye
    </button>
    <button
      class="material-icons-round"
      class:selected={!viewing}
      on:click={editor}
    >
      edit
    </button>
  </div>
  {#if content.length + 5 + title.length > 1950}
    <div
      class="counter"
      class:critical={content.length + 5 + title.length > 1980}
    >
      {2000 - content.length}
    </div>
  {/if}
  <div class="right">
    <Cancel bind:loading />
    <button
      on:click={send}
      disabled={!content || loading || !title || !target.length}
    >
      {loading ? "Loading..." : $replyMessageId ? "Reply" : "Send"}
    </button>
  </div>
</div>
