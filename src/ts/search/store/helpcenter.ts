import { openWindow } from "../../applogic/events";
import { currentArticle, helpCenterArticles } from "../../helpcenter/store";
import { HelpCenterIcon } from "../../icon/apps";
import type { SearchItem } from "../interface";

export function compileSearchableHelpArticles(): SearchItem[] {
  const result: SearchItem[] = [];
  const entries = Object.entries(helpCenterArticles);

  for (let i = 0; i < entries.length; i++) {
    result.push({
      image: HelpCenterIcon,
      description: "Help Center",
      caption: entries[i][1].title,
      action: () => {
        openWindow("HelpCenter");

        currentArticle.set(entries[i][0]);
      },
    });
  }

  return result;
}
