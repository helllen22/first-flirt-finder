import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MEN } from "@/components/signal";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "최종 선택 · FINAL SIGNAL | 윷놀이 자만추" },
      {
        name: "description",
        content: "다시 만나보고 싶은 사람을 최대 2명까지 고르는 최종 선택 화면입니다.",
      },
      { property: "og:title", content: "최종 선택 · FINAL SIGNAL" },
      {
        property: "og:description",
        content: "최대 2명 선택, 선택하지 않을 수도 있는 마지막 신호 화면.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FinalPage,
});

function FinalPage() {
  const [picks, setPicks] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (id: string) =>
    setPicks((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length >= 2
          ? prev
          : [...prev, id],
    );

  return (
    <main className="stage min-h-screen px-5 pb-28 pt-10">
      <div className="mx-auto w-full max-w-md">
        <p className="eyebrow text-xs">Final Signal · 체험 화면</p>
        <h1 className="mt-2 text-4xl leading-none text-deep">
          오늘의 인연,
          <br />
          이어가고 싶나요?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          다시 만나보고 싶은 사람을 최대 2명 선택해주세요. 선택하지 않아도 괜찮습니다.
        </p>

        <div className="mt-7 space-y-3">
          {MEN.map((id) => {
            const on = picks.includes(id);
            const full = picks.length >= 2 && !on;
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className={
                  "flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition-all " +
                  (on
                    ? "border-transparent text-primary-foreground"
                    : full
                      ? "border-border bg-muted text-muted-foreground/60"
                      : "card-soft hover:border-accent")
                }
                style={on ? { backgroundImage: "var(--gradient-petal)" } : undefined}
              >
                <span className="font-display text-2xl">{id}</span>
                <span className="text-xs tracking-widest">
                  {on ? "선택됨" : full ? "2명까지" : "선택"}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setSent(true)}
          className="mt-6 w-full rounded-full py-4 font-display text-xl tracking-widest text-primary-foreground"
          style={{ backgroundImage: "var(--gradient-petal)", boxShadow: "var(--shadow-soft)" }}
        >
          {sent ? "최종 선택 완료" : picks.length === 0 ? "선택 없이 마치기" : "최종 선택 완료"}
        </button>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          결과는 빔에 공개되지 않고, 각자의 휴대폰에서만 확인합니다.
          <br />
          서로 동의한 경우에만 연락처를 연결해드립니다.
        </p>
      </div>
    </main>
  );
}
