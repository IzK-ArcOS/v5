<script lang="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { getMessage, replyMessageId } from "../../../../ts/messaging/main";
  import type { UserData } from "../../../../ts/userlogic/interfaces";
  import { getUsers } from "../../../../ts/userlogic/main";
  import Bottom from "./Editor/Bottom.svelte";
  import TargetSelector from "./Editor/TargetSelector.svelte";

  let users: [string, UserData][] = [];
  let target = "";
  let content = "";
  let viewing = false;

  onMount(async () => {
    users = Object.entries(await getUsers());
  });

  replyMessageId.subscribe(async (v) => {
    if (!v) return;

    const message = await getMessage(v);

    if (!message) return;

    target = message.sender;
  });
</script>

<div class="editor">
  <TargetSelector bind:target {users} />
</div>

{#if !viewing}
  <textarea placeholder="New message" bind:value={content} maxlength="2000" />
{:else}
  <div class="markdownrenderer">
    <SvelteMarkdown source={content} />
  </div>
{/if}

<Bottom {target} {content} bind:viewing />
