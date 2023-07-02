export interface BugReport {
  icon: string;
  title: string;
  message: string;
  details?: string;
  source?: string;
  button?: {
    action: () => void;
    caption: string;
  };
}
