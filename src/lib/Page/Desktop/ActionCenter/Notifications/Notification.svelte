<script lang="ts">
  import { actionCenterOpened } from "../../../../../ts/desktop/actioncenter/main";
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

      actionCenterOpened.set(false);
    };
  }
</script>

<div class="notification ac">
  <p class="title">
    {#if notification[1].image}
      <img src={notification[1].image} alt={notification[1].title} />
    {:else}
      <span class="material-icons-round">{notification[1].icon}</span>
    {/if}
    {notification[1].title}
    <button class="close material-icons-round" on:click={close}> close </button>
  </p>
  <p class="content">{@html notification[1].message}</p>
  <div class="buttons">
    <div class="inner">
      {#each notification[1].buttons as button}
        <button on:click={buttonEvent(button.action)}>{button.caption}</button>
      {/each}
    </div>
  </div>
</div>
