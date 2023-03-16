<script lang="ts">
  import { onMount } from "svelte";
  import { ConnectedServer } from "../../../../ts/api/main";
  import Loading from "./Content/Loading.svelte";
  import Cancel from "./NewApiUser/Cancel.svelte";
  import Form from "./NewApiUser/Form.svelte";

  let username = "";
  let password = "";
  let loading = false;
  let show = false;

  onMount(() => {
    setTimeout(() => {
      show = true;
    });
  });
</script>

<div class="userlogin newuser" class:show>
  {#if !loading}
    <Form bind:loading bind:username bind:password />
  {:else}
    <Loading caption="Welcome" />
  {/if}
</div>

{#if $ConnectedServer && !loading}
  <Cancel {show} />
{/if}
