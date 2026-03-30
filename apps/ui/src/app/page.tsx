import { HealthResponseSchema } from "@repo/types";

const sampleContract = HealthResponseSchema.parse({
  status: "ok",
  timestamp: new Date("2026-03-30T00:00:00.000Z").toISOString(),
});

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="eyebrow">Gurudwara React Application</div>
        <article className="hero-card">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>Monorepo foundation, now with real apps.</h1>
              <p>
                Phase 2 scaffolds a deployable Next.js UI and an Express REST
                API on top of the shared workspace. Shared contracts live in
                <code> packages/types </code>
                and are already wired into both applications.
              </p>
            </div>

            <aside className="status-panel">
              <div className="status-badge">
                <span className="status-dot" />
                Shared health contract ready
              </div>

              <div className="info-card">
                <h2>Starter contract</h2>
                <p>
                  <code>{JSON.stringify(sampleContract, null, 2)}</code>
                </p>
              </div>

              <div className="info-card">
                <h2>Next step</h2>
                <p>
                  Add Prisma, PostgreSQL, and test layers on top of this scaffold
                  in the next phases.
                </p>
              </div>
            </aside>
          </div>

          <div className="stack-grid">
            <div className="stack-card">
              <h2>UI</h2>
              <p>Next.js App Router, React, TypeScript, and shared contracts.</p>
            </div>
            <div className="stack-card">
              <h2>API</h2>
              <p>
                Express REST app with a versioned health route at
                <code> /api/v1/health</code>.
              </p>
            </div>
            <div className="stack-card">
              <h2>Contracts</h2>
              <p>
                Hand-authored TypeScript and <code>zod</code> schemas shared
                across the monorepo.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

