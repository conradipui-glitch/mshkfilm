import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function format(ms: number, withFrames: boolean) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const f = Math.floor((ms % 1000) / 40); // 25 fps
  return withFrames
    ? `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`
    : `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/**
 * Running timecode since mount — like a camera that started recording
 * when the page opened. Respects prefers-reduced-motion by ticking
 * once per second without the frame counter.
 */
export function useTimecode() {
  const [tc, setTc] = useState("00:00:00:00");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const start = performance.now();

    if (reduced) {
      setTc(format(0, false));
      const id = setInterval(() => {
        setTc(format(performance.now() - start, false));
      }, 1000);
      return () => clearInterval(id);
    }

    let raf = 0;
    const loop = () => {
      setTc(format(performance.now() - start, true));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return tc;
}
