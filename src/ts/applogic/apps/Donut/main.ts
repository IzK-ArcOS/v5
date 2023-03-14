import { writable } from "svelte/store";

let A: number = 1;
let B: number = 1;

export function tick() {
  const b = [];
  const z = [];
  A += 0.07;
  B += 0.03;
  let cA = Math.cos(A),
    sA = Math.sin(A),
    cB = Math.cos(B),
    sB = Math.sin(B);
  for (let k = 0; k < 1760; k++) {
    b[k] = k % 80 == 79 ? "\n" : " ";
    z[k] = 0;
  }
  for (let j = 0; j < 6.28; j += 0.07) {
    let ct = Math.cos(j),
      st = Math.sin(j);
    for (let i = 0; i < 6.28; i += 0.02) {
      let sp = Math.sin(i),
        cp = Math.cos(i),
        h = ct + 2,
        D = 1 / (sp * h * sA + st * cA + 5),
        t = sp * h * cA - st * sA;

      let x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
        y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
        o = x + 80 * y,
        N =
          0 |
          (8 *
            ((st * sA - sp * ct * cA) * cB -
              sp * ct * sA -
              st * cA -
              cp * ct * sB));
      if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
        z[o] = D;
        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
      }

      const debug = {
        o,
        A,
        B,
        N,
        st,
        sA,
        sp,
        ct,
        cA,
        cB,
        cp,
        sB,
        D,
        t,
        h,
        i,
        j,
      };

      donutDebugInformation.set(debug);
    }
  }

  return b.join("");
}

export const donutDebugInformation = writable<{
  o: number;
  A: number;
  B: number;
  N: number;
  st: number;
  sA: number;
  sp: number;
  ct: number;
  cA: number;
  cB: number;
  cp: number;
  sB: number;
  D: number;
  t: number;
  h: number;
  i: number;
  j: number;
}>();
