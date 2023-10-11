<div class="asterisk"><slot /></div>

<style scoped>
  .asterisk {
    display: flex;
    align-items: top;
    gap: 5px;
    margin: 5px 0;
    font-style: italic;
  }

  .asterisk::before {
    content: "*";
    color: var(--clr-red-fg);
    font-family: "Source Code Pro", monospace;
    font-weight: bold;
    font-style: normal;
  }
</style>
