import { Camera, Mic, SlidersHorizontal, MonitorPlay, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { TG_CHANNEL } from "../data/content";

const FRAMES = [
  {
    src: "assets/img/still-workshop.jpg",
    alt: "Мужчина сидит на полу разрушенного помещения и смотрит в окно",
    label: "Кадр 01 · локация",
  },
  {
    src: "assets/img/still-backstage.jpg",
    alt: "Человек стоит спиной к камере у открытого окна в тёмной комнате",
    label: "Кадр 02 · свет",
  },
  {
    src: "assets/img/still-night.jpg",
    alt: "Ноги в светлых кроссовках на ночной улице у машины с горящим фонарём",
    label: "Кадр 03 · ночь",
  },
];

const PRINCIPLES = [
  {
    title: "Разговариваете со мной напрямую",
    text: "Нет аккаунт-менеджеров, которые передадут вашу задачу «специалистам». Что обсудили — то и снимаем.",
  },
  {
    title: "Беру проект целиком или на один этап",
    text: "Могу снять и смонтировать под ключ, а могу только смонтировать ваши исходники или приехать оператором в вашу команду.",
  },
  {
    title: "Честно говорю, что не моё",
    text: "Если задача требует другой техники или целой команды — скажу об этом до съёмки, а не после. Посоветую, к кому обратиться.",
  },
  {
    title: "Процесс виден до заказа",
    text: "Весь бэкстейдж и работы лежат в открытом канале. Можно посмотреть, как я снимаю, ещё до первого сообщения.",
  },
];

const GEAR = [
  { icon: Camera, label: "Камеры", value: "Fujifilm X-H2S · X-T4" },
  { icon: SlidersHorizontal, label: "Стабилизация", value: "электронный стабилизатор" },
  { icon: Mic, label: "Звук", value: "беспроводная запись" },
  { icon: MonitorPlay, label: "Пост", value: "DaVinci Resolve — монтаж и цвет" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative bg-coal py-20 sm:py-28"
      aria-label="Кто за камерой"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-signal">
            Сцена 03 / Кто за камерой
          </p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          {/* text column */}
          <div>
            <Reveal>
              <h2 className="font-display text-4xl font-semibold uppercase leading-[1.02] text-paper sm:text-6xl">
                MSHK.FILM — это не студия.{" "}
                <span className="text-signal">Это я.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/85">
                Меня зовут Михаил Мушкачев, я видеограф и оператор из Омска.
                Веду проект от первого разговора до готового файла: сам
                приезжаю, сам снимаю, сам монтирую. Поэтому ничего не
                теряется между «мы так не договаривались» и «это монтажёр
                решил».
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-smoke">
                Снимаю мероприятия, видео для бизнеса и контент для блогеров.
                Параллельно участвую в чужих проектах как оператор и монтажёр —
                в каталоге выше честно размечено, где моя работа от и до, а
                где я был частью команды.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={i * 60} className="h-full">
                  <div className="h-full bg-coal p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
                      Принцип {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-medium uppercase leading-tight tracking-wide text-paper">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-smoke">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* gear card */}
            <Reveal delay={100}>
              <div className="mt-10 border border-dashed border-amber-tc/40 bg-coal-2 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber-tc">
                    Для продюсеров и коллег — чем снимаю
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-smoke-dark">
                    это инструмент, а не религия
                  </span>
                </div>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {GEAR.map((g) => (
                    <li key={g.label} className="flex items-start gap-3">
                      <g.icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-tc" />
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke-dark">
                          {g.label}
                        </span>
                        <span className="mt-0.5 block text-sm font-medium text-paper">
                          {g.value}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-paper/10 pt-4 text-xs leading-relaxed text-smoke">
                  Если под задачу нужен другой парк техники — обсудим аренду
                  заранее. Главное, чтобы камера не мешала снимать людей.
                </p>
              </div>
            </Reveal>
          </div>

          {/* film strip */}
          <Reveal delay={120}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="flex bg-[#0d0b09] p-3">
                <div className="perforation-y w-4 shrink-0" aria-hidden="true" />
                <div className="flex min-w-0 flex-1 flex-col gap-3 px-3">
                  {FRAMES.map((f) => (
                    <figure key={f.label} className="group relative">
                      <div className="overflow-hidden">
                        <img
                          src={f.src}
                          alt={f.alt}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover saturate-[0.82] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
                        />
                      </div>
                      <figcaption className="flex items-center justify-between pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke-dark">
                        <span>{f.label}</span>
                        <span className="text-amber-tc/70">MSHK · процесс</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <div className="perforation-y w-4 shrink-0" aria-hidden="true" />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-smoke-dark">
                Кадры выше — из моих роликов. Бэкстейджей и новых
                видео больше в{" "}
                <a
                  href={TG_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-paper underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal"
                >
                  в Telegram-канале
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
