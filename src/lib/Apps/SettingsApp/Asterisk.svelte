<div class="asterisk">
  <span><slot /></span>
</div>

<style scoped>
  .asterisk {
    display: flex;
    align-items: top;
    gap: 5px;
    font-style: italic;
    margin: 5px auto !important;
    max-width: 610px;
  }

  .asterisk span {
    max-width: calc(100% - 20px);
    word-wrap: break-word;
    width: calc(100% - 20px);
    display: block;
    text-wrap: pretty;
  }

  .asterisk::before {
    content: "*";
    color: var(--clr-red-fg);
    font-family: "Source Code Pro", monospace;
    font-weight: bold;
    font-style: normal;
  }
</style>
