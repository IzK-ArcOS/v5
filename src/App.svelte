<style>
	* {
		cursor: none;
	}
	a[itemprop="url"] {
	  pointer-events: none;
	  cursor: none;
	}
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import { logoffToken } from "./ts/api/cred";
  import { getMode, Logo } from "./ts/branding";
  import { applyState, CurrentState } from "./ts/state/main";
  import { ArcSoundBus } from "./ts/sound/main";
import Cursor from './Cursor.svelte';

  let run = false;
  let logo = "";

  onMount(async () => {
    await getMode();

    applyState("boot");

    window.addEventListener("beforeunload", logoffToken);

    logo = Logo();
    run = true;
  });
</script>

// <Cursor color="green" mixBlendMode="exclusion" size="28" />

<svelte:head>
  <link rel="icon" href={logo} />
</svelte:head>

{#if run}
  <div class="app fullscreen">
    {#if $CurrentState}
      <svelte:component this={$CurrentState.content} />
    {/if}
    <BugReport />
  </div>
{/if}
