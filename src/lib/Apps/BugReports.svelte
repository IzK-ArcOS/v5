<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/bugreports.css";
  import type { BugReportsRuntime } from "../../ts/applogic/apps/BugReports/runtime";
  import type { App } from "../../ts/applogic/interface";
  import SideBar from "./BugReports/SideBar.svelte";
  import Content from "./BugReports/Content.svelte";

  export let runtime: BugReportsRuntime;
  export let app: App;
</script>

<SideBar {runtime} />
<Content {runtime} />
