<script lang="ts">
  import "../css/bugrep.css";
  import { maxZIndex } from "../ts/applogic/store";
  import { Logo } from "../ts/branding";
  import { BugReportData } from "../ts/bugrep";
  import type { BugReport } from "../ts/bugrep/interface";

  let show: boolean = false;
  let data: BugReport;

  function buttonEvent() {
    data.button.action();

    BugReportData.set([false, null]);
  }

  BugReportData.subscribe((v) => {
    if (v) {
      show = v[0];
      data = v[1];
    }
  });
</script>

{#if show}
  <div class="bugrep fullscreen" class:show style="z-index: {$maxZIndex * 10};">
    <div class="content">
      <div>
        <img class="logo" src={Logo()} alt="ArcOS" />
        <h3>
          <span class="material-icons-round">{data.icon}</span>{data.title}
        </h3>
        <p>{@html data.message}</p>
      </div>
    </div>
    {#if data.button}
      <button on:click={buttonEvent}>{data.button.caption}</button>
    {/if}
    <div class="details">
      {#if data.details}
        <p>
          <span class="title">Source : </span>
          {data.source || "<anonymous>"}
        </p>
        <p>
          <span class="title">Details: </span>
          <code>{data.details || "<anonymous>"}</code>
        </p>
      {/if}
    </div>
  </div>
{/if}
