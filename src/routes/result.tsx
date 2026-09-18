import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Petal } from "@/components/signal";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "FINAL RESULT · IT'S A MATCH | 윷놀이 자만추" },
      {
        name: "description",
        content: "개인별 비공개 매칭 결과 화면. 서로 동의할 때만 연락처를 연결합니다.",
      },
      { property: "og:title", content: "FINAL RESULT · IT'S A MATCH" },
      {
        property: "og:description",
        content: "서로의 마음이 닿았을 때만 보이는 개인별 결과 화면.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="stage flex min-h-screen flex-col items-center justify-center px-5 pb-28 pt-12">
      <div className="w-full max-w-md text-center">
        <p className="eyebrow text-xs">윷놀이 자만추 · Final Result</p>

        <div className="card-soft mt-6 rounded-4xl px-6 py-10">
          <div className="flex justify-center gap-1 text-accent">
            <Petal className="h-6 w-6" />
            <Petal className="h-8 w-8" />
            <Petal className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-5xl leading-none text-deep">IT’S A MATCH!</h1>
          <p className="mt-3 text-sm text-muted-foreground">서로의 마음이 닿았어요.</p>

          <div className="mt-7 flex items-center justify-center gap-4">
            <span
              className="rounded-3xl px-6 py-4 font-display text-2xl text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-petal)" }}
            >
              W02
            </span>
            <Petal className="h-6 w-6 text-accent" />
            <span
              className="rounded-3xl px-6 py-4 font-display text-2xl text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-petal)" }}
            >
              M04
            </span>
          </div>

          <button
            type="button"
            onClick={() => setAgreed((v) => !v)}
            className={
              "mt-8 w-full rounded-full border py-4 font-display text-lg tracking-widest transition-colors " +
              (agreed
                ? "border-transparent text-primary-foreground"
                : "border-accent text-deep hover:bg-petal")
            }
            style={agreed ? { backgroundImage: "var(--gradient-petal)" } : undefined}
          >
            {agreed ? "연락처 전달 동의 완료" : "연락처 전달에 동의하기"}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            양쪽 모두 동의했을 때만 연락처를 연결해드립니다.
          </p>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          이 결과 화면은 개인별 비밀 링크로만 열립니다. 빔프로젝터에는 공개되지 않습니다.
        </p>
      </div>
    </main>
  );
}
