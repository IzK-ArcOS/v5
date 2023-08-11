<script lang="ts">
  export let server: string;
  export let authCode: string;
  export let connect: () => any;
  export let connecting: boolean;
  export let connectionError: boolean;

  function noError() {
    connectionError = false;
  }

  function submit(e: SubmitEvent) {
    e.preventDefault();
    connect();
  }
</script>

{#if !connectionError}
  <form on:submit={submit} autocomplete="off">
    <input
      autocomplete="off"
      class="fullwidth centered"
      placeholder="Server name"
      bind:value={server}
    />
    <input
      autocomplete="new-password"
      type="password"
      class="fullwidth centered"
      placeholder="Server authentication code (optional)"
      bind:value={authCode}
    />
    <button
      type="submit"
      class="fullwidth option centered"
      disabled={!server || connecting}
      on:click={connect}
    >
      {#if !connecting}Connect to server{:else}Connecting...{/if}
    </button>
  </form>
{:else}
  <p class="fullwidth centered justified">
    ArcOS didn't hear anything when calling the server you provided, please
    check the info and try connecting again?
  </p>
  <button class="fullwidth option centered" on:click={noError}>
    Try Again
  </button>
{/if}
