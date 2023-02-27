<script lang="ts">
  import icon from "../../../../assets/apps/messaging.svg";
  import { creatingMessage } from "../../../../ts/messaging/main";
</script>

<div class="no-content-wrapper">
  <div class="no-content">
    <img src={icon} alt="Messaging" />
    <p class="header">No content.</p>
    <p>Please select a message or create a new one.</p>
    <br />
    <button on:click={() => ($creatingMessage = true)}>New Message</button>
  </div>
</div>
