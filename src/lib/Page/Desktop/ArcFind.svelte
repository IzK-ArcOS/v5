<script lang="ts">
  import "../../../css/desktop/arcfind.css";
  import { isPopulatable } from "../../../ts/applogic/checks";
  import { WindowStore, maxZIndex } from "../../../ts/applogic/store";
  import { Busy } from "../../../ts/env/main";
  import type { SearchItem } from "../../../ts/search/interface";
  import { Search, arcFindValue, showArcFind } from "../../../ts/search/main";
  import sleep from "../../../ts/sleep";
  import Loading from "./ArcFind/Loading.svelte";
  import NoResults from "./ArcFind/NoResults.svelte";
  import Result from "./ArcFind/Result.svelte";
  import AppListItem from "./StartMenu/AppListItem.svelte";

  export let inlined = false;

  let index = 0;
  let loading = false;
  let initial = false;

  let searchBox: HTMLInputElement;

  let results: SearchItem[] = [];

  async function search() {
    if (!$arcFindValue) return (initial = false);
    initial = true;
    loading = true;
    Busy.set(true);

    const items = [];

    const fuseResults = await Search($arcFindValue);

    for (let i = 0; i < fuseResults.length; i++) {
      items.push(fuseResults[i].item);
    }

    index = -1;
    results = items.slice(0, 6);
    loading = false;
    Busy.set(false);
  }

  function submit(e: Event) {
    e.preventDefault();

    if (!results.length) return;

    $arcFindValue = "";

    if (index != -1) {
      results[index].action(results[index]);

      reset();
      showArcFind.set(false);

      return;
    }

    results[0].action(results[0]);

    reset();
    showArcFind.set(false);
  }

  function reset() {
    results = [];
    $arcFindValue = "";
    index = -1;
    initial = false;
  }

  function closeThis() {
    reset();
    showArcFind.set(false);
  }

  showArcFind.subscribe(async (v) => {
    reset();

    if (!v) return;

    await sleep(500);
    searchBox.focus();
    await sleep(200);
    searchBox.focus();
  });

  function mutateIndex(e: KeyboardEvent) {
    const key = e.key.toLowerCase();

    if (key == "escape") {
      reset();
      showArcFind.set(false);
      return;
    }

    if (!results.length) return (index = -1);

    let length = results.length - 1;

    switch (key) {
      case "arrowup":
        index--;
        if (index < 0) index = length;
        break;

      case "arrowdown":
        index++;
        if (index > length) index = 0;
        break;
    }
  }
</script>

<div
  class="arcfind-wrapper"
  class:inlined
  style="z-index: {$maxZIndex + 30};"
  class:show={$showArcFind || inlined}
>
  <div class="arcfind">
    <form on:submit={submit}>
      {#if $showArcFind}
        <input
          type="text"
          placeholder="Search ArcOS"
          bind:value={$arcFindValue}
          on:input={search}
          on:keydown={mutateIndex}
          bind:this={searchBox}
        />
      {/if}
    </form>
    <button class="material-icons-round">search</button>
  </div>
  {#if initial}
    <div class="results">
      {#if results.length}
        {#each results as result, i}
          <Result {index} {result} resultIndex={i} />
        {/each}
      {:else if loading}
        <Loading />
      {:else}
        <NoResults />
      {/if}
    </div>
  {/if}

  <div class="apps" class:hide={!!$arcFindValue}>
    {#each $WindowStore as app}
      {#if isPopulatable(app)}
        <AppListItem {app} onopen={() => ($showArcFind = false)} />
      {/if}
    {/each}
  </div>
  {#if !inlined}
    <button class="material-icons-round close" on:click={closeThis}
      >close</button
    >
  {/if}
</div>
