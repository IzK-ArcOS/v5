<script lang="ts">
  import "../../../../css/desktop/apps/messagingapp/overlays/thread.css";
  import type { App } from "../../../../ts/applogic/interface";
  import type { PartiallyExtendedMessage } from "../../../../ts/messaging/interface";
  import { threadMessageId } from "../../../../ts/messaging/main";
  import { getPartialTree } from "../../../../ts/messaging/thread";
  import sleep from "../../../../ts/sleep";
  import CloseButton from "../../../Page/Desktop/WindowStore/OverlayableWindow/CloseButton.svelte";
  import Item from "./Thread/Branch/Item.svelte";
  import NotFound from "./Thread/NotFound.svelte";

  let thread: PartiallyExtendedMessage;
  export let app: App;
  export let id: string;
  let loading = true;

  threadMessageId.subscribe(async (v) => {
    if (!v) return;

    loading = true;
    thread = null;

    const th = await getPartialTree($threadMessageId);

    loading = false;

    if (!th) return;

    thread = th;
  });
</script>

<CloseButton {app} {id} />

{#if $threadMessageId && thread}
  <h3 class="header">Thread of #{thread.id}</h3>
  <Item item={thread} />
{:else if !loading}
  <NotFound />
{/if}
