<script lang="ts">
  import { NotificationStore } from "$$ts/notiflogic/main";
  import Notification from "./Notifications/Notification.svelte";
</script>

<div class="notifications">
  {#each Object.entries($NotificationStore) as notification}
    <Notification {notification} />
  {/each}
  {#if Object.entries($NotificationStore).length == 0}
    <p class="none">You have no notifications</p>
  {/if}
</div>
