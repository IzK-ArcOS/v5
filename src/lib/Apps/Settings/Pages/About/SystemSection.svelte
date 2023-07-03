<script lang="ts">
  import { onMount } from "svelte";
  import type { DeviceInfo } from "../../../../../ts/device/interface";
  import Section from "../../Section.svelte";
  import { getDeviceInfo } from "../../../../../ts/device/main";
  import { formatBytes } from "../../../../../ts/api/fs/sizes";
  import { inTauri } from "../../../../../ts/tauri";
  import { createOverlayableError } from "../../../../../ts/errorlogic/overlay";
  import type { Process } from "../../../../../ts/applogic/interface";

  let deviceInfo: DeviceInfo;
  let isTauri = false;
  export let process: Process;

  onMount(async () => {
    deviceInfo = await getDeviceInfo();
    isTauri = await inTauri();
  });

  function ramInfo() {
    createOverlayableError(
      {
        title: "Information about system memory",
        message:
          "The memory amount visible to ArcOS may be less than you actually have. This is not a bug, but rather a limitation of the browser you are running. Most browsers can only detect up to 8GB of RAM.",
        buttons: [{ caption: "Understood", action() {} }],
      },
      process.id
    );
  }
</script>

{#if deviceInfo}
  <Section header="Your System" collapsible>
    <div class="row">
      <div class="key">Processor</div>
      <div class="value">{deviceInfo.cpu.cores} cores</div>
    </div>
    <div class="row">
      <div class="key">Memory</div>
      <div class="value">
        ~ {formatBytes(deviceInfo.mem.kb)}
        <button class="material-icons-round info" on:click={ramInfo}
          >help</button
        >
      </div>
    </div>
    <div class="row">
      <div class="key">Graphics card</div>
      <div class="value">{deviceInfo.gpu.vendor} {deviceInfo.gpu.model}</div>
    </div>
    <div class="row">
      <div class="key">ArcOS Mode</div>
      <div class="value">{isTauri ? "Desktop app" : "Browser"}</div>
    </div>
  </Section>
{/if}
