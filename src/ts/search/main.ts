import Fuse from "fuse.js";
import { writable } from "svelte/store";
import { getSearchItems } from "./store";

export const showArcFind = writable<boolean>(false);

export async function Search(query: string) {
  const items = await getSearchItems();

  const options = {
    includeScore: true,
    keys: ["caption", "description"],
  };

  const fuse = new Fuse(items, options);
  const result = fuse.search(query);

  return result;
}
