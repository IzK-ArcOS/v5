<script lang="ts">
  import dayjs from "dayjs";
  import { CurrentLoginState } from "../../../ts/login/main";
  import { onMount } from "svelte";

  let time: string = "";
  let show = false;

  onMount(() => {
    setInterval(() => (time = dayjs().format("HH:mm")), 500);
    setTimeout(() => (show = true), 750);
  });
</script>

{#if $CurrentLoginState}
  <div
    class="topbar"
    class:show={($CurrentLoginState.attribs.topbar || false) && show}
  >
    <div class="clock">
      {time}
    </div>
    <div class="right">
      <button class="nopad">
        <span class="material-icons">power_settings_new</span>
      </button>
      <button class="nopad">
        <span class="material-icons">restart_alt</span>
      </button>
    </div>
  </div>
{/if}
