{#if import.meta.env.DEV}
  <div class="devbar">Running in a development environment.</div>
{/if}

<style scoped>
  div.devbar {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 5px;
    background-color: #f00;
    overflow: hidden;
    line-height: 1px;
    color: transparent;
    text-align: center;
    font-weight: bold;
    opacity: 0.4;
  }

  div.devbar:hover {
    height: 35px;
    line-height: 35px;
    color: white;
    box-shadow: 0 0 8px #0008;
    opacity: 1;
    border-top: #f00a 2px solid;
  }

  div {
    z-index: 1000000000000000000000000000;
  }
</style>
