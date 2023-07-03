<script lang="ts">
  import { createOverlayableError } from "../../../../../ts/errorlogic/overlay";
  import {
    creatingMessage,
    replyMessageId,
  } from "../../../../../ts/messaging/main";
  import {
    replyToMessage,
    sendMessage,
  } from "../../../../../ts/messaging/send";
  import { messageUpdateTrigger } from "../../../../../ts/messaging/updates";
  import icon from "../../../../../assets/apps/error.svg";
  import type { Process } from "../../../../../ts/applogic/interface";

  export let process: Process;
  export let content: string;
  export let target: string;
  export let viewing: boolean;

  async function send() {
    if ($replyMessageId) await replyToMessage($replyMessageId, target, content);
    else await sendMessage(target, content);

    creatingMessage.set(false);
    messageUpdateTrigger();
  }

  function cancel() {
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
            },
          },
          {
            caption: "Cancel",
            action: () => {},
          },
        ],
      },
      process.id
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
    <button on:click={cancel}>Delete</button>
    <button on:click={send} disabled={!content || !target}
      >{$replyMessageId ? "Reply" : "Send"}</button
    >
  </div>
</div>
