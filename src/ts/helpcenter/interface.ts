export interface HelpCenterArticle {
  title: string;
  authors: string[];
  content: any;
  parentId?: string;
  sep?: boolean;
}

export type HelpCenterStore = { [key: string]: HelpCenterArticle };
