<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../css/login/userlogin.css";
  import AuthForm from "./UserLogin/AuthForm.svelte";

  let name: string;
  let authenticating = false;
  let show = false;

  onMount(async () => {
    setTimeout(() => {
      show = true;
    }, 10);
  });
</script>

<div class="userlogin" class:show>
  <AuthForm bind:authenticating />
</div>
