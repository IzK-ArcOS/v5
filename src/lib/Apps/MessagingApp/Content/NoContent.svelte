<script lang="ts">
  import { MessagingIcon } from "../../../../ts/icon/apps";
  import { creatingMessage } from "../../../../ts/messaging/main";

  function newMessage() {
    $creatingMessage = true;
  }
</script>

<div class="no-content-wrapper">
  <div class="no-content">
    <img src={MessagingIcon} alt="Messaging" />
    <p class="header">No content.</p>
    <p>Please select a message or create a new one.</p>
    <br />
    <button on:click={newMessage}>New Message</button>
  </div>
</div>
