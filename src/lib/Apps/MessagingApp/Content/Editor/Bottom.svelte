<script lang="ts">
  import {
    creatingMessage,
    replyMessageId,
    selectedMessageId,
  } from "../../../../../ts/messaging/main";
  import {
    replyToMessage,
    sendMessage,
  } from "../../../../../ts/messaging/send";
  import { messageUpdateTrigger } from "../../../../../ts/messaging/updates";
  import Cancel from "./Bottom/Cancel.svelte";

  export let content: string;
  export let target: string;
  export let viewing: boolean;

  let loading = false;

  async function send() {
    loading = true;
    if ($replyMessageId) await replyToMessage($replyMessageId, target, content);
    else {
      const id = await sendMessage(target, content);

      setTimeout(() => {
        selectedMessageId.set(id);
      }, 50);
    }

    creatingMessage.set(false);
    messageUpdateTrigger();
    loading = false;
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
      on:click={viewer}>remove_red_eye</button
    >
    <button
      class="material-icons-round"
      class:selected={!viewing}
      on:click={editor}>edit</button
    >
  </div>
  {#if content.length > 1950}
    <div class="counter" class:critical={content.length > 1980}>
      {2000 - content.length}
    </div>
  {/if}
  <div class="right">
    <Cancel bind:loading />
    <button on:click={send} disabled={!content || !target || loading}>
      {loading ? "Loading..." : $replyMessageId ? "Reply" : "Send"}
    </button>
  </div>
</div>
