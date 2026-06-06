type LeaderboardEntry = {
  rank: number;
  name: string;
  points: number;
};

export default function Page() {
  const leaderboard: LeaderboardEntry[] = [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 mt-10">
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img
            src="/Reactjs%20Maxxing.png"
            alt="reactjs maxxing"
            className="w-full h-56 object-cover sm:h-72 lg:h-80"
          />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="rounded-3xl border bg-card p-8 shadow-sm">
            <div className="mb-6 inline-flex rounded-full border px-3 py-1 text-sm text-muted-foreground">
              Web Security Challenge
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Next.js Middleware Bypass
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              A hands-on challenge based on a real Next.js middleware
              vulnerability. Your goal is to analyze the request flow,
              understand how middleware trust boundaries can fail, and bypass
              the protection guarding the hidden flag.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border p-5">
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="mt-2 text-lg font-medium">Medium</p>
              </div>
              <div className="rounded-2xl border p-5">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="mt-2 text-lg font-medium">Web Exploitation</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://nextmiddlewarectf.vercel.app/"
                className="inline-flex items-center rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Start Challenge
              </a>
              <a
                href="https://zhero-web-sec.github.io/research-and-things/nextjs-and-the-corrupt-middleware"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                Read Background
              </a>
            </div>
          </section>

          <aside className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-semibold">Leaderboard</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Top challengers this week
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {leaderboard.map((player: LeaderboardEntry) => (
                <div
                  key={player.rank}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium">
                      {player.rank}
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {player.points} pts
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {leaderboard.length === 0 && (
                <div className="rounded-2xl border border-dashed p-8 text-center">
                  <p className="font-medium">No solves yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Be the first to capture the flag.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
