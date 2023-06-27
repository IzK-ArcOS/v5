import { currentArticle, helpCenterArticles } from "../../helpcenter/store";
import type { SearchItem } from "../interface";
import helpCenterIcon from "../../../assets/apps/helpcenter.svg";
import { openWindow } from "../../applogic/events";

export function compileSearchableHelpArticles(): SearchItem[] {
  const result: SearchItem[] = [];
  const entries = Object.entries(helpCenterArticles);

  for (let i = 0; i < entries.length; i++) {
    result.push({
      image: helpCenterIcon,
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
