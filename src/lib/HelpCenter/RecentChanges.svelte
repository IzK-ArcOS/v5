<script lang="ts">
  import { onMount } from "svelte";
  import { getLatestRelease } from "../../updates/main";
  import SvelteMarkdown from "svelte-markdown";
  import Spinner from "../Spinner.svelte";
  import { Busy } from "../../ts/env/main";

  let data: GitHubRelease;
  let loading = false;

  onMount(async () => {
    Busy.set(true);
    loading = true;

    data = await getLatestRelease();

    loading = false;
    Busy.set(false);
  });
</script>

{#if data}
  <h3>Changelog for ArcOS v{data.tag_name}</h3>
  <SvelteMarkdown source={data.body} />
{:else if !loading}
  <p>
    ArcOS is currently unable to get the latest release information from the
    github repository. Please try again later.
  </p>
{:else}
  <div class="loading">
    <Spinner height={32} />
    <p class="caption">Reading items...</p>
  </div>
{/if}
