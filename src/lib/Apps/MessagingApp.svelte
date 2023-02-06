<script lang="ts">
  import SideBar from "./MessagingApp/SideBar.svelte";
  import "../../css/desktop/apps/messaging.css";
  import {
    messagingPage,
    MessagingPages,
  } from "../../ts/messaging/paging/store";
  import ListBar from "./MessagingApp/ListBar.svelte";
  import { onMount } from "svelte";
  import Content from "./MessagingApp/Content.svelte";

  onMount(() => {
    $messagingPage = MessagingPages["unread"];
  });
</script>

<SideBar />
{#if $messagingPage}
  <ListBar />
  <Content />
{/if}
