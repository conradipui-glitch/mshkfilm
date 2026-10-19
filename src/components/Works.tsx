import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Play, Send } from "lucide-react";
import {
  WORKS,
  CATEGORY_LABELS,
  TG_CHANNEL,
  type Work,
  type WorkCategory,
} from "../data/content";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import { WorkPlayer } from "./WorkPlayer";

type Filter = WorkCategory | "all";
const FILTERS: Filter[] = ["all", "staged", "ad", "mood", "backstage"];

const ROLE_STYLE: Record<Work["roleKind"], string> = {
  solo: "border-signal/60 text-signal",
  edit: "border-amber-tc/50 text-amber-tc",
  team: "border-paper/30 text-paper/70",
};

/** CSS "film countdown leader" poster — honest typographic cover. */
function Poster({ work, large }: { work: Work; large?: boolean }) {
  const num = work.code.replace("ТК-", "");
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#100e0b]",
        large && "animate-poster-in",
      )}
      aria-hidden="true"
    >
      {/* side perforations */}
      <div className="perforation-y absolute inset-y-0 left-2 w-3" />
      <div className="perforation-y absolute inset-y-0 right-2 w-3" />

      {/* countdown circles */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/25" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/15" />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: work.accent, opacity: 0.92 }}
      />

      {/* crosshair */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-paper/10" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-paper/10" />

      {/* big number */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[22%] font-semibold leading-none text-coal sm:text-7xl">
        <span className={large ? "text-8xl" : "text-6xl"}>{num}</span>
      </span>

      {/* corner labels */}
      <span className="absolute left-6 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">
        {work.code}
      </span>
      <span className="absolute right-6 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">
        {work.duration ?? "—"}
      </span>
      <span className="absolute bottom-4 left-6 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">
        {CATEGORY_LABELS[work.category]}
      </span>
      <span
        className="absolute bottom-4 right-6 flex h-9 w-9 items-center justify-center rounded-full text-coal"
        style={{ background: work.accent }}
      >
        <Play className="ml-0.5 h-4 w-4 fill-current" />
      </span>
    </div>
  );
}

/** Обложка: кадр из ролика, если он есть, иначе типографическая карточка. */
function Thumb({ work, large }: { work: Work; large?: boolean }) {
  if (!work.media) return <Poster work={work} large={large} />;
  return (
    <img
      src={work.media.poster}
      alt=""
      loading="lazy"
      className={cn("h-full w-full object-cover", large && "animate-poster-in")}
      aria-hidden="true"
    />
  );
}

/** Монитор: играет ролик, если он есть в проекте, иначе показывает обложку.
 *  Если файл недоступен (404, сеть) — молча падаем обратно на обложку. */
function Monitor({ work }: { work: Work }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [work.id]);
  if (!work.media?.video || failed) return <Thumb key={work.id} work={work} large />;
  const { video, poster, orientation } = work.media;
  const player = (
    <video
      key={work.id}
      className={cn(
        "h-full w-full",
        orientation === "portrait" ? "relative z-10 object-contain" : "object-cover",
      )}
      src={video}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
    />
  );
  if (orientation === "portrait") {
    return (
      <div className="animate-poster-in relative h-full w-full overflow-hidden bg-black">
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-35 blur-2xl"
        />
        {player}
      </div>
    );
  }
  return <div className="animate-poster-in h-full w-full">{player}</div>;
}

