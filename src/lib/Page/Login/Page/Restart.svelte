<script lang="ts">
  import "../../../../css/login/userlogin.css";
  import Loading from "./Content/Loading.svelte";

  setTimeout(() => {
    location.reload();
  }, 2000);
</script>

<Loading caption="Restarting" />
