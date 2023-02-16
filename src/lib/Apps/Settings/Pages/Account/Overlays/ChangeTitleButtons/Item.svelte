<script lang="ts">
  import { UserData } from "../../../../../../../ts/userlogic/interfaces";
  import type { WindowControls } from "../../../../../../../ts/window/titlebar/interface";
  import { DummyApp } from "../../../../../../../ts/window/titlebar/store";

  export let data: WindowControls;
  export let id: string;

  function apply() {
    $UserData.sh.window.buttons = id;
  }
</script>

<div class="item">
  <div class="preview">
    <div class="tb">
      <svelte:component this={data.content} app={DummyApp} />
    </div>
  </div>
  <div class="details">
    <p class="title">{data.caption}</p>
    <p class="author">By: {data.author}</p>
  </div>
  <button
    class="apply"
    disabled={$UserData.sh.window.buttons == id}
    on:click={apply}
  >
    {$UserData.sh.window.buttons == id ? "Applied" : "Apply"}
  </button>
</div>
