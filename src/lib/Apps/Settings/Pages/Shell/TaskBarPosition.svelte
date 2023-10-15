<script lang="ts">
  import { UserData as U } from "../../../../../ts/userlogic/interfaces";
  export let disabled = false;

  const options = {
    vertical: "left",
    "": "bottom",
    "vertical-right": "right",
    top: "top",
  };
</script>

{#if $U}
  <div class="taskbarpos">
    {#each Object.entries(options) as opt}
      <button
        class="pos {opt[1]} material-icons-round"
        on:click={() => ($U.sh.taskbar.pos = opt[0])}
        class:selected={$U.sh.taskbar.pos == opt[0]}
        {disabled}
      >
        vertical_align_bottom
      </button>
    {/each}
  </div>
{/if}

<style scoped>
  div.taskbarpos {
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    border-radius: 5px;
  }

  div.taskbarpos button {
    width: 30px !important;
    height: 30px !important;
    padding: 0 !important;
    margin: 0 !important;
    border-radius: 0 !important;
  }

  div.taskbarpos button:disabled {
    opacity: 0.7;
  }

  div.taskbarpos button.selected {
    background-color: var(--accent-light);
    color: var(--accent-dark);
  }

  div.taskbarpos button.left {
    transform: rotate(90deg);
  }
  div.taskbarpos button.right {
    transform: rotate(-90deg);
  }
  div.taskbarpos button.top {
    transform: rotate(180deg);
  }
</style>
