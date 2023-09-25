<script lang="ts">
  import { onMount } from "svelte";
  import "../../../css/desktop/apps/UpdateNotice.css";
  import { disableApp } from "../../../ts/applogic/enabling";
  import type { App } from "../../../ts/applogic/interface";
  import { UpdateIcon } from "../../../ts/icon/main";
  import { showOverlay } from "../../../ts/window/overlay";
  import {
    filterTagName,
    getLatestRelease,
    parseVersion,
  } from "../../../updates/main";

  export let app: App;

  let version = "";

  onMount(async () => {
    version = parseVersion(
      filterTagName((await getLatestRelease()).tag_name)
    ).join(".");
  });

  function cancel() {
    disableApp(app.id);
  }

  function changeLog() {
    showOverlay("changeLog", app.id);
  }

  function openRelease() {
    const RELEASE_URL =
      "https://github.com/IzK-ArcOS/ArcOS-Frontend/releases/latest";

    window.open(RELEASE_URL, "_blank");
  }
</script>

<div class="updatenotice">
  <img src={UpdateIcon} alt="Update" />
  <div class="header">
    <h1>Update available!</h1>
    <div class="sub">
      <p class="part">ArcOS {version}</p>
      <div class="dot" />
      <p class="part">
        <button class="changelog" on:click={changeLog}>Changelog</button>
      </p>
    </div>
  </div>
  <p class="context">
    Update now to get the latest features,<br />
    bug fixes and stability improvements.
  </p>

  <div class="bottom">
    <button class="download" on:click={openRelease}>Download</button>
    <button class="cancel" on:click={cancel}>Don't show again</button>
  </div>
</div>
