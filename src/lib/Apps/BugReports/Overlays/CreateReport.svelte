<script lang="ts">
  import "../../../../css/desktop/apps/bugreports/overlays/createreport.css";
  import type { BugReportsRuntime } from "../../../../ts/applogic/apps/BugReports/runtime";
  import { ARCOS_MODE } from "../../../../ts/branding";
  import { DESKTOP_MODE } from "../../../../ts/desktop/app";
  import { ArcOSVersion } from "../../../../ts/env/main";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import type { ReportOptions } from "../../../../ts/reporting/interface";
  import { sendReport } from "../../../../ts/reporting/main";
  import { hideOverlay } from "../../../../ts/window/overlay";
  import DataPrivacy from "./CreateReport/DataPrivacy.svelte";

  export let runtime: BugReportsRuntime;

  const defaultOptions: ReportOptions = {
    title: "",
    body: "",
    includeApi: true,
    includeUserData: false,
  };

  let locked = false;

  let Options: ReportOptions = { ...defaultOptions };

  async function create() {
    locked = true;

    const id = await sendReport(Options);

    runtime.refreshStore();

    createOverlayableError(
      {
        title: "Report Sent",
        message: `Thank you! Report ${id} has been sent to the Reports server. Keep in mind that an issue may be created on GitHub referencing your report by an ArcOS team member.`,
        buttons: [{ caption: "Understood", action() {} }],
      },
      "BugReports"
    );

    hide();
  }

  function hide() {
    Options = { ...defaultOptions };
    locked = false;
    hideOverlay("createReport", "BugReports");
  }

  function info() {
    locked = true;
    createOverlayableError(
      {
        title: "Please keep in mind",
        component: DataPrivacy,
        buttons: [
          {
            caption: "I agree",
            action() {
              locked = false;
            },
          },
          { caption: "Decline", action: hide },
        ],
      },
      "BugReports"
    );
  }
</script>

<div class="overlay-head">
  <h2 class="header">Create Bug Report</h2>
  <p class="subheader">
    You're submitting a bug report for ArcOS {ArcOSVersion}.
  </p>
</div>
<div class="form">
  <input
    bind:value={Options.title}
    type="text"
    class="title"
    placeholder="Report Title"
  />
  <textarea
    bind:value={Options.body}
    class="body"
    placeholder="Report Body: Provide any particular information about the bug here."
  />
</div>
<div class="choices">
  <div class="choice">
    <p class="caption">Include preferences</p>
    <input
      type="checkbox"
      disabled={locked}
      bind:checked={Options.includeUserData}
    />
  </div>
  <div class="choice">
    <p class="caption">Include ArcAPI</p>
    <input
      type="checkbox"
      disabled={locked}
      bind:checked={Options.includeApi}
    />
  </div>
</div>
<div class="bottom">
  <div class="left">ArcOS {ArcOSVersion}-{ARCOS_MODE} - {DESKTOP_MODE}</div>
  <button on:click={info}>Data Privacy</button>
  <button disabled={locked} on:click={hide}>Cancel</button>
  <button disabled={!Options.title || locked} on:click={create}
    >Send Report</button
  >
</div>
