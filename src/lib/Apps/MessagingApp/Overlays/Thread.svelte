<script lang="ts">
  import "../../../../css/desktop/apps/messagingapp/overlays/thread.css";
  import type { App, Process } from "../../../../ts/applogic/interface";
  import type { PartiallyExtendedMessage } from "../../../../ts/messaging/interface";
  import { threadMessageId } from "../../../../ts/messaging/main";
  import { getPartialTree } from "../../../../ts/messaging/thread";
  import CloseButton from "../../../Page/Desktop/WindowStore/OverlayableWindow/CloseButton.svelte";
  import Item from "./Thread/Branch/Item.svelte";
  import NotFound from "./Thread/NotFound.svelte";

  export let id: string;
  export let parent: Process;

  let thread: PartiallyExtendedMessage;

  threadMessageId.subscribe(async (v) => {
    if (!v) return;

    thread = null;

    const th = await getPartialTree($threadMessageId);

    if (!th) return;

    thread = th;
  });
</script>

<CloseButton {parent} {id} />

{#if $threadMessageId && thread}
  <h3 class="header">Thread of #{thread.id}</h3>
  <Item item={thread} />
{:else}
  <NotFound />
{/if}
