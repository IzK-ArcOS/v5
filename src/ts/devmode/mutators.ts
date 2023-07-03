import { updateDevModeProps } from "./props";
import { dmTriggers } from "./store/triggers";

export function assignDevMutators() {
  for (let i = 0; i < dmTriggers.length; i++) {
    dmTriggers[i].subscribe(updateDevModeProps);
  }
}
