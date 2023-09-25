<script lang="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { ARCOS_MODE } from "../../../../../ts/branding";
  import { ARCOS_BUILD } from "../../../../../ts/branding/build";
  import { ArcOSVersion } from "../../../../../ts/env/main";
  import { UploadIcon } from "../../../../../ts/icon/main";
  import { hideOverlay } from "../../../../../ts/window/overlay";
  import {
    filterTagName,
    getLatestRelease,
    parseVersion,
  } from "../../../../../updates/main";

  let changelog = "";
  let version = [];

  onMount(async () => {
    const release = await getLatestRelease();

    version = parseVersion(filterTagName(release.tag_name));

    changelog =
      release.body ||
      "### Unable to get release\nGitHub API limit may have been reached! Please try again later.";
  });

  function close() {
    hideOverlay("changeLog", "UpdateNotice");
  }
</script>

<div class="header">
  <div class="left">
    <h1>Update Changelog</h1>
    <p class="version">
      ArcOS v{version.join(".")}
    </p>
  </div>
  <img src={UploadIcon} alt="" class="icon" />
</div>
<div class="markdownrenderer">
  <SvelteMarkdown source={changelog} />
</div>
<div class="bottom">
  <div class="current">
    current: {ArcOSVersion}-{ARCOS_MODE} ({ARCOS_BUILD || "<build>"})
  </div>
  <div class="actions"><button on:click={close}>I see</button></div>
</div>
