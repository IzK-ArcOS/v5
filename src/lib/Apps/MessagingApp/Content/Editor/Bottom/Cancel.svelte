<script lang="ts">
  import { createOverlayableError } from "../../../../../../ts/errorlogic/overlay";
  import { ErrorIcon } from "../../../../../../ts/icon/apps";
  import { creatingMessage } from "../../../../../../ts/messaging/main";
  import { messageUpdateTrigger } from "../../../../../../ts/messaging/updates";
  export let loading: boolean;

  function cancel() {
    loading = true;
    createOverlayableError(
      {
        title: "Delete message?",
        message:
          "Are you sure you want to delete this draft? This cannot be undone.",
        image: ErrorIcon,
        buttons: [
          {
            caption: "Delete",
            action: () => {
              creatingMessage.set(false);
              messageUpdateTrigger();

              loading = false;
            },
            suggested: true,
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
</script>

<button on:click={cancel} disabled={loading}>Delete</button>
