<script lang="ts">
  import { onMount } from "svelte";
  import type { GitHubIssue } from "../../../../ts/reporting/interfaces/github";
  import Spinner from "../../../Spinner.svelte";
  import { getReportIssue } from "../../../../ts/reporting/issues";
  import type { Report } from "../../../../ts/reporting/interface";

  export let id: string;
  export let report: Report;

  let issue: GitHubIssue;
  let loading = false;

  onMount(update);

  async function update() {
    loading = true;

    const i = await getReportIssue(id);

    issue = i;

    loading = false;
  }

  function openIssue() {
    window.open(issue.html_url, "_blank");
  }
</script>

<div class="issue-detail">
  <h1>GitHub Issue</h1>
  {#if loading}
    <div class="loading">
      <Spinner height={30} />
      <p>Searching...</p>
    </div>
  {:else if issue}
    <p class="context">
      Good news! Team member {issue.user.login} created a<br />
      GitHub issue referencing your report.
    </p>
    <p class="ref">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={openIssue}>Issue #{issue.number}</a> (References
      <b>{report.issueid}</b>)
    </p>
  {:else}
    <p class="context none">No GitHub issue has referenced your report yet.</p>
  {/if}
</div>
