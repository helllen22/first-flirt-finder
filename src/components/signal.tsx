import { Link, useRouterState } from "@tanstack/react-router";

export const MEN = ["M01", "M02", "M03", "M04", "M05"];
export const WOMEN = ["W01", "W02", "W03", "W04", "W05"];

/** Decorative QR-like block. Not a real, scannable code. */
export function FakeQR({ size = 168 }: { size?: number }) {
  const cells = 21;
  const bits: boolean[] = [];
  for (let i = 0; i < cells * cells; i++) {
    const x = i % cells;
    const y = Math.floor(i / cells);
    bits.push(((x * 7 + y * 13 + ((x * y) % 5)) % 3) % 2 === 0);
  }
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x > cells - 8 && y < 7) || (x < 7 && y > cells - 8);

  return (
    <div
      className="rounded-2xl bg-card p-3"
      style={{ boxShadow: "var(--shadow-card)" }}
      aria-hidden="true"
    >
      <div
        className="grid"
        style={{
          width: size,
          height: size,
          gridTemplateColumns: `repeat(${cells}, 1fr)`,
        }}
      >
        {bits.map((on, i) => {
          const x = i % cells;
          const y = Math.floor(i / cells);
          const isFinder = finder(x, y);
          const ring =
            isFinder &&
            (x % 7 === 0 || x % 7 === 6 || y % 7 === 0 || y % 7 === 6 || (x % 7 >= 2 && x % 7 <= 4 && y % 7 >= 2 && y % 7 <= 4));
          const filled = isFinder ? ring : on;
          return (
            <span
              key={i}
              style={{ backgroundColor: filled ? "var(--deep)" : "transparent" }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Petal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2c2.2 3.1 3.3 5.6 3.3 7.6 0 2.3-1.5 3.9-3.3 5.6-1.8-1.7-3.3-3.3-3.3-5.6C8.7 7.6 9.8 5.1 12 2z" />
      <path d="M12 22c-2.2-3.1-3.3-5.6-3.3-7.6 0-.5.1-1 .2-1.4 1.1 1 2.2 2 3.1 3 .9-1 2-2 3.1-3 .1.4.2.9.2 1.4 0 2-1.1 4.5-3.3 7.6z" />
    </svg>
  );
}

const links = [
  { to: "/", label: "빔 · 투표 안내" },
  { to: "/vote", label: "첫인상 투표" },
  { to: "/teams", label: "빔 · 팀 발표" },
  { to: "/final", label: "최종 선택" },
  { to: "/result", label: "개인 결과" },
] as const;

export function ScreenNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 flex w-[min(96vw,44rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card/90 px-2 py-2 backdrop-blur">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className={
            "rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors " +
            (pathname === l.to
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary")
          }
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
