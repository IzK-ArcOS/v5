<script lang="ts">
  import { onMount } from "svelte";
  import { getAppIcon } from "../../../../../../ts/applogic/icon";
  import type { App } from "../../../../../../ts/applogic/interface";
  import { WindowStore } from "../../../../../../ts/applogic/store";

  export let app: App;

  let caption = "%title";

  function update() {
    caption = `${app.info.name}${app.info.titleSuffix || ""}`;
  }

  onMount(update);
  WindowStore.subscribe(update);
</script>

<div class="centeredtitle">{caption}</div>
<p class="title">
  <img class="icon" src={getAppIcon(app)} alt={app.info.name} />
  <span>
    {caption}
  </span>
</p>
