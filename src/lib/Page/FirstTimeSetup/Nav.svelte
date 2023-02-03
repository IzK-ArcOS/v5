<script lang="ts">
  import { applyFTSState } from "$$ts/fts/main";
  import type { NavData } from "$$ts/fts/nav";

  export let data: NavData;

  function back() {
    applyFTSState(data.back.redir);
  }

  function forw() {
    applyFTSState(data.forw.redir);
  }
</script>

<div class="nav">
  <div>
    <button class="nopad" disabled={data.back.disabled} on:click={back}>
      <span class="material-icons-round">arrow_back_ios_new</span>
    </button>
  </div>
  <div class="alnr">
    <button class="nopad" disabled={data.forw.disabled} on:click={forw}>
      <span class="material-icons-round">arrow_forward_ios</span>
    </button>
  </div>
</div>
