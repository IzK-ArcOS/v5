<script lang="ts">
  import "../../css/desktop/apps/bugreports.css";
  import type { BugReportsRuntime } from "../../ts/applogic/apps/BugReports/runtime";
  import Content from "./BugReports/Content.svelte";
  import SideBar from "./BugReports/SideBar.svelte";

  export let runtime: BugReportsRuntime;
</script>

<SideBar {runtime} />
<Content {runtime} />
