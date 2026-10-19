import { useMemo, useState } from "react";
import { Send, Clapperboard, MessageSquareText, MousePointerClick } from "lucide-react";
import { BRIEF_TYPES, BRIEF_RESULTS, TG_CONTACT } from "../data/content";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.08em] transition-all",
        active
          ? "border-signal bg-signal text-coal"
          : "border-paper/25 text-paper/70 hover:border-paper/60 hover:text-paper",
      )}
    >
      {children}
    </button>
  );
}

export function Brief() {
  const [type, setType] = useState<string>("");
  const [place, setPlace] = useState("");
  const [result, setResult] = useState<string>("");
  const [name, setName] = useState("");
  const [clapping, setClapping] = useState(false);
  const [sent, setSent] = useState(false);

  const filled = [type, place.trim(), result, name.trim()].filter(
    Boolean,
  ).length;

  const message = useMemo(() => {
    const lines = ["Здравствуйте, Михаил! Пишу с сайта MSHK.FILM.", ""];
    if (type) lines.push(`Что нужно: ${type}`);
    if (place.trim()) lines.push(`Где и когда: ${place.trim()}`);
    if (result) lines.push(`Хочу получить: ${result}`);
    if (name.trim()) lines.push(`Меня зовут: ${name.trim()}`);
    if (lines.length === 2)
      lines.push("Хочу обсудить съёмку видео. Расскажете, как начать?");
    return lines.join("\n");
  }, [type, place, result, name]);

  const tgUrl = `${TG_CONTACT}?text=${encodeURIComponent(message)}`;

  const handleSubmit = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setSent(false);
    if (reduced) {
      window.open(tgUrl, "_blank", "noopener,noreferrer");
      setSent(true);
      return;
    }
    setClapping(true);
    window.setTimeout(() => {
      window.open(tgUrl, "_blank", "noopener,noreferrer");
    }, 380);
    window.setTimeout(() => {
      setClapping(false);
      setSent(true);
    }, 950);
  };

  return (
    <section
      id="brief"
      className="relative overflow-hidden bg-coal py-20 sm:py-28"
      aria-label="Обсудить проект"
    >
      {/* backdrop word */}
      <div
        className="pointer-events-none absolute -top-6 left-0 select-none whitespace-nowrap font-display text-[22vw] font-bold uppercase leading-none text-paper/[0.035]"
        aria-hidden="true"
      >
        Мотор! Мотор!
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-paper/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-signal">
                Сцена 05 / Хлопушка
              </p>
              <h2 className="font-display text-5xl font-semibold uppercase leading-none text-paper sm:text-6xl lg:text-7xl">
                Заполните хлопушку —<br />
                <span className="text-smoke">и поехали</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-smoke">
              Перед каждым дублем ассистент заполняет хлопушку: что снимаем,
              где и когда. Сделайте так же — откроется Telegram с готовым
              сообщением, останется нажать «Отправить».
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* ---------- clapperboard ---------- */}
          <Reveal>
            <div className="relative pt-14 sm:pt-16">
              {/* clap arm */}
              <div
                className={cn(
                  "clap-arm absolute left-0 right-0 top-6 z-10 h-9 sm:top-8 sm:h-11",
                  clapping && "clapping",
                )}
                aria-hidden="true"
              >
                <div className="clap-stripes h-full w-full border border-black/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
              </div>
              {/* hinge */}
              <div
                className="absolute left-2 top-[3.4rem] z-20 h-4 w-4 rounded-full bg-smoke-dark ring-2 ring-black/50 sm:top-[4.1rem]"
                aria-hidden="true"
              />

              {/* board */}
              <div className="relative border border-black bg-[#14110d] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div
                  className="clap-stripes h-4 w-full opacity-90"
                  aria-hidden="true"
                />

                {clapping && (
                  <div
                    className="animate-motor pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-coal/70"
                    aria-hidden="true"
                  >
                    <span className="font-display text-6xl font-bold uppercase tracking-[0.1em] text-signal sm:text-7xl">
                      Мотор!
                    </span>
                  </div>
                )}

                <div className="p-5 sm:p-8">
                  {/* board header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/15 pb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
                    <span>Продакшн: ваш проект</span>
                    <span>
                      Оператор: <span className="text-paper">М. Мушкачев</span>
                    </span>
                    <span className="text-amber-tc">
                      Заполнено: {filled}/4
                    </span>
                  </div>

                  {/* field: type */}
                  <fieldset className="mt-7">
                    <legend className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/60">
                      <span className="text-signal">Сцена</span> — что снимаем
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BRIEF_TYPES.map((t) => (
                        <Chip
                          key={t}
                          active={type === t}
                          onClick={() => setType(type === t ? "" : t)}
                        >
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </fieldset>

                  {/* field: place */}
                  <div className="mt-8">
                    <label
                      htmlFor="brief-place"
                      className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/60"
                    >
                      <span className="text-signal">Локация</span> — где и
                      когда
                    </label>
                    <input
                      id="brief-place"
                      type="text"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      placeholder="Например: Омск, 14 июня, ресторан у реки"
                      className="mt-2 w-full border-b-2 border-dashed border-paper/30 bg-transparent pb-2.5 font-display text-xl tracking-wide text-paper placeholder:text-paper/25 focus:border-signal focus:outline-none sm:text-2xl"
                    />
                  </div>

                  {/* field: result */}
                  <fieldset className="mt-8">
                    <legend className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/60">
                      <span className="text-signal">Дубль</span> — что нужно
                      на выходе
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BRIEF_RESULTS.map((r) => (
                        <Chip
                          key={r}
                          active={result === r}
                          onClick={() => setResult(result === r ? "" : r)}
                        >
                          {r}
                        </Chip>
                      ))}
                    </div>
                  </fieldset>

                  {/* field: name */}
                  <div className="mt-8">
                    <label
                      htmlFor="brief-name"
                      className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/60"
                    >
                      <span className="text-signal">Режиссёр</span> — ваше имя
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться?"
                      className="mt-2 w-full border-b-2 border-dashed border-paper/30 bg-transparent pb-2.5 font-display text-xl tracking-wide text-paper placeholder:text-paper/25 focus:border-signal focus:outline-none sm:text-2xl"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={clapping}
                    className="group mt-10 flex w-full items-center justify-center gap-3 bg-signal px-6 py-5 font-display text-xl font-semibold uppercase tracking-[0.12em] text-coal transition-all hover:bg-paper hover:text-coal disabled:cursor-wait sm:text-2xl"
                  >
                    <Clapperboard className="h-6 w-6 transition-transform group-hover:-rotate-6" />
                    {clapping ? "Хлопаю…" : "Хлопнуть и отправить"}
                  </button>

                  {sent && !clapping && (
                    <p className="mt-4 text-center text-sm text-smoke">
                      Telegram должен был открыться с готовым сообщением —
                      останется нажать «отправить». Если не открылся,{" "}
                      <a
                        href={tgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-paper underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
                      >
                        вот прямая ссылка
                      </a>
                      .
                    </p>
                  )}
                </div>
              </div>

              {/* message preview */}
              <div className="mt-6 border border-paper/10 bg-coal-2 p-5">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke-dark">
                  <MessageSquareText className="h-4 w-4" />
                  Вот что я получу
                </p>
                <pre className="mt-3 whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-paper/80">
                  {message}
                </pre>
              </div>
            </div>
          </Reveal>

          {/* ---------- side column ---------- */}
          <Reveal delay={100}>
            <div className="flex flex-col gap-8 lg:pt-16">
              <div>
                <h3 className="font-display text-3xl font-semibold uppercase leading-tight text-paper">
                  Не хотите заполнять?
                  <br />
                  Просто напишите.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">
                  Пары предложений в Telegram достаточно: какую историю хотите
                  рассказать и какая дата. Дальше я сам задам нужные вопросы —
                  их немного.
                </p>
                <a
                  href={TG_CONTACT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 border border-paper/35 px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:border-signal hover:bg-signal hover:text-coal"
                >
                  <Send className="h-4 w-4" />
                  @mmushkachev — написать
                </a>
              </div>

              <div className="border-t border-paper/10 pt-7">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-tc">
                  <MousePointerClick className="h-4 w-4" />
                  Что будет дальше
                </p>
                <ol className="mt-5 flex flex-col gap-5">
                  {[
                    "Получаю ваше сообщение и отвечаю лично — не бот и не менеджер.",
                    "Задаю пару уточняющих вопросов и называю стоимость и сроки. До съёмки, а не после.",
                    "Если всё устраивает — бронируем дату и снимаем. Если нет — честно расходимся без обид.",
                  ].map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="font-display text-2xl font-semibold leading-none text-signal">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-paper/80">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border border-dashed border-paper/20 p-5">
                <p className="text-sm leading-relaxed text-smoke">
                  <span className="font-medium text-paper">
                    Не знаете, какой формат нужен?
                  </span>{" "}
                  Нормально. Опишите задачу своими словами и выберите «Пока
                  не знаю — посоветуйте». Подскажу, что подойдёт под ваш
                  случай и бюджет.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
