import { createFileRoute } from "@tanstack/react-router";
import { FakeQR, MEN, Petal } from "@/components/signal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PLAY 01 · SIGNAL | 윷놀이 자만추 1기" },
      {
        name: "description",
        content:
          "빔프로젝터용 첫인상 투표 안내 화면. 참가자 카드와 공통 투표 QR, 제출 현황을 한 화면에 보여줍니다.",
      },
      { property: "og:title", content: "PLAY 01 · SIGNAL — 윷놀이 자만추 1기" },
      {
        property: "og:description",
        content: "지금, 누가 더 궁금한가요? 마음이 가는 사람을 1·2·3순위로 선택해주세요.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BeamIntro,
});

function BeamIntro() {
  return (
    <main className="stage flex min-h-screen flex-col items-center px-6 pb-28 pt-12">
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-3">
          <Petal className="h-5 w-5 text-accent" />
          <p className="eyebrow text-sm">Play 01 · Signal</p>
        </div>
        <p className="mt-1 text-sm tracking-[0.3em] text-muted-foreground">윷놀이 자만추 1기</p>

        <h1 className="mt-6 text-5xl leading-[0.95] text-deep md:text-7xl">
          지금, 누가 더
          <br />
          궁금한가요?
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
          마음이 가는 사람을 1·2·3순위로 선택해주세요.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-5 gap-3">
            {MEN.map((id) => (
              <div
                key={id}
                className="card-soft flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-3xl"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-petal)" }}
                >
                  <Petal className="h-6 w-6" />
                </span>
                <span className="font-display text-2xl text-deep md:text-3xl">{id}</span>
                <span className="text-[11px] tracking-widest text-muted-foreground">참가자</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 md:pl-4">
            <FakeQR />
            <p className="font-display text-lg tracking-widest text-deep">
              QR을 스캔하고 투표하기
            </p>
            <p className="max-w-[13rem] text-center text-[11px] leading-relaxed text-muted-foreground">
              선택 내용은 다른 참가자에게 공개되지 않습니다. 위 QR은 화면 구성 예시이며 실제 투표
              링크가 아닙니다.
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 rounded-full bg-card px-6 py-4">
          <span className="font-display text-lg tracking-widest text-deep">제출 현황</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-0" style={{ backgroundImage: "var(--gradient-petal)" }} />
          </div>
          <span className="font-display text-xl text-deep">0 / 10</span>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          여성 참가자에게는 남성 5명, 남성 참가자에게는 여성 5명만 표시됩니다.
        </p>
      </div>
    </main>
  );
}
