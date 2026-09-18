import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Link, useRouterState } from "@tanstack/react-router";

export const MEN = ["남1", "남2", "남3", "남4", "남5", "남6"];
export const WOMEN = ["여1", "여2", "여3", "여4", "여5", "여6"];
export const ALL = [...MEN, ...WOMEN];

/** Real, scannable QR code pointing at a path of the current origin. */
export function VoteQR({ size = 168, path = "/vote" }: { size?: number; path?: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  return (
    <div
      className="flex items-center justify-center rounded-2xl bg-card p-3"
      style={{ boxShadow: "var(--shadow-card)", width: size + 24, height: size + 24 }}
    >
      {url ? (
        <QRCode value={url} size={size} fgColor="#3d2b2f" bgColor="transparent" />
      ) : (
        <div style={{ width: size, height: size }} aria-hidden="true" />
      )}
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
  { to: "/vote", label: "첫인상 선택" },
  { to: "/teams", label: "빔 · 팀 발표" },
  { to: "/final", label: "최종 선택" },
  { to: "/result", label: "개인 결과" },
  { to: "/admin", label: "운영진" },
] as const;

export function ScreenNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 flex w-[min(96vw,48rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card/90 px-2 py-2 backdrop-blur">
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
