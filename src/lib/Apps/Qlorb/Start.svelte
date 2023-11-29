<script lang="ts">
  import type { QlorbRuntime } from "../../../ts/applogic/apps/Qlorb/runtime";
  import { closeWindow } from "../../../ts/applogic/events";
  import type { App } from "../../../ts/applogic/interface";
  import Page from "../../Page/Desktop/WindowStore/Window/Page.svelte";
  import Background from "./Main/Background.svelte";
  export let runtime: QlorbRuntime;
  export let app: App;

  function start() {
    runtime.switchPage("game");
  }
  function help() {
    runtime.switchPage("help");
  }

  function exit() {
    closeWindow("QlorbApp");
  }
</script>

<Page name="start" bind:store={runtime.CurrentPage}>
  <div class="start fullscreen">
    <Background />
    <div class="fullscreen center-flex">
      <h1 class="title">
        <img src={app.info.icon} alt="" />
        <span>Qlorb</span>
      </h1>
      <button class="option" on:click={start}>Start</button>
      <button class="option" on:click={help}>Help</button>
      <button class="option" on:click={exit}>Exit</button>
    </div>
  </div>
</Page>

<style scoped>
  .center-flex {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  h1.title {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .center-flex button.option {
    text-align: left;
    width: 200px;
    padding: 15px 20px;
    border: #fff1 3px solid;
    background-color: #fff1;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .center-flex button::after {
    content: "arrow_forward_ios";
    font-family: "Material Icons Round";
    font-size: 20px;
    margin-left: auto;
  }

  img {
    height: 50px;
  }
</style>
