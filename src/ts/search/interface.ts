export interface SearchItem {
  caption: string;
  action: (item?: SearchItem) => void;
  icon?: string;
  image?: string;
  description?: string;
}

export type SearchProvider = () => Promise<SearchItem[]> | SearchItem[];
