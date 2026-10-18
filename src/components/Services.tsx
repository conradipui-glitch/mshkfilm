import { useState } from "react";
import { Plus, Check, ArrowRight } from "lucide-react";
import { SERVICES } from "../data/content";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";

export function Services() {
  const [openId, setOpenId] = useState<string>(SERVICES[0].id);

  return (
    <section
      id="services"
      className="relative bg-paper text-ink"
      aria-label="Что я снимаю"
    >
      {/* film edge on top */}
      <div className="bg-coal px-0" aria-hidden="true">
        <div className="perforation-x h-6" />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-6 border-b-2 border-ink/80 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-signal-ink">
                Сцена 02 / Что снимаю
              </p>
              <h2 className="font-display text-5xl font-semibold uppercase leading-none sm:text-6xl lg:text-7xl">
                Пять поводов
                <br />
                <span className="text-ink/60">позвать меня</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/70">
              Стоимость публичного прайса не имеет — она зависит от задачи,
              даты и объёма монтажа. Точную сумму называю после короткого
              разговора, до съёмки. Выберите направление, чтобы увидеть, что
              вы получите на выходе.
            </p>
          </div>
        </Reveal>

        <div>
          {SERVICES.map((s, idx) => {
            const open = openId === s.id;
            return (
              <Reveal key={s.id} delay={idx * 40}>
                <div className="border-b border-ink/15">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? "" : s.id)}
                    aria-expanded={open}
                    className="group flex w-full items-center gap-4 py-6 text-left sm:gap-8 sm:py-8"
                  >
                    <span
                      className={cn(
                        "font-mono text-sm font-medium tracking-widest transition-colors",
                        open ? "text-signal-ink" : "text-ink/65",
                      )}
                    >
                      {s.num}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block font-display text-3xl font-semibold uppercase leading-none tracking-wide transition-colors sm:text-5xl",
                          open
                            ? "text-ink"
                            : "text-ink/70 group-hover:text-ink",
                        )}
                      >
                        {s.title}
                      </span>
                      <span className="mt-2 block font-mono text-[12px] uppercase tracking-[0.14em] text-ink/70">
                        {s.short}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                        open
                          ? "rotate-45 border-signal bg-signal text-coal"
                          : "border-ink/25 text-ink/60 group-hover:border-ink",
                      )}
                    >
                      <Plus className="h-5 w-5" />
                    </span>
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
                      <div className="grid gap-8 pb-10 pl-9 pr-1 sm:pl-[4.5rem] lg:grid-cols-[1.3fr_1fr] lg:gap-16">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-ink">
                            {s.forWhom}
                          </p>
                          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/85">
                            {s.details}
                          </p>
                          <a
                            href="#brief"
                            className="group/link mt-6 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal-ink"
                          >
                            Обсудить такую съёмку
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                          </a>
                        </div>
                        <div className="border border-ink/15 bg-cream/60 p-5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70">
                            Что вы получите
                          </p>
                          <ul className="mt-4 flex flex-col gap-3">
                            {s.deliverables.map((d) => (
                              <li
                                key={d}
                                className="flex items-start gap-2.5 text-sm font-medium text-ink/85"
                              >
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* film edge on bottom */}
      <div className="bg-coal" aria-hidden="true">
        <div className="perforation-x h-6" />
      </div>
    </section>
  );
}
