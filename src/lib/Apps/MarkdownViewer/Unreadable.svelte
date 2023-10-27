<script lang="ts">
  import { ErrorIcon } from "../../../ts/icon/apps";
</script>

<div class="unreadable">
  <div class="content">
    <img src={ErrorIcon} alt="Error" />
    <h3>Render failed</h3>
    <p>
      The markdown content could not be parsed. The opened file may be empty.
    </p>
  </div>
</div>
