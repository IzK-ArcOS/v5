<script lang="ts">
  import { onMount } from "svelte";
  import type { QlorbRuntime } from "../../../ts/applogic/apps/Qlorb/runtime";
  import type { App } from "../../../ts/applogic/interface";
  import { Logo } from "../../../ts/branding";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import Page from "../../Page/Desktop/WindowStore/Window/Page.svelte";

  export let runtime: QlorbRuntime;
  export let app: App;

  onMount(() => {
    runtime.CurrentPage.subscribe((v) => {
      if (v != "intro") return;

      if ($UserData.appdata.QlorbApp && $UserData.appdata.QlorbApp.introed)
        return runtime.switchPage("start");

      setTimeout(() => {
        if (!$UserData.appdata.QlorbApp) $UserData.appdata.QlorbApp = {};

        $UserData.appdata.QlorbApp.introed = true;

        runtime.switchPage("start");
      }, 17000);
    });
  });
</script>

<Page store={runtime.CurrentPage} name="intro">
  <div class="intro fullscreen">
    <div class="stage1">
      <h1>Created by IzKuipers</h1>
      <p>www.izkuipers.nl</p>
    </div>
    <div class="stage2">
      <h1>
        <img src={Logo()} alt="ArcOS" />
        <span>Written for ArcOS</span>
      </h1>
    </div>
    <div class="stage3">
      <img src={app.info.icon} alt="" class="logo" />
    </div>
  </div>
</Page>

<style scoped>
  .intro {
    width: 100%;
    height: 100%;
    background-color: #000;
  }

  .intro div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }

  .intro div.stage1 {
    animation: show 4s forwards 2s;
  }
  .intro div.stage2 {
    animation: show 4s forwards 7s;
  }
  .intro div.stage3 {
    animation: show 4s forwards 12s;
  }
  @keyframes show {
    0% {
      opacity: 0;
      visibility: hidden;
    }

    10%,
    90% {
      opacity: 1;
      visibility: visible;
    }

    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  h1 {
    display: flex;
    align-items: center;
  }

  img {
    height: 50px;
  }

  img.logo {
    height: 300px;
  }
</style>
