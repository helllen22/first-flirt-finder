import { createFileRoute } from "@tanstack/react-router";
import { Petal } from "@/components/signal";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "PLAY 02 · TEAM REVEAL | 윷놀이 자만추 1기" },
      {
        name: "description",
        content: "2PLAY 팀 편성 발표용 빔 화면. 개인의 선택 내용은 공개하지 않습니다.",
      },
      { property: "og:title", content: "PLAY 02 · TEAM REVEAL" },
      {
        property: "og:description",
        content: "선택을 참고해 구성한 2PLAY 팀 발표 화면 (Team A · B · C).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamsPage,
});

const TEAMS = [
  { name: "Team A", members: ["남1", "남4", "여2", "여5"] },
  { name: "Team B", members: ["남2", "남5", "여3", "여6"] },
  { name: "Team C", members: ["남3", "남6", "여1", "여4"] },
];

function TeamsPage() {
  return (
    <main className="stage flex min-h-screen flex-col items-center px-6 pb-28 pt-12">
      <div className="w-full max-w-5xl">
        <p className="eyebrow text-sm">Play 02 · Team Reveal</p>
        <h1 className="mt-4 text-5xl leading-none text-deep md:text-6xl">2PLAY 팀 발표</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          여러분의 선택을 참고해 새로운 팀을 구성했습니다. 개인의 선택 내용은 공개되지 않습니다.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TEAMS.map((t) => (
            <section key={t.name} className="card-soft rounded-4xl p-6">
              <div className="flex items-center gap-2">
                <Petal className="h-5 w-5 text-accent" />
                <h2 className="font-display text-3xl text-deep">{t.name}</h2>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {t.members.map((m) => (
                  <div
                    key={m}
                    className="rounded-2xl bg-petal py-4 text-center font-display text-lg text-deep"
                  >
                    {m}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs tracking-widest text-muted-foreground">
                남 {t.members.filter((m) => m.startsWith("남")).length} · 여{" "}
                {t.members.filter((m) => m.startsWith("여")).length}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-secondary px-6 py-5 text-sm leading-relaxed text-secondary-foreground">
          팀 편성 기준 · 상호 선택한 두 사람을 우선 같은 팀으로 → 각자의 1·2·3순위 선호 반영 →
          남녀 구성과 1PLAY에서 만난 조합을 고려해 최종 조정. (팀 이름은 현장에서 확정)
        </div>
      </div>
    </main>
  );
}
