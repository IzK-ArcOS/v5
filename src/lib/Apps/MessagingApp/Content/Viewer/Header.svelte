<script lang="ts">
  import { onMount } from "svelte";
  import { getUserPfp } from "../../../../../ts/api/pfp";
  import {
    messageItemActions,
    messageSidebarActions,
  } from "../../../../../ts/messaging/actions/store";
  import type { Message } from "../../../../../ts/messaging/interface";
  import { messageSubscribe } from "../../../../../ts/messaging/updates";
  import ProfilePicture from "../../../../ProfilePicture.svelte";

  export let message: Message;

  let userProfile = "";

  onMount(async () => {
    userProfile = await getUserPfp(message.sender);
  });

  messageSubscribe(async () => {
    userProfile = await getUserPfp(message.sender);
  });
</script>

<div class="message-header">
  <ProfilePicture height={32} src={userProfile} />
  <div class="context">
    <p class="name">{message.sender}, {message.timestamp}</p>
    <p class="id">{message.id}</p>
  </div>
  <div class="actions">
    {#each messageItemActions as action}
      <button class="material-icons-round">{action.icon}</button>
    {/each}
  </div>
</div>
