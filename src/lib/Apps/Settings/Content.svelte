<script lang="ts">
  import { currentSettingsPage } from "../../../ts/applogic/apps/SettingsApp/main";
  import type { Process } from "../../../ts/applogic/interface";
  import { ScopedAppData, UserData } from "../../../ts/userlogic/interfaces";

  export let appdata: ScopedAppData;
  export let process: Process;

  let className = "";
  let settingsPage;
  let cname;

  currentSettingsPage.subscribe((v) => {
    clearTimeout(cname);

    className = "static";

    if ($UserData && !$UserData.sh.anim && v) return (settingsPage = v);
    if (!v || (settingsPage && v.name == settingsPage.name)) return;

    className = "slide-out-right";

    cname = setTimeout(() => {
      settingsPage = v;

      className = "slide-in-left";

      cname = setTimeout(() => {
        className = "static";
      }, 301);
    }, 500);
  });
</script>

<div class="content" class:collapsed={appdata.collapsed}>
  <div class="inner {className}">
    {#if settingsPage}
      <svelte:component this={settingsPage.content} {process} />
    {/if}
  </div>
</div>
