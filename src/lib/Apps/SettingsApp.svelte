<script lang="ts">
  import "../../css/desktop/apps/SettingsApp.css";
  import type { App, Process } from "../../ts/applogic/interface";
  import type { ScopedAppData } from "../../ts/userlogic/interfaces";
  import Content from "./Settings/Content.svelte";
  import Sidebar from "./Settings/Sidebar.svelte";

  export let appdata: ScopedAppData;
  export let app: App;
  export let process: Process;
</script>

<Sidebar bind:appdata {app} {process} />
<Content {appdata} {process} />
