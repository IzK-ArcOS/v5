<script lang="ts">
  import { createOverlayableError } from "../../../../../ts/errorlogic/overlay";
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
  import icon from "../../../../../assets/apps/error.svg";

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

  function cancel() {
    loading = true;
    createOverlayableError(
      {
        title: "Delete message?",
        message:
          "Are you sure you want to delete this draft? This cannot be undone.",
        image: icon,
        buttons: [
          {
            caption: "Delete",
            action: () => {
              creatingMessage.set(false);
              messageUpdateTrigger();

              loading = false;
            },
          },
          {
            caption: "Cancel",
            action: () => {
              loading = false;
            },
          },
        ],
      },
      "MessagingApp"
    );
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
    <button on:click={cancel} disabled={loading}>Delete</button>
    <button on:click={send} disabled={!content || !target || loading}>
      {loading ? "..." : $replyMessageId ? "Reply" : "Send"}
    </button>
  </div>
</div>
