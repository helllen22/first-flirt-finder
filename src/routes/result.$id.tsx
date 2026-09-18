import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ALL, Petal } from "@/components/signal";

export const Route = createFileRoute("/result/$id")({
  head: () => ({
    meta: [
      { title: "개인 결과 · FINAL RESULT | 윷놀이 자만추" },
      {
        name: "description",
        content: "참가자 번호로만 열리는 개인별 비공개 매칭 결과 화면입니다.",
      },
      { property: "og:title", content: "개인 결과 · FINAL RESULT" },
      {
        property: "og:description",
        content: "서로의 마음이 닿았을 때만 보이는 개인별 결과 화면.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PersonalResult,
});

/** 예시 매칭 결과 — 이후 실제 집계와 연동 예정 */
const MATCHES: Record<string, string[]> = {
  여3: ["남1"],
  남1: ["여3"],
  여5: ["남3"],
  남3: ["여5"],
};

function PersonalResult() {
  const { id } = Route.useParams();
  const [agreed, setAgreed] = useState(false);

  if (!ALL.includes(id)) {
    return (
      <main className="stage flex min-h-screen items-center justify-center px-5 pb-28">
        <div className="card-soft w-full max-w-sm rounded-4xl p-8 text-center">
          <h1 className="text-3xl leading-none text-deep">확인할 수 없는 번호예요</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            참가자 번호를 다시 확인해주세요.
          </p>
          <Link
            to="/result"
            className="mt-5 inline-block rounded-full px-6 py-3 font-display text-base tracking-widest text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-petal)" }}
          >
            번호 다시 입력
          </Link>
        </div>
      </main>
    );
  }

  const matches = MATCHES[id] ?? [];

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

          {matches.length > 0 ? (
            <>
              <h1 className="mt-5 text-5xl leading-none text-deep">IT’S A MATCH!</h1>
              <p className="mt-3 text-sm text-muted-foreground">서로의 마음이 닿았어요.</p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <span
                  className="rounded-3xl px-6 py-4 font-display text-2xl text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-petal)" }}
                >
                  {id}
                </span>
                <Petal className="h-6 w-6 text-accent" />
                {matches.map((m) => (
                  <span
                    key={m}
                    className="rounded-3xl px-6 py-4 font-display text-2xl text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-petal)" }}
                  >
                    {m}
                  </span>
                ))}
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
            </>
          ) : (
            <>
              <h1 className="mt-5 text-4xl leading-none text-deep">{id} 님의 결과</h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                이번에는 서로 일치한 선택이 없었어요.
                <br />
                오늘 나눈 이야기만으로도 충분히 좋은 시간이었길 바랍니다.
              </p>
            </>
          )}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          이 결과는 참가자 번호로만 열리는 개인 페이지입니다. 빔프로젝터에는 공개되지 않습니다.
        </p>
      </div>
    </main>
  );
}
