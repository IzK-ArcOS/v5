<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../../../css/desktop/apps/settings/account/customWallpaper.css";
  import { DesktopIcon } from "../../../../../../ts/icon/main";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";
  import { hideOverlay } from "../../../../../../ts/window/overlay";
  let valid = false;
  let url: string;

  function load() {
    $UserData.sh.desktop.wallpaper = url;

    cancel();
  }

  onMount(() => {
    if ($UserData.sh.desktop.wallpaper.startsWith("http")) {
      url = $UserData.sh.desktop.wallpaper;
    }
  });

  async function check() {
    const v = await checkImage(url);

    valid = v;
  }

  function cancel() {
    hideOverlay("customWallpaper", "SettingsApp");
  }

  async function checkImage(url): Promise<boolean> {
    if (!url) return;

    const img = new Image();

    img.src = url;

    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

  UserData.subscribe((v) => {
    if (
      typeof v.sh.desktop.wallpaper == "string" &&
      v.sh.desktop.wallpaper.startsWith("http")
    )
      url = v.sh.desktop.wallpaper as string;

    check();
  });
</script>

<div class="customwallpaper-wrapper">
  <div><img src={DesktopIcon} alt="" /></div>
  <div class="field">
    <p>Enter the URL to a custom wallpaper:</p>
    <input
      type="url"
      placeholder="https://example.com/image.png"
      bind:value={url}
      on:input={check}
    />
    <div class="apply">
      <div>
        <button on:click={cancel}>Cancel</button>
        <button on:click={load} disabled={!url || !valid}>Apply</button>
      </div>
    </div>
  </div>
</div>
