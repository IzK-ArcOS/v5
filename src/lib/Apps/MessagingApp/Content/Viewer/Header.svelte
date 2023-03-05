<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { getUserPfp } from "../../../../../ts/api/pfp";
  import { messageItemActions } from "../../../../../ts/messaging/actions/store";
  import type { Message } from "../../../../../ts/messaging/interface";
  import { messageSubscribe } from "../../../../../ts/messaging/updates";
  import ProfilePicture from "../../../../ProfilePicture.svelte";
  import warning from "../../../../../assets/apps/error.svg";

  export let message: Message;

  let userProfile = "";

  onMount(async () => {
    userProfile = await getUserPfp(message.sender);
  });

  messageSubscribe(async () => {
    userProfile = await getUserPfp(message.sender);
  });

  function getTimestamp(ts: number) {
    return dayjs(ts).format("DD MMM, HH:mm");
  }
</script>

<div class="message-header">
  <ProfilePicture height={32} src={userProfile} />
  <div class="context">
    <p class="name">
      {message.sender}
    </p>
    <p class="id">{getTimestamp(message.timestamp)}</p>
  </div>
  <div class="actions">
    {#if message.receiver.startsWith("deleted#")}
      <button class="material-icons-round" title="Receiver no longer exists"
        ><img src={warning} alt="" /></button
      >
    {/if}
    {#each messageItemActions as action}
      <button
        class="material-icons-round"
        on:click={() => action.action(message)}
        title={action.name}>{action.icon}</button
      >
    {/each}
  </div>
</div>
