const partialFilters = ["#", "](", "![", "!", ">", "|", "(", ")"];

export function filterPartial(partial: string) {
  let str = partial;

  for (let i = 0; i < partialFilters.length; i++) {
    str = str.split(partialFilters[i]).join("");
  }

  return str;
}
