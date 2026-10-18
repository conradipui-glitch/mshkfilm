import { useEffect, useState } from "react";
import { Menu, X, Send } from "lucide-react";
import { useTimecode } from "../hooks/useTimecode";
import { cn } from "../utils/cn";
import { TG_CONTACT } from "../data/content";

const NAV = [
  { href: "#works", label: "Работы", scene: "01" },
  { href: "#services", label: "Что снимаю", scene: "02" },
  { href: "#about", label: "Кто за камерой", scene: "03" },
  { href: "#process", label: "Как работаем", scene: "04" },
  { href: "#brief", label: "Хлопушка", scene: "05" },
];

export function Header() {
  const tc = useTimecode();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) =>
      document.querySelector(n.href),
    ).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-coal/90 backdrop-blur-md border-b border-paper/10"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          {/* logo */}
          <a
            href="#top"
            className="group flex items-baseline gap-2"
            aria-label="MSHK.FILM — на главный экран"
          >
            <span className="font-display text-xl font-semibold tracking-[0.08em] text-paper">
              MSHK<span className="text-signal">.</span>FILM
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-smoke md:block">
              Михаил Мушкачев
            </span>
          </a>

          {/* desktop nav */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Основная навигация"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={cn(
                  "group font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                  active === n.href
                    ? "text-paper"
                    : "text-smoke hover:text-paper",
                )}
              >
                <span
                  className={cn(
                    "mr-1 transition-colors",
                    active === n.href
                      ? "text-signal"
                      : "text-smoke-dark group-hover:text-signal",
                  )}
                >
                  {n.scene}/
                </span>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* timecode */}
            <div
              className="hidden items-center gap-2 font-mono text-[11px] tracking-wider text-amber-tc sm:flex"
              aria-hidden="true"
            >
              <span className="animate-rec inline-block h-2 w-2 rounded-full bg-signal" />
              <span className="tabular-nums">{tc}</span>
            </div>

            <a
              href={TG_CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 bg-signal px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-coal transition-all hover:bg-paper hover:text-coal sm:flex"
            >
              <Send className="h-3.5 w-3.5" />
              Написать
            </a>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="p-2 text-paper lg:hidden"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-coal pt-24 transition-all duration-500 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="perforation-x mx-6 h-5 opacity-60" aria-hidden="true" />
        <nav
          className="flex flex-col gap-1 px-6 pt-6"
          aria-label="Мобильная навигация"
        >
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-3 border-b border-paper/8 py-4"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="font-mono text-xs text-signal">
                СЦЕНА {n.scene}
              </span>
              <span className="font-display text-3xl font-medium uppercase tracking-wide text-paper transition-colors group-hover:text-signal">
                {n.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="mt-auto px-6 pb-10">
          <a
            href={TG_CONTACT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 bg-signal px-4 py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-coal"
          >
            <Send className="h-4 w-4" />
            Написать Михаилу в Telegram
          </a>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-smoke-dark">
            Омск · выезды по договорённости
          </p>
        </div>
      </div>
    </>
  );
}
