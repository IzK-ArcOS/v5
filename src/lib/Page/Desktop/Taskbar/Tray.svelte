<script lang="ts">
  import ActionCenterbutton from "./Tray/ActionCenterbutton.svelte";
  import Clock from "./Tray/Clock.svelte";
  import Committer from "./Tray/Committer.svelte";
  import Icons from "./Tray/Icons.svelte";

  export let hasClock = true;
</script>

<div class="tray">
  <Icons />
  <Committer />
  <Clock {hasClock} />
  <ActionCenterbutton />
  <slot />
</div>
