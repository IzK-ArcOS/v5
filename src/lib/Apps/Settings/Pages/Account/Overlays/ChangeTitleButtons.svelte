<script lang="ts">
  import "../../../../../../css/desktop/apps/settings/changetitlebuttons.css";
  import type { App, Process } from "../../../../../../ts/applogic/interface";
  import { titlebarButtons } from "../../../../../../ts/window/titlebar/store";
  import CloseButton from "../../../../../Page/Desktop/WindowStore/OverlayableWindow/CloseButton.svelte";
  import Item from "./ChangeTitleButtons/Item.svelte";
  export let id: string;
  export let parent: Process;
</script>

<CloseButton {parent} {id} />
<h3 class="header">Titlebar buttons</h3>
<p class="subheader">Choose one of the titlebar button styles:</p>
{#each Object.entries(titlebarButtons) as entry}
  <Item id={entry[0]} data={entry[1]} />
{/each}
