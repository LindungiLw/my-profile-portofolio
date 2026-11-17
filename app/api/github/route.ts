// app/api/github/route.ts
import { NextResponse } from "next/server";

interface GitHubRepoNode {
  stargazerCount: number;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      repositories: {
        totalCount: number;
        nodes: GitHubRepoNode[];
      };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    return NextResponse.json(
      { error: "GitHub credentials are not configured" },
      { status: 500 },
    );
  }

  const query = `
    query($userName: String!) {
      user(login: $userName) {
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
          nodes {
            stargazerCount
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { userName: GITHUB_USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL responded with ${response.status}`);
    }

    const json = (await response.json()) as GitHubGraphQLResponse;

    if (json.errors?.length || !json.data?.user) {
      throw new Error(json.errors?.[0]?.message || "GitHub user not found");
    }

    const user = json.data.user;
    const totalRepos = user.repositories.totalCount || 0;
    const totalStars = user.repositories.nodes.reduce(
      (acc, repo) => acc + (repo.stargazerCount || 0),
      0,
    );

    const calendar = user.contributionsCollection.contributionCalendar;
    const totalContributions = calendar.totalContributions || 0;

    // Aggregate actual contributions per YYYY-MM from GitHub calendar weeks
    const monthlyTotals = new Map<string, number>();
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        const monthKey = day.date.slice(0, 7); // YYYY-MM
        monthlyTotals.set(
          monthKey,
          (monthlyTotals.get(monthKey) ?? 0) + day.contributionCount,
        );
      }
    }

    const now = new Date();
    let runningTotal = 0;
    const graphData = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      runningTotal += monthlyTotals.get(yearMonth) ?? 0;

      graphData.push({
        name: MONTH_NAMES[d.getMonth()],
        val: runningTotal,
      });
    }

    return NextResponse.json({
      repos: totalRepos,
      stars: totalStars,
      totalCommits: totalContributions,
      graphData,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub statistics" },
      { status: 500 },
    );
  }
}
