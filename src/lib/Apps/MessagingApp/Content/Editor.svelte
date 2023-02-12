<script lang="ts">
  import { onMount } from "svelte";
  import { creatingMessage } from "../../../../ts/messaging/main";
  import { sendMessage } from "../../../../ts/messaging/send";
  import { messageUpdateTrigger } from "../../../../ts/messaging/updates";
  import type { UserData } from "../../../../ts/userlogic/interfaces";
  import { getUsers } from "../../../../ts/userlogic/main";
  import Header from "./Editor/Header.svelte";
  import TargetSelector from "./Editor/TargetSelector.svelte";

  let users: [string, UserData][] = [];
  let target = "";
  let content = "";

  onMount(async () => {
    users = Object.entries(await getUsers());
  });

  async function send() {
    await sendMessage(target, content);

    cancel();
  }

  function cancel() {
    creatingMessage.set(false);
    messageUpdateTrigger();
  }
</script>

<div class="editor">
  <!-- <Header />window#MessagingApp div.body > div.content div.message-header p -->
  <TargetSelector bind:target {users} />
</div>

<textarea placeholder="New message" bind:value={content} maxlength="2000" />

<div class="editor-send">
  {content.length} / 2000
  <div class="right">
    <button on:click={cancel}>Delete</button>
    <button on:click={send}>Send</button>
  </div>
</div>
