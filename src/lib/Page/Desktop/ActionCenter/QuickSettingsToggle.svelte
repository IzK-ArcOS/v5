<script>
  import { UserData } from "$$ts/userlogic/interfaces";

  function toggleQuicks() {
    $UserData.sh.noQuickSettings = !$UserData.sh.noQuickSettings;
  }
</script>

<div class="quicksettings-toggle">
  <button class="toggle" on:click={toggleQuicks}>
    {$UserData.sh.noQuickSettings ? "Expand" : "Collapse"}
  </button>
</div>
