<script lang="ts">
  import "../../css/desktop/apps/SettingsApp.css";
  import type { App } from "../../ts/applogic/interface";
  import type { ScopedAppData } from "../../ts/userlogic/interfaces";
  import Content from "./Settings/Content.svelte";
  import Sidebar from "./Settings/Sidebar.svelte";

  export let appdata: ScopedAppData;
  export let app: App;
</script>

<Sidebar bind:appdata {app} />
<Content {appdata} />
