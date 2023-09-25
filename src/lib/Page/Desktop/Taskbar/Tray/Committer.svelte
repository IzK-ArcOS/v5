<script lang="ts">
  import { UploadIcon } from "../../../../../ts/icon/general";
  import { committingUserData } from "../../../../../ts/userlogic/main";
</script>

<button class="icon committer" class:inactive={!$committingUserData}>
  <img src={UploadIcon} alt="Committing" />
</button>
