<script>
  import { OpenedStore, WindowStore } from "../../../ts/applogic/store";
  import { ErrorWindowStore } from "../../../ts/errorlogic/app";
</script>

<div class="bottombar">
  <div class="right">
    <div class="section">
      Running: {$OpenedStore.length}
    </div>
    <div class="section">
      Loaded: {$WindowStore.length}
    </div>
    <div class="section">
      Dialogs: {$ErrorWindowStore.length}
    </div>
  </div>
</div>
