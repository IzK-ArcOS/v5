<script lang="ts">
  import { onMount } from "svelte";
  import "@css/desktop/apps/didyouknow.css";
  import type { Tip } from "$$ts/applogic/apps/DidYouKnow/interface";
  import { getRandomTip } from "$$ts/applogic/apps/DidYouKnow/main";
  import { closeWindow } from "$$ts/applogic/events";

  let tip: Tip;

  onMount(() => {
    tip = getRandomTip();
  });
</script>

<h2>Did you know?</h2>
{#if tip}
  <div class="content">
    <h3><span class="material-icons-round">{tip.icon}</span> {tip.title}</h3>
    <p>{tip.content}</p>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a on:click={() => tip.trigger(tip)}>Learn more</a>
  </div>
{/if}
<div class="actions">
  <button on:click={() => (tip = getRandomTip())}>Another Tip</button>
  <button on:click={() => closeWindow("DidYouKnow")}>Close</button>
</div>
