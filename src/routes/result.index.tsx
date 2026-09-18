import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ALL, Petal } from "@/components/signal";

export const Route = createFileRoute("/result/")({
  head: () => ({
    meta: [
      { title: "개인 결과 확인 · FINAL RESULT | 윷놀이 자만추" },
      {
        name: "description",
        content: "참가자 번호를 입력하면 본인만 볼 수 있는 개인 결과 페이지로 이동합니다.",
      },
      { property: "og:title", content: "개인 결과 확인 · FINAL RESULT" },
      {
        property: "og:description",
        content: "참가자 번호로만 열리는 개인별 비공개 결과 확인 화면.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultEntry,
});

function ResultEntry() {
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="stage flex min-h-screen items-center justify-center px-5 pb-28">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const v = id.trim();
          if (ALL.includes(v)) navigate({ to: "/result/$id", params: { id: v } });
          else setError(true);
        }}
        className="card-soft w-full max-w-sm rounded-4xl p-7 text-center"
      >
        <Petal className="mx-auto h-7 w-7 text-accent" />
        <h1 className="mt-4 text-4xl leading-none text-deep">내 결과 보기</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          본인 참가자 번호를 입력해주세요. 결과는 본인에게만 보여집니다.
        </p>
        <input
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setError(false);
          }}
          placeholder="여3"
          className="mt-5 w-full rounded-2xl border border-border bg-card px-4 py-3 text-center font-display text-2xl text-deep outline-none focus:border-accent"
        />
        {error && <p className="mt-2 text-xs text-primary">참가자 번호를 다시 확인해주세요.</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-full py-3.5 font-display text-lg tracking-widest text-primary-foreground"
          style={{ backgroundImage: "var(--gradient-petal)" }}
        >
          결과 열기
        </button>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          이 페이지 링크는 빔프로젝터에 노출되지 않습니다.
        </p>
      </form>
    </main>
  );
}
