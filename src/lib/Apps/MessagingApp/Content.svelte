<script lang="ts">
  import { createOverlayableError } from "../../../ts/errorlogic/overlay";
  import { MessagingIcon } from "../../../ts/icon/apps";
  import type { Message } from "../../../ts/messaging/interface";
  import {
    creatingMessage,
    getMessage,
    selectedMessageId,
  } from "../../../ts/messaging/main";
  import Editor from "./Content/Editor.svelte";
  import NoContent from "./Content/NoContent.svelte";
  import Viewer from "./Content/Viewer.svelte";

  let message: Message;

  selectedMessageId.subscribe(async (v) => {
    if (!v) return (message = null);

    const msg = await getMessage(v);

    if (!msg)
      return createOverlayableError(
        {
          title: "Can't open message",
          message: `No message with ID ${v} could be found on ArcAPI.`,
          buttons: [{ caption: "OK", action() {}, suggested: true }],
          image: MessagingIcon,
        },
        "MessagingApp"
      );

    message = null;
    setTimeout(() => {
      message = msg;
    });
  });
</script>

<div class="content">
  {#if message && !$creatingMessage}
    <Viewer {message} />
  {:else if $creatingMessage}
    <Editor />
  {:else}
    <NoContent />
  {/if}
</div>
