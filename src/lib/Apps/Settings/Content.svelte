<script lang="ts">
  import { currentSettingsPage } from "../../../ts/applogic/apps/SettingsApp/main";
  import { UserData } from "../../../ts/userlogic/interfaces";

  let cName = "";

  let settingsPage;

  currentSettingsPage.subscribe((v) => {
    if ($UserData && !$UserData.sh.anim && v) return (settingsPage = v);
    if (!v || (settingsPage && v.name == settingsPage.name)) return;

    cName = "slide-out-right";

    setTimeout(() => {
      settingsPage = v;

      cName = "slide-in-left";
    }, 500);
  });
</script>

<div class="content">
  <div class="inner {cName}">
    {#if settingsPage}
      <svelte:component this={settingsPage.content} />
    {/if}
  </div>
</div>
