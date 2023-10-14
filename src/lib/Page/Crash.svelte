<script lang="ts">
  import { LogStore } from "../../ts/console";
  import { compileStringLog } from "../../ts/console/collector";
  import { removeApiSensitive } from "../../ts/reporting/obfuscate";
  import { CrashReport } from "../../ts/reporting/crash";
  import { onMount } from "svelte";
  import sleep from "../../ts/sleep";

  let show = false;

  const prefix = `---! [ ArcOS crashed ] !---\n\nBelow you'll find the log, which may contain information about the crash.\nA bug report has been sent to the Reports server informing it of the crash.\n\n`;

  let log = "";

  onMount(async () => {
    await sleep(1000);
    show = true;
  });

  LogStore.subscribe(() => {
    const Log = `\n--- LOG ---\n\n${compileStringLog().join("\n")}`;
    const crashRep = $CrashReport;
    const reportStr = crashRep ? `${crashRep.title}\n\n${crashRep.body}\n` : "";
    const extra = import.meta.env.DEV
      ? "WARNING: ArcOS in Vite Development will not send Bug Reports to prevent spamming of servers.\n\n"
      : "";

    log = `${prefix}${extra}${reportStr}${Log}`;
  });
</script>

{#if show}
  <textarea readonly bind:value={log} />
{/if}

<style scoped>
  textarea {
    border: none;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #000;
    color: #fff;
    font-family: "Source Code Pro", monospace;
    font-size: 13px;
    resize: none !important;
    overflow-x: hidden;
  }
</style>
