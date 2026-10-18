import { ArrowDown, Send } from "lucide-react";
import { TG_CONTACT } from "../data/content";

const HERO_VIDEO = "assets/video/summer.mp4";
const HERO_POSTER = "assets/img/poster-summer.webp";

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-7 w-7 border-paper/70 ${className}`}
    />
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden bg-coal"
      aria-label="Главный экран"
    >
      {/* viewfinder video */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          className="animate-slow-zoom h-full w-full object-cover opacity-55"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-coal/45" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 42%, transparent 40%, rgba(22,19,15,0.82) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-coal to-transparent" />
      </div>

      {/* viewfinder frame */}
      <div
        className="pointer-events-none absolute inset-3 z-10 sm:inset-5"
        aria-hidden="true"
      >
        <Corner className="left-0 top-0 border-l-2 border-t-2" />
        <Corner className="right-0 top-0 border-r-2 border-t-2" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

        {/* top readouts */}
        <div className="absolute left-3 top-14 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60 sm:left-4 sm:top-16">
          Камера А · процесс
        </div>
        <div className="absolute right-3 top-14 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60 sm:right-4 sm:top-16 md:block">
          Омск · 54.99° N 73.37° E
        </div>

        {/* focus marker */}
        <div className="absolute left-1/2 top-[36%] hidden -translate-x-1/2 md:block">
          <div className="relative h-16 w-24 border border-paper/25">
            <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-amber-tc/80" />
            <span className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-amber-tc/80" />
            <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-amber-tc/80" />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-amber-tc/80" />
          </div>
          <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-amber-tc/80">
            AF · лицо
          </p>
        </div>
      </div>

      {/* content */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-10 pt-32 sm:px-8 lg:px-12">
        <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-tc">
          <span className="inline-block h-px w-10 bg-signal" aria-hidden="true" />
          Видеограф · Омск
          <span className="hidden sm:inline"> · выезды по договорённости</span>
        </p>

        <h1 className="font-display font-semibold uppercase leading-[0.98] tracking-[0.01em] text-paper">
          <span className="block text-[11.5vw] sm:text-[9vw] lg:text-[6.8rem] xl:text-[7.6rem]">
            Снимаю сам.
          </span>
          <span className="block text-[11.5vw] text-signal sm:text-[9vw] lg:text-[6.8rem] xl:text-[7.6rem]">
            Монтирую сам.
          </span>
          <span className="block text-[11.5vw] sm:text-[9vw] lg:text-[6.8rem] xl:text-[7.6rem]">
            Отвечаю лично.
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg">
            Меня зовут Михаил Мушкачев. Снимаю мероприятия, видео для бизнеса
            и контент для блогеров. Вы разговариваете напрямую с человеком за
            камерой — без менеджеров и испорченного телефона.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#works"
              className="group flex items-center gap-2 bg-paper px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-coal transition-colors hover:bg-signal hover:text-coal"
            >
              Смотреть работы
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={TG_CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-paper/40 px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper backdrop-blur-sm transition-colors hover:border-signal hover:bg-signal hover:text-coal"
            >
              <Send className="h-4 w-4" />
              Обсудить съёмку
            </a>
          </div>
        </div>

        {/* bottom meta strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-paper/15 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">
          <span>Мероприятия</span>
          <span className="text-signal" aria-hidden="true">●</span>
          <span>Видео для бизнеса</span>
          <span className="text-signal" aria-hidden="true">●</span>
          <span>Контент для блогеров</span>
          <span className="text-signal" aria-hidden="true">●</span>
          <span>Монтаж</span>
          <span className="ml-auto hidden items-center gap-2 md:flex">
            Листайте вниз — там работы
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
}
