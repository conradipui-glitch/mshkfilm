import { useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CATEGORY_LABELS, type Work } from "../data/content";
import { cn } from "../utils/cn";
import { useState } from "react";

interface Props {
  work: Work;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Плеер работы: ролик играет прямо на странице, без перехода в Telegram.
 * Если файла ролика нет — показываем кадр из публикации и описание,
 * а ссылка на оригинал остаётся второстепенной.
 */
export function WorkPlayer({ work, index, total, onClose, onPrev, onNext }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  // если файл ролика недоступен (404, сеть, хостинг) — показываем заглушку
  // с кадром и ссылкой на оригинал, как у работ без видео
  const [failed, setFailed] = useState(false);

  // блокируем прокрутку страницы и возвращаем фокус после закрытия
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    setFailed(false);
  }, [work.id]);

  // звук: пробуем включить сразу, если браузер не дал — остаются нативные контролы
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  }, [work.id]);

  // Esc — закрыть, стрелки — соседняя работа, Tab — не выходить из диалога
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], input, [tabindex]:not([tabindex="-1"])',
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const hasVideo = Boolean(work.media?.video);
  const showVideo = hasVideo && !failed;

  return (
    <div
      className="modal-fade fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-coal/95 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-player-title"
        className="modal-rise relative my-0 w-full max-w-6xl border border-paper/15 bg-coal-2 sm:my-0"
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4 border-b border-paper/10 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke-dark">
            <span className="text-signal">{work.code}</span>
            <span className="hidden sm:inline">{CATEGORY_LABELS[work.category]}</span>
            <span className="hidden text-smoke-dark/60 sm:inline">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть плеер"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-paper/20 text-paper transition-colors hover:border-signal hover:bg-signal hover:text-coal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={cn(
            "grid",
            hasVideo ? "lg:grid-cols-[1.55fr_1fr]" : "lg:grid-cols-[1fr_1.15fr]",
          )}
        >
          {/* media */}
          <div className="relative bg-black">
            {showVideo ? (
              <div className="relative flex h-full min-h-[240px] items-center justify-center overflow-hidden sm:min-h-[360px] lg:min-h-[480px]">
                {work.media!.orientation === "portrait" && (
                  <img
                    src={work.media!.poster}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-125 object-cover opacity-[0.16] blur-2xl"
                  />
                )}
                <video
                  ref={videoRef}
                  key={work.id}
                  src={work.media!.video}
                  poster={work.media!.poster}
                  controls
                  playsInline
                  preload="metadata"
                  onError={() => setFailed(true)}
                  className="relative max-h-[72vh] w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    const v = videoRef.current;
                    if (!v) return;
                    v.muted = !v.muted;
                    setMuted(v.muted);
                  }}
                  aria-label={muted ? "Включить звук" : "Выключить звук"}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-paper/25 bg-coal/70 text-paper backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>
            ) : (
              <div className="relative flex h-full min-h-[260px] items-center justify-center overflow-hidden p-6 sm:min-h-[380px] lg:min-h-[480px]">
                {work.media?.poster && (
                  <img
                    src={work.media.poster}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-125 object-cover opacity-[0.12] blur-3xl"
                  />
                )}
                {work.media?.poster ? (
                  <figure className="relative flex flex-col items-center">
                    <img
                      src={work.media.poster}
                      alt={`Кадр из работы «${work.title}»`}
                      className="max-h-[58vh] w-[260px] max-w-[72%] border border-paper/20 object-contain shadow-[0_24px_60px_rgba(0,0,0,.6)]"
                    />
                    <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-smoke">
                      {failed
                        ? "Видео недоступно — оригинал живёт в канале"
                        : "Кадр из ролика · полная версия — в канале"}
                    </figcaption>
                  </figure>
                ) : (
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke-dark">
                    Видео доступно в канале
                  </p>
                )}
              </div>
            )}
          </div>

          {/* meta */}
          <div className="flex flex-col gap-6 border-t border-paper/10 p-5 sm:p-7 lg:border-l lg:border-t-0">
            <div>
              {work.partner && (
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-tc">
                  {work.partner}
                </p>
              )}
              <h3
                id="work-player-title"
                className="font-display text-3xl font-semibold uppercase leading-none tracking-wide text-paper sm:text-4xl"
              >
                {work.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-smoke">
                {work.description}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-5 gap-y-4 border-y border-paper/10 py-5">
              {[
                ["Участие", work.role],
                ["Хронометраж", work.duration ?? "—"],
                ["Формат", CATEGORY_LABELS[work.category]],
                ["Дата", work.date],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm font-medium leading-snug text-paper">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-paper/25 px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-paper/80 transition-colors hover:border-signal hover:text-signal"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Оригинал в канале
              </a>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Предыдущая работа"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center border border-paper/20 text-paper transition-colors hover:border-signal hover:text-signal",
                  )}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Следующая работа"
                  className="flex h-10 w-10 items-center justify-center border border-paper/20 text-paper transition-colors hover:border-signal hover:text-signal"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.16em] text-smoke-dark">
              ← → — соседние работы · Esc — закрыть
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
