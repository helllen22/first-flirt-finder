import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MEN, Petal } from "@/components/signal";

export const Route = createFileRoute("/vote")({
  head: () => ({
    meta: [
      { title: "첫인상 투표 · FIRST SIGNAL | 윷놀이 자만추" },
      {
        name: "description",
        content: "조금 더 알아보고 싶은 사람을 1·2·3순위로 선택하는 첫인상 투표 화면입니다.",
      },
      { property: "og:title", content: "첫인상 투표 · FIRST SIGNAL" },
      {
        property: "og:description",
        content: "1순위부터 3순위까지 서로 다른 사람을 선택하는 비공개 투표 화면.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VotePage,
});

const RANKS = [
  { key: 0, label: "1순위", hint: "가장 궁금한 사람" },
  { key: 1, label: "2순위", hint: "더 이야기하고 싶은 사람" },
  { key: 2, label: "3순위", hint: "알아보고 싶은 사람" },
];

function VotePage() {
  const [picks, setPicks] = useState<(string | null)[]>([null, null, null]);
  const [sent, setSent] = useState(false);

  const choose = (rank: number, id: string) => {
    setPicks((prev) => {
      const next = [...prev];
      // 같은 사람이 다른 순위에 있으면 해제 — 중복 선택 불가
      next.forEach((v, i) => {
        if (v === id && i !== rank) next[i] = null;
      });
      next[rank] = next[rank] === id ? null : id;
      return next;
    });
  };

  const done = picks.every(Boolean);

  return (
    <main className="stage min-h-screen px-5 pb-28 pt-10">
      <div className="mx-auto w-full max-w-md">
        <p className="eyebrow text-xs">First Signal · 체험 화면</p>
        <h1 className="mt-2 text-4xl leading-none text-deep">
          조금 더 알아보고
          <br />
          싶은 사람은?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          1순위부터 3순위까지 서로 다른 사람을 선택해주세요. 아래는 작동 방식 예시이며 실제
          투표가 제출되지는 않습니다.
        </p>

        <div className="mt-7 space-y-4">
          {RANKS.map((r) => (
            <section key={r.key} className="card-soft rounded-3xl p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xl text-deep">{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.hint}</span>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {MEN.map((id) => {
                  const takenBy = picks.findIndex((p) => p === id);
                  const mine = takenBy === r.key;
                  const blocked = takenBy !== -1 && !mine;
                  return (
                    <button
                      key={id}
                      type="button"
                      disabled={blocked}
                      onClick={() => choose(r.key, id)}
                      className={
                        "rounded-2xl border py-3 font-display text-base transition-all " +
                        (mine
                          ? "border-transparent text-primary-foreground"
                          : blocked
                            ? "border-border bg-muted text-muted-foreground/50"
                            : "border-border bg-petal text-deep hover:border-accent")
                      }
                      style={mine ? { backgroundImage: "var(--gradient-petal)" } : undefined}
                    >
                      {id}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <button
          type="button"
          disabled={!done}
          onClick={() => setSent(true)}
          className="mt-6 w-full rounded-full py-4 font-display text-xl tracking-widest text-primary-foreground transition-opacity disabled:opacity-40"
          style={{ backgroundImage: "var(--gradient-petal)", boxShadow: "var(--shadow-soft)" }}
        >
          {sent ? "SIGNAL 전송 완료" : "💌 SIGNAL 보내기"}
        </button>

        {sent && (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
            <Petal className="h-4 w-4 text-accent" />
            {picks.join(" · ")} 순으로 마음을 보냈어요 (예시)
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          선택 내용은 다른 참가자에게 공개되지 않습니다.
        </p>
      </div>
    </main>
  );
}
