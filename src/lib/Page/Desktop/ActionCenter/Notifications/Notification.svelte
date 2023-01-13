<script lang="ts">
  import type { NotificationData } from "../../../../../ts/notiflogic/interfaces";
  import {
    CurrentNotification,
    deleteNotification,
  } from "../../../../../ts/notiflogic/main";

  export let notification: [string, NotificationData];

  function close() {
    deleteNotification(notification[0]);

    CurrentNotification.set(null);
  }

  function buttonEvent(e: () => void) {
    return () => {
      e();

      close();
    };
  }
</script>

<div class="notification ac">
  <p class="title">
    <span class="material-icons">{notification[1].icon}</span>
    {notification[1].title}
    <button class="close material-icons" on:click={close}> close </button>
  </p>
  <p class="content">{@html notification[1].message}</p>
  <div class="buttons">
    <div class="inner">
      {#each notification[1].buttons as button}
        <button on:click={buttonEvent(button.action)}>{button.capt}</button>
      {/each}
    </div>
  </div>
</div>
