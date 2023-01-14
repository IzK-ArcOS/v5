import { get } from "svelte/store";
import { dmMutators } from "./store/mutators";
import { dmProps } from "./store/props";

export function updateDevModeProps() {
  dmProps.set([]);

  let props = [];

  for (let i = 0; i < dmMutators.length; i++) {
    const data = [];

    const mutator = dmMutators[i];
    const Store = get(dmMutators[i].store);
    const fallback = mutator.fallback || "";
    const storeValue = mutator.value;
    const suffix = mutator.suffix || "";

    const value = Store
      ? `${storeValue ? Store[storeValue] : Store} ${suffix}`
      : `<${fallback}>`;

    data.push(mutator.caption, value);

    props.push(data);
  }

  dmProps.set(props);
}
