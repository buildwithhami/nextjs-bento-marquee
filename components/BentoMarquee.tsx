import React from "react";
import bentoData from "@/data/bentoData.json";

type BentoCard = { id: string | number; imageUrl: string; imageAlt: string };

const CARD_H = 240;
const GAP = 24;
const UNIT = CARD_H + GAP;
const VIEWPORT_H = 780;
const SPEED = 30;

export default function BentoMarquee() {
  return (
    <section className="bg-[#0a0a0d] text-zinc-100 py-16 px-6 overflow-hidden">
      <div className="relative mx-auto grid h-195 max-w-7xl grid-cols-1 gap-6 overflow-hidden px-2 sm:grid-cols-2 lg:grid-cols-3">
        <MarqueeColumn items={bentoData.column1} direction="up" />
        <div className="hidden h-full sm:block">
          <MarqueeColumn items={bentoData.column2} direction="down" />
        </div>
        <div className="hidden h-full lg:block">
          <MarqueeColumn items={bentoData.column3} direction="up" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-19.5 bg-linear-to-b from-[#0a0a0d] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-19.5 bg-linear-to-t from-[#0a0a0d] to-transparent" />
      </div>
    </section>
  );
}

function MarqueeColumn({
  items,
  direction = "up",
  speed = SPEED,
}: {
  items: BentoCard[];
  direction?: "up" | "down";
  speed?: number;
}) {
  if (items.length === 0) return null;

  const reps = Math.max(1, Math.ceil(VIEWPORT_H / (items.length * UNIT)));
  const base = Array.from({ length: reps }, () => items).flat();

  const distance = base.length * UNIT;
  const duration = distance / speed;

  return (
    <div className="marquee-col relative h-full overflow-hidden px-1">
      <div
        className="marquee-track absolute inset-x-0 top-0"
        data-direction={direction}
        style={
          {
            "--marquee-distance": `${distance}px`,
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1}>
            {base.map((card, i) => (
              <div key={`${copy}-${i}-${card.id}`} className="pb-6">
                <div className="group relative h-60 w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:ring-white/30 hover:shadow-2xl hover:shadow-black/50">
                  <img
                    src={card.imageUrl}
                    alt={copy === 0 ? card.imageAlt : ""}
                    draggable={false}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full select-none object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}