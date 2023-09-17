<script lang="ts">
  import upload from "../../../../../assets/upload.svg";
  import { committingUserData } from "../../../../../ts/userlogic/main";
</script>

<button class="icon committer" class:inactive={!$committingUserData}>
  <img src={upload} alt="Committing" />
</button>
