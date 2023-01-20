// A DidYouKnow item.
export interface Tip {
  icon: string;
  title: string;
  content: string;
  trigger: (t: Tip) => void;
}
