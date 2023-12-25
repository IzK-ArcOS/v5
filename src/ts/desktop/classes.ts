import { UserData } from "../userlogic/interfaces";
import { experimentsClasses } from "./classes/experiments";
import { desktopClassNames } from "./main";

export function setDesktopClassNameListener() {
  UserData.subscribe(async (v) => {
    if (v) {
      const udata = v;

      let classes = "";

      if (udata.sh.taskbar.docked) classes += `tbdocked `;
      if (!udata.sh.anim) classes += `noani `;
      if (udata.sh.noGlass) classes += `noglass `;
      if (udata.sh.window.bigtb) classes += `bigtitlebars `;
      if (udata.sh.desktop.sharp) classes += `sharp `;
      if (udata.sh.taskbar.isLauncher) classes += `is-launcher `;
      if (udata.sh.taskbar.docked) classes += `tb-docked `;

      classes += await experimentsClasses();

      desktopClassNames.set(classes);
    }
  });
}
