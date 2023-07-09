<script lang="ts">
  import icon from "../../../../../../assets/apps/error.svg";
  import { createOverlayableError } from "../../../../../../ts/errorlogic/overlay";
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
</script>

<button on:click={cancel} disabled={loading}>Delete</button>
