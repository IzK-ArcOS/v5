import { get, writable } from "svelte/store";

class CL {
  allowedKeys = "0123456789*/+.".split("");

  value = writable<string>();

  public evaluate(input: string = get(this.value)): string | false {
    if (!this.isValid(input)) return false;

    return eval(input);
  }

  private isValid(input: string) {
    for (let i = 0; i < input.length; i++) {
      if (!this.allowedKeys.includes(input[i])) return false;
    }

    return true;
  }

  processKey(key:string) {
    
  }
}

export const CalculatorClass = new CL();
