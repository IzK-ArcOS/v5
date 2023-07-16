import type { GitHubIssue } from "./interfaces/github";

export async function getReportIssue(id: string): Promise<GitHubIssue> {
  const issues = (await (
    await fetch(
      "https://api.github.com/repos/IzK-ArcOS/ArcOS-Frontend/issues?per_page=100"
    )
  ).json()) as GitHubIssue[];

  if (!issues.length) return null;

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].title.includes(`br$${id}`)) return issues[i];
  }

  return null;
}
