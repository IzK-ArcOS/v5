import { UserData } from "../userlogic/interfaces";
import { desktopClassNames } from "./main";

export function setDesktopClassNameListener() {
  UserData.subscribe((v) => {
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

      desktopClassNames.set(classes);
    }
  });
}
