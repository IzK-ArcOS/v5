import { BugReportData } from "../bugrep";

export function BootFail(host: string) {
  BugReportData.set([
    true,
    {
      title: "Boot failed",
      icon: "warning",
      message:
        "ArcOS can't connect to the remote server. Please ensure<br>the server is online, or try again at a later date.",
      button: {
        caption: "Retry",
        action: () => location.reload(),
      },
      source: "Boot",
      details: `Can't connect to server ${host}: none of the modes match`,
    },
  ]);
}
