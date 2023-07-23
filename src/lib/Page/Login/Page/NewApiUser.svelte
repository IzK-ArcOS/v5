<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "./Content/Loading.svelte";
  import Cancel from "./NewApiUser/Cancel.svelte";
  import Form from "./NewApiUser/Form.svelte";

  let username = "";
  let password = "";
  let loading = false;
  let show = false;
  let errored = false;

  onMount(() => {
    setTimeout(() => {
      show = true;
    });
  });
</script>

<div class="userlogin newuser" class:errored class:show class:loading>
  {#if !loading}
    {#if errored}
      <h1>Oh no</h1>
      <p>
        Sorry! Couldn't create your account... It may already exist. Please try
        again or contact your server administrator.
      </p>
    {:else}
      <Form bind:loading bind:username bind:password bind:errored />
    {/if}
  {:else}
    <Loading caption="Welcome" />
  {/if}

  {#if !loading}
    <Cancel {show} />
  {/if}
</div>
