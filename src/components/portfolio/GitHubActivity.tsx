import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import { ArrowUpRight, GitFork, Github, Star } from "lucide-react";
import type { CSSProperties } from "react";
import { links } from "../../data/portfolio";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

async function fetchRepos(): Promise<Repo[]> {
  const response = await fetch(
    `https://api.github.com/users/${links.githubUser}/repos?sort=pushed&per_page=30`,
    {
      headers: { Accept: "application/vnd.github+json" },
    },
  );
  if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
  const repos = (await response.json()) as Repo[];
  return repos.filter((repo) => !repo.fork && !repo.archived).slice(0, 6);
}

export function GitHubActivity() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["github-repos", links.githubUser],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  return (
    <div className="github-block">
      <div className="github-head">
        <div>
          <span className="mono-muted">// live from github.com/{links.githubUser}</span>
          <h3>Latest on GitHub</h3>
        </div>
        <a
          className="button-base button-outline"
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={17} /> Follow @{links.githubUser}
        </a>
      </div>

      {isPending && (
        <div className="repo-grid" aria-busy="true" aria-label="Loading repositories">
          {[0, 1, 2].map((key) => (
            <div className="repo-card repo-skeleton" key={key} />
          ))}
        </div>
      )}

      {(isError || (data && data.length === 0)) && (
        <p className="repo-fallback">
          Repositories couldn't be loaded right now,{" "}
          <a className="text-link" href={links.github} target="_blank" rel="noopener noreferrer">
            browse them on GitHub <ArrowUpRight size={14} />
          </a>
        </p>
      )}

      {data && data.length > 0 && (
        <ul className="repo-grid">
          {data.map((repo, index) => (
            <li key={repo.id} className="stagger" style={{ "--i": index } as CSSProperties}>
              <a
                className="repo-card"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="repo-name">
                  {repo.name} <ArrowUpRight size={14} />
                </span>
                <span className="repo-desc">{repo.description ?? "No description yet."}</span>
                <span className="repo-meta">
                  {repo.language && (
                    <span>
                      <i className="lang-dot" />
                      {repo.language}
                    </span>
                  )}
                  <span>
                    <Star size={13} /> {repo.stargazers_count}
                  </span>
                  {repo.forks_count > 0 && (
                    <span>
                      <GitFork size={13} /> {repo.forks_count}
                    </span>
                  )}
                  <span>
                    {formatDistanceToNowStrict(new Date(repo.pushed_at), { addSuffix: true })}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
