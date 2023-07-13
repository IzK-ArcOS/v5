<script lang="ts">
  import { Logo } from "../../ts/branding";
  import Selector from "./ServerSelect/Selector.svelte";

  import "../../css/serverselect.css";
</script>

<div class="serverselect">
  <div class="ss-inner">
    <img src={Logo()} alt="" class="logo" />
    <Selector />
  </div>
</div>
