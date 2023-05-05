export interface HelpCenterArticle {
  title: string;
  authors: string[];
  content: any;
  parentId?: string;
}

export type HelpCenterStore = { [key: string]: HelpCenterArticle };
