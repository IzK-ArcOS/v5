export interface HelpCenterArticle {
  title: string;
  authors: string[];
  content: any;
  parentId?: string;
  sep?: boolean;
  seeAlso: string[];
}

export type HelpCenterStore = { [key: string]: HelpCenterArticle };
