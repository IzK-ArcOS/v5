<script lang="ts">
  import { LogStore } from "../../ts/console";
  import { compileStringLog } from "../../ts/console/collector";
  import { removeApiSensitive } from "../../ts/reporting/obfuscate";
  import { CrashReport } from "../../ts/reporting/window";

  const prefix = `---! [ ArcOS crashed ] !---\n\nBelow you'll find the log, which may contain information about the crash.\nA bug report has been sent to the Reports server informing it of the crash.\n\n`;

  let log = "";

  LogStore.subscribe(() => {
    const Log = `\n--- LOG ---\n\n${compileStringLog().join("\n")}`;
    const crashRep = $CrashReport;
    const reportStr = crashRep ? `${crashRep.title}\n\n${crashRep.body}\n` : "";

    log = `${prefix}${reportStr}${Log}`;
  });
</script>

<textarea readonly bind:value={log} />

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
  }
</style>
