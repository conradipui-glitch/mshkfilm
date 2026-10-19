import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PROCESS, FAQ } from "../data/content";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";

export function Process() {
  const [openFaq, setOpenFaq] = useState<number>(-1);

  return (
    <section
      id="process"
      className="relative bg-paper text-ink"
      aria-label="Как проходит работа"
    >
      <div className="bg-coal" aria-hidden="true">
        <div className="perforation-x h-6" />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-6 border-b-2 border-ink/80 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-signal-ink">
                Сцена 04 / Как проходит работа
              </p>
              <h2 className="font-display text-5xl font-semibold uppercase leading-none sm:text-6xl lg:text-7xl">
                От сообщения
                <br />
                <span className="text-ink/60">до «готово»</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/70">
              Никакой бюрократии: четыре шага, и у каждого понятный результат.
              Кто именно будет на площадке — обсуждаем сразу, до съёмки.
            </p>
          </div>
        </Reveal>

        {/* takes */}
        <ol className="mt-12 grid gap-px border border-ink/15 bg-ink/15 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={step.take} as="li" delay={i * 80} className="h-full">
              <div className="group flex h-full flex-col bg-paper p-7 transition-colors duration-500 hover:bg-cream/70">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-signal-ink">
                    {step.take}
                  </span>
                  <span className="font-display text-5xl font-semibold leading-none text-ink/10 transition-colors duration-500 group-hover:text-signal-ink/25">
                    {String(i).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-semibold uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* FAQ */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal-ink">
                Вопросы, которые задают чаще всего
              </p>
              <h3 className="mt-3 font-display text-4xl font-semibold uppercase leading-tight sm:text-5xl">
                Спрашивали?
                <br />
                Отвечаю.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
                Если вашего вопроса здесь нет — задайте его в Telegram.
                Отвечаю лично, обычно в тот же день, если не на съёмке.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border-t border-ink/15">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className="border-b border-ink/15">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      aria-expanded={open}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-xl font-medium uppercase tracking-wide transition-colors sm:text-2xl",
                          open
                            ? "text-signal-ink"
                            : "text-ink group-hover:text-signal-ink",
                        )}
                      >
                        {item.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform duration-500",
                          open ? "rotate-180 text-signal-ink" : "text-ink/40",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink/75">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="bg-coal" aria-hidden="true">
        <div className="perforation-x h-6" />
      </div>
    </section>
  );
}
