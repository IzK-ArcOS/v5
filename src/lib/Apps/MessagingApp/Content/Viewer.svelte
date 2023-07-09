<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import "../../../../css/desktop/apps/messagingapp/content.css";
  import type { Message } from "../../../../ts/messaging/interface";
  import Header from "./Viewer/Header.svelte";
  import ThreadNote from "./Viewer/ThreadNote.svelte";

  export let message: Message;
</script>

<Header {message} />
<div class="markdownrenderer">
  <SvelteMarkdown source={message.body} />
</div>
<ThreadNote {message} />
