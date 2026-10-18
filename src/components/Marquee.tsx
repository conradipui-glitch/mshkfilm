import { Asterisk } from "lucide-react";

const ITEMS = [
  "Мероприятия",
  "Видео для бизнеса",
  "Контент для блогеров",
  "Монтаж",
  "Оператор в вашу команду",
  "Reels и Shorts",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-display text-lg font-medium uppercase tracking-[0.12em] text-paper/90 sm:text-xl"
        >
          <span className="px-5">{item}</span>
          <Asterisk className="h-5 w-5 text-signal" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-paper/10 bg-coal-2 py-4">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
