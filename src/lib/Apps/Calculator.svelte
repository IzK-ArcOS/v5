<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/calculator.css";
  import {
    CalculatorClass,
    CalculatorValue,
  } from "../../ts/applogic/apps/Calculator/main";
  import { CalculatorStore } from "../../ts/applogic/apps/Calculator/store";
  import { Log } from "../../ts/console";
  import { LogLevel } from "../../ts/console/interface";

  let value = "";

  onMount(() => {
    CalculatorValue.subscribe((v) => {
      Log({
        source: "Calculator: CalculatorValue.subscribe",
        msg: `Value of CalculatorValue<string> changed to "${$CalculatorValue}"`,
        level: LogLevel.info,
      });

      value = v || "0";
    });
  });

  function clear() {
    CalculatorValue.set("");
  }
</script>

<input type="text" class="display" readonly {value} />
<div class="keys">
  {#each CalculatorClass.keys as key}
    {#if !key[0].startsWith("%%")}
      <button
        on:click={() => CalculatorClass.processKey(key[1])}
        class:empty={!key[0]}
        class:alt={CalculatorStore.altClasses.includes(key[1])}
      >
        {key[0]}
      </button>
    {:else}
      <button
        on:click={CalculatorClass.Functions[key[0]][1]}
        class={CalculatorClass.Functions[key[1]][2]}
      >
        {CalculatorClass.Functions[key[1]][0]}
      </button>
    {/if}
  {/each}
</div>