export function Works() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState<string>(WORKS[0].id);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? WORKS : WORKS.filter((w) => w.category === filter)),
    [filter],
  );

  const active = filtered.find((w) => w.id === activeId) ?? filtered[0] ?? WORKS[0];
  const activeIdx = Math.max(
    0,
    filtered.findIndex((w) => w.id === active.id),
  );

  // Монитор следует за списком: активна строка, ближайшая к центру экрана.
  // Наведение мышью временно перехватывает управление.
  const hoverLock = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      if (Date.now() - hoverLock.current < 1200) return;
      const rows = [
        ...document.querySelectorAll<HTMLElement>("#works ol li button[data-work]"),
      ];
      if (!rows.length) return;
      const mid = window.innerHeight * 0.45;
      let best: HTMLElement | null = null;
      let bestD = Infinity;
      for (const r of rows) {
        const b = r.getBoundingClientRect();
        if (b.bottom < 0 || b.top > window.innerHeight) continue;
        const d = Math.abs((b.top + b.bottom) / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = r;
        }
      }
      const id = best?.dataset.work;
      if (id) setActiveId((cur) => (cur === id ? cur : id));
    };
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", handler, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
    };
  }, [filter]);

  const open = openIdx !== null ? filtered[openIdx] : null;
  const step = (dir: 1 | -1) => {
    if (openIdx === null) return;
    const next = (openIdx + dir + filtered.length) % filtered.length;
    setOpenIdx(next);
    setActiveId(filtered[next].id);
  };

  return (
    <section id="works" className="relative bg-coal py-20 sm:py-28" aria-label="Работы">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* section head */}
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-paper/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-signal">
                Сцена 01 / Работы
              </p>
              <h2 className="font-display text-5xl font-semibold uppercase leading-none text-paper sm:text-6xl lg:text-7xl">
                Каталог
                <br />
                <span className="text-smoke">отснятого</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-smoke">
              Работы из открытого канала. Ролики играют прямо здесь, на
              странице — без перехода в Telegram. Остальные открываются
              карточкой с кадром и описанием. Рядом честно указано, что именно
              я делал: снял сам, смонтировал или работал в команде.
            </p>
          </div>
        </Reveal>

        {/* filters */}
        <Reveal delay={80}>
          <div
            className="flex flex-wrap gap-2 py-6"
            role="group"
            aria-label="Фильтр работ по типу"
          >
            {FILTERS.map((f) => {
              const count =
                f === "all" ? WORKS.length : WORKS.filter((w) => w.category === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "shrink-0 border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all",
                    filter === f
                      ? "border-signal bg-signal text-coal"
                      : "border-paper/20 text-smoke hover:border-paper/50 hover:text-paper",
                  )}
                >
                  {CATEGORY_LABELS[f]}
                  <span className="ml-2 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* list */}
          <ol className="flex flex-col" key={filter}>
            {filtered.map((work, i) => (
              <li key={work.id} className="animate-row-in" style={{ animationDelay: `${i * 60}ms` }}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  data-work={work.id}
                  onMouseEnter={() => {
                    hoverLock.current = Date.now();
                    setActiveId(work.id);
                  }}
                  onFocus={() => {
                    hoverLock.current = Date.now();
                    setActiveId(work.id);
                  }}
                  className={cn(
                    "group block w-full border-b border-paper/10 py-6 text-left transition-colors first:border-t sm:py-7",
                    active.id === work.id && "border-paper/25",
                  )}
                  aria-label={`${work.title} — открыть на сайте`}
                >
                  {/* mobile poster — только там, где есть настоящее видео */}
                  {work.media?.video && (
                    <div
                      className={cn(
                        "mb-5 w-full overflow-hidden lg:hidden",
                        work.media.orientation === "portrait"
                          ? "aspect-[4/5] max-w-[240px]"
                          : "aspect-video",
                      )}
                    >
                      <Thumb work={work} />
                    </div>
                  )}

                  <div className="flex items-start gap-4 sm:gap-6">
                    <span
                      className={cn(
                        "pt-1.5 font-mono text-xs tracking-widest transition-colors",
                        active.id === work.id ? "text-signal" : "text-smoke-dark",
                      )}
                    >
                      {work.code}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <h3
                          className={cn(
                            "font-display text-2xl font-medium uppercase leading-tight tracking-wide transition-colors sm:text-3xl",
                            active.id === work.id
                              ? "text-paper"
                              : "text-paper/75 group-hover:text-paper",
                          )}
                        >
                          {work.title}
                        </h3>
                        {work.media?.video && (
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal text-coal"
                            title="Ролик играет на сайте"
                          >
                            <Play className="ml-0.5 h-3 w-3 fill-current" />
                          </span>
                        )}
                        <span
                          className={cn(
                            "border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
                            ROLE_STYLE[work.roleKind],
                          )}
                        >
                          {work.role}
                        </span>
                      </div>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-smoke">
                        {work.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-smoke-dark">
                        {work.partner && <span className="text-amber-tc">{work.partner}</span>}
                        <span>{CATEGORY_LABELS[work.category]}</span>
                        {work.duration && <span>Длительность: {work.duration}</span>}
                        <span>{work.date}</span>
                        <span className="flex items-center gap-1 text-signal opacity-0 transition-opacity group-hover:opacity-100">
                          {work.media?.video ? "Смотреть" : "Открыть"}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight
                      className={cn(
                        "mt-2 h-6 w-6 shrink-0 transition-all",
                        active.id === work.id
                          ? "translate-x-0 text-signal opacity-100"
                          : "-translate-x-1 text-smoke-dark opacity-40 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ol>

          {/* sticky monitor (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="border border-paper/15 bg-coal-2 p-3">
                <div className="flex items-center justify-between px-1 pb-3 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                  <span className="flex items-center gap-2">
                    <span className="animate-rec inline-block h-2 w-2 rounded-full bg-signal" />
                    Монитор · предпросмотр
                  </span>
                  <span className="text-amber-tc">{active.code}</span>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Monitor key={active.id} work={active} />
                </div>
                <div className="px-1 pt-4">
                  <p className="font-display text-xl font-medium uppercase tracking-wide text-paper">
                    {active.title}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-smoke-dark">
                    Моя роль: {active.role}
                    {active.duration ? ` · ${active.duration}` : ""} · {active.date}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(activeIdx)}
                    className="mt-4 flex w-full items-center justify-center gap-2 bg-paper px-4 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-coal transition-colors hover:bg-signal hover:text-coal"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    {active.media?.video ? "Смотреть здесь" : "Открыть работу"}
                  </button>
                </div>
              </div>
              <p className="mt-4 px-1 font-mono text-[10px] leading-relaxed tracking-wide text-smoke-dark">
                Наведите курсор на строку слева — в мониторе пойдёт ролик или
                обложка. Клик откроет работу здесь же, не уводя со страницы.
              </p>
            </div>
          </div>
        </div>

        {/* channel link */}
        <Reveal delay={60}>
          <div className="mt-14 flex flex-col items-start justify-between gap-5 border border-paper/10 bg-coal-2 px-6 py-7 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-2xl font-medium uppercase tracking-wide text-paper">
                Это не всё — остальное живёт в канале
              </p>
              <p className="mt-1 text-sm text-smoke">
                Бэкстейджи, новые работы и процесс без прикрас: @mushkachev,
                канал «В тихом омуте».
              </p>
            </div>
            <a
              href={TG_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 border border-paper/30 px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:border-signal hover:bg-signal hover:text-coal"
            >
              <Send className="h-4 w-4" />
              Открыть канал
            </a>
          </div>
        </Reveal>
      </div>

      {open && (
        <WorkPlayer
          work={open}
          index={openIdx ?? 0}
          total={filtered.length}
          onClose={() => setOpenIdx(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </section>
  );
}
