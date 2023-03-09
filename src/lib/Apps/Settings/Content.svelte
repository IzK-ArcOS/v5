<script lang="ts">
  import { currentSettingsPage } from "../../../ts/applogic/apps/SettingsApp/main";
  import { ScopedAppData, UserData } from "../../../ts/userlogic/interfaces";

  export let appdata: ScopedAppData;

  let cName = "";

  let settingsPage;

  let t;

  currentSettingsPage.subscribe((v) => {
    clearTimeout(t);

    cName = "static";

    if ($UserData && !$UserData.sh.anim && v) return (settingsPage = v);
    if (!v || (settingsPage && v.name == settingsPage.name)) return;

    cName = "slide-out-right";

    t = setTimeout(() => {
      settingsPage = v;

      cName = "slide-in-left";

      t = setTimeout(() => {
        cName = "static";
      }, 301);
    }, 500);
  });
</script>

<div class="content" class:collapsed={appdata.collapsed}>
  <div class="inner {cName}">
    {#if settingsPage}
      <svelte:component this={settingsPage.content} />
    {/if}
  </div>
</div>
