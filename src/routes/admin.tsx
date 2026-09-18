import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MEN, WOMEN, Petal } from "@/components/signal";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "운영진 전용 · 첫인상 선택 결과 | 윷놀이 자만추" },
      {
        name: "description",
        content: "운영진만 확인하는 첫인상 선택 결과 집계 화면입니다.",
      },
      { property: "og:title", content: "운영진 전용 · 첫인상 선택 결과" },
      {
        property: "og:description",
        content: "참가자 선택 결과와 상호 매칭을 운영진만 확인하는 비공개 화면.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const PASSCODE = "2play";

/** 예시 데이터 — 실제 집계는 이후 연동 예정 */
const ROWS = [
  { id: "남1", picks: ["여3", "여1", "여5"] },
  { id: "남2", picks: ["여2", "여4", "여6"] },
  { id: "남3", picks: ["여5", "여3", "여1"] },
  { id: "남4", picks: ["여6", "여2", "여4"] },
  { id: "남5", picks: ["여1", "여5", "여3"] },
  { id: "남6", picks: ["여4", "여6", "여2"] },
  { id: "여1", picks: ["남5", "남1", "남3"] },
  { id: "여2", picks: ["남2", "남6", "남4"] },
  { id: "여3", picks: ["남1", "남3", "남5"] },
  { id: "여4", picks: ["남6", "남4", "남2"] },
  { id: "여5", picks: ["남3", "남5", "남1"] },
  { id: "여6", picks: ["남4", "남2", "남6"] },
];

function mutualPairs() {
  const map = new Map(ROWS.map((r) => [r.id, r.picks]));
  const out: string[] = [];
  MEN.forEach((m) => {
    WOMEN.forEach((w) => {
      if (map.get(m)?.includes(w) && map.get(w)?.includes(m)) out.push(`${m} ↔ ${w}`);
    });
  });
  return out;
}

function AdminPage() {
  const [code, setCode] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState(false);

  if (!ok) {
    return (
      <main className="stage flex min-h-screen items-center justify-center px-5 pb-28">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim().toLowerCase() === PASSCODE) setOk(true);
            else setError(true);
          }}
          className="card-soft w-full max-w-sm rounded-4xl p-7 text-center"
        >
          <Petal className="mx-auto h-7 w-7 text-accent" />
          <h1 className="mt-4 text-3xl leading-none text-deep">운영진 전용</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            첫인상 선택 결과는 운영진만 확인할 수 있습니다.
          </p>
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="운영진 코드"
            className="mt-5 w-full rounded-2xl border border-border bg-card px-4 py-3 text-center text-sm outline-none focus:border-accent"
          />
          {error && <p className="mt-2 text-xs text-primary">코드가 올바르지 않습니다.</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-full py-3.5 font-display text-lg tracking-widest text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-petal)" }}
          >
            결과 열기
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="stage min-h-screen px-6 pb-28 pt-12">
      <div className="mx-auto w-full max-w-4xl">
        <p className="eyebrow text-xs">Admin · First Signal Result</p>
        <h1 className="mt-3 text-4xl leading-none text-deep">첫인상 선택 결과</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          아래는 화면 구성 예시 데이터입니다. 빔프로젝터에 띄우지 마세요.
        </p>

        <section className="card-soft mt-8 overflow-hidden rounded-4xl">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">참가자</th>
                <th className="px-4 py-3 text-left font-semibold">1순위</th>
                <th className="px-4 py-3 text-left font-semibold">2순위</th>
                <th className="px-4 py-3 text-left font-semibold">3순위</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-4 py-3 font-display text-lg text-deep">{r.id}</td>
                  {r.picks.map((p, i) => (
                    <td key={i} className="px-4 py-3 text-deep">
                      {p}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6 rounded-3xl bg-secondary px-6 py-5 text-sm text-secondary-foreground">
          <p className="font-display text-lg tracking-widest text-deep">상호 선택</p>
          <p className="mt-2 leading-relaxed">{mutualPairs().join(" · ") || "없음"}</p>
        </section>
      </div>
    </main>
  );
}
