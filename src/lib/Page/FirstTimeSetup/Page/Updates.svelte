<script lang="ts">
  import icon from "../../../../assets/branding/devIcon.svg";
  import { onMount } from "svelte";
  import Spinner from "../../../Spinner.svelte";
  import { DESKTOP_MODE } from "../../../../ts/desktop/app";
  import { applyFTSState } from "../../../../ts/fts/main";
  import {
    getLatestVersion,
    parseVersion,
    versionBigger,
  } from "../../../../updates/main";
  import { ArcOSVersion } from "../../../../ts/env/main";
  import { Log } from "../../../../ts/console";
  import { LogLevel } from "../../../../ts/console/interface";

  let checking = true;
  let release: Version = [0, 0, 0];

  onMount(async () => {
    if (DESKTOP_MODE !== "desktop") {
      Log(
        "FirstTimeSetup: Update",
        'Not checking for updates: DESKTOP_MODE is not "desktop".',
        LogLevel.warn
      );
      return applyFTSState("license");
    }

    release = await getLatestVersion();
    const version = parseVersion(ArcOSVersion);

    if (!versionBigger(release, version)) {
      return applyFTSState("license");
    }

    checking = false;
  });

  function update() {
    const RELEASE_URL =
      "https://github.com/IzK-ArcOS/ArcOS-Frontend/releases/latest";

    window.open(RELEASE_URL, "_blank");
  }

  function skip() {
    applyFTSState("license");
  }
</script>

<div class="center-flex">
  {#if checking}
    <div>
      <Spinner height={40} />
      <p class="center">Checking for updates...</p>
    </div>
  {:else}
    <div>
      <img src={icon} alt="ArcOS" class="logo" />
      <h1 class="center-header">Update available</h1>
      <p class="center">ArcOS version {release.join(".")} is available.</p>
      <button on:click={update}>Download</button>
      <button class="centered flat" on:click={skip}>
        Continue with {ArcOSVersion}
      </button>
    </div>
  {/if}
</div>
