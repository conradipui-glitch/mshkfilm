import { Send, ArrowUp } from "lucide-react";
import { TG_CONTACT, TG_CHANNEL } from "../data/content";
import { Reveal } from "./Reveal";

const CREDITS = [
  ["Главные герои", "вы и ваша история"],
  ["Камера и монтаж", "Михаил Мушкачев"],
  ["Локация", "Омск и куда позовут"],
  ["Команда", "собирается под проект"],
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-[#100d0a]">
      <div className="perforation-x h-6 opacity-70" aria-hidden="true" />

      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <Reveal>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.35em] text-smoke">
            Конец смены · финальные титры
          </p>
          <h2 className="mt-6 text-center font-display text-[15vw] font-bold uppercase leading-[0.92] text-paper sm:text-[11vw] lg:text-[10rem]">
            Стоп<span className="text-signal">.</span> Снято
            <span className="text-signal">!</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-center text-base leading-relaxed text-smoke">
            Но ваш проект ещё не снят. Давайте это исправим — напишите мне, и
            обсудим вашу сцену.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={TG_CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-signal px-7 py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-coal transition-colors hover:bg-paper hover:text-coal"
            >
              <Send className="h-4 w-4" />
              Написать Михаилу
            </a>
          </div>
        </Reveal>

        {/* credits roll */}
        <Reveal delay={80}>
          <dl className="mx-auto mt-16 grid max-w-3xl gap-x-10 gap-y-3 border-y border-paper/10 py-8 sm:grid-cols-2">
            {CREDITS.map(([role, who]) => (
              <div key={role} className="flex items-baseline gap-3">
                <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke-dark">
                  {role}
                </dt>
                <span
                  className="flex-1 border-b border-dotted border-paper/20"
                  aria-hidden="true"
                />
                <dd className="shrink-0 text-sm font-medium text-paper/85">
                  {who}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold tracking-[0.08em] text-paper">
              MSHK<span className="text-signal">.</span>FILM
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-smoke-dark">
              © 2026 Михаил Мушкачев · кинематографист, Омск
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em]"
            aria-label="Ссылки в подвале"
          >
            <a
              href={TG_CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke transition-colors hover:text-signal"
            >
              Написать в Telegram
            </a>
            <a
              href={TG_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke transition-colors hover:text-signal"
            >
              Канал с работами
            </a>
            <a
              href="#top"
              className="flex items-center gap-1.5 text-smoke transition-colors hover:text-signal"
            >
              Наверх
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>

        <p className="mt-10 max-w-2xl font-mono text-[10px] leading-relaxed tracking-wide text-smoke-dark">
          Все работы из каталога опубликованы в открытом Telegram-канале
          @mushkachev. Видео и кадры на этом сайте взяты из тех же публикаций —
          чужих материалов здесь нет.
        </p>
      </div>
    </footer>
  );
}
