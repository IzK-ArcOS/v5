<script lang="ts">
  import "../css/bugrep.css";
  import { BugReport, BugReportData } from "../ts/bugrep";

  let show: boolean = false;
  let className = "";
  let data: BugReport;

  function buttonEvent() {
    console.log("trigger on bugrep action button");
    data.button.action();

    BugReportData.set([false, null]);
  }

  BugReportData.subscribe((v) => {
    if (v) {
      show = v[0];
      data = v[1];

      setTimeout(() => {
        className = show ? "show" : "";
      }, 500);
    }
  });
</script>

{#if show}
  <div class="bugrep fullscreen {className}">
    <div class="center-absolute">
      <h3><span class="material-icons">{data.icon}</span>{data.title}</h3>
      <p>{@html data.message}</p>
      <p>
        You can help solve this bug by creating an issue
        <a href="https://www.github.com/TWI-ArcOS">on GitHub</a>.
        {#if data.details}
          <pre class="details">Technical details: {data.details}</pre>
        {/if}
      </p><br>
      {#if data.button}
        <button on:click={buttonEvent}>{data.button.caption}</button>
      {/if}
    </div>
  </div>
{/if}
