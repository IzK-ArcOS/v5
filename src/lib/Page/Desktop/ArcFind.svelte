<script lang="ts">
  import "../../../css/desktop/arcfind.css";
  import { maxZIndex } from "../../../ts/applogic/store";
  import type { SearchItem } from "../../../ts/search/interface";
  import { Search, showArcFind } from "../../../ts/search/main";
  import Result from "./ArcFind/Result.svelte";

  let query = "";
  let index = 0;

  let searchBox: HTMLInputElement;

  let results: SearchItem[] = [];

  async function search() {
    const items = [];

    const fuseResults = await Search(query);

    for (let i = 0; i < fuseResults.length; i++) {
      items.push(fuseResults[i].item);
    }

    index = -1;
    results = items.slice(0, 6);

    console.log(results);
  }

  function submit(e: Event) {
    e.preventDefault();

    if (!results.length) return;

    query = "";

    if (index != -1) {
      console.log(results, results[index], index, results[index - 1]);
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
    query = "";
    index = -1;
  }

  function closeThis() {
    reset();
    showArcFind.set(false);
  }

  showArcFind.subscribe((v) => {
    reset();

    if (v) setTimeout(() => searchBox.focus(), 100);
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
  style="z-index: {$maxZIndex + 15};"
  class:show={$showArcFind}
>
  <div class="arcfind">
    <form on:submit={submit}>
      <input
        type="text"
        placeholder="Search ArcOS"
        bind:value={query}
        on:input={search}
        on:keydown={mutateIndex}
        bind:this={searchBox}
      />
    </form>
    <button class="material-icons-round">search</button>
  </div>
  {#if results.length}
    <div class="results">
      {#each results as result, i}
        <Result {index} {result} resultIndex={i} />
      {/each}
    </div>
  {/if}
  <button class="material-icons-round close" on:click={closeThis}>close</button>
</div>
