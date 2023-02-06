<script lang="ts">
  import "../../../../css/desktop/apps/messagingapp/content.css";
  import type { Message } from "../../../../ts/messaging/interface";
  import Header from "./Viewer/Header.svelte";

  export let message: Message;
</script>

<Header {message} />
