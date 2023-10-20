<script lang="ts">
  import { onMount } from "svelte";
  import { LockIcon } from "../../../../../../ts/icon/power";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";
  import { hideOverlay } from "../../../../../../ts/window/overlay";
  let valid = false;
  let url: string;

  function load() {
    $UserData.acc.loginBackground = url;

    cancel();
  }

  onMount(() => {
    if (
      $UserData.acc.loginBackground &&
      $UserData.acc.loginBackground.startsWith("http")
    ) {
      url = $UserData.acc.loginBackground;
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
      v.acc.loginBackground &&
      typeof v.acc.loginBackground == "string" &&
      v.acc.loginBackground.startsWith("http")
    )
      url = v.acc.loginBackground as string;

    check();
  });
</script>

<div class="customwallpaper-wrapper">
  <div><img src={LockIcon} alt="" /></div>
  <div class="field">
    <p>Enter the URL to a custom login wallpaper:</p>
    <input
      type="url"
      placeholder="https://example.com/image.png"
      bind:value={url}
      on:input={check}
    />
    <div class="apply">
      <div>
        <button on:click={cancel}>Cancel</button>
        <button on:click={load} disabled={!url || !valid} class="suggested">
          Apply
        </button>
      </div>
    </div>
  </div>
</div>
