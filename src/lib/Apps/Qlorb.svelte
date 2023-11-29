<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/qlorb.css";
  import type { QlorbRuntime } from "../../ts/applogic/apps/Qlorb/runtime";
  import type { App } from "../../ts/applogic/interface";
  import Intro from "./Qlorb/Intro.svelte";
  import Main from "./Qlorb/Main.svelte";
  import Start from "./Qlorb/Start.svelte";
  export let runtime: QlorbRuntime;
  export let app: App;

  onMount(() => {
    runtime.switchPage("intro");
  });
</script>

{#if runtime}
  <Main {runtime} />
  <Intro {runtime} {app} />
  <Start {runtime} {app} />
{/if}
