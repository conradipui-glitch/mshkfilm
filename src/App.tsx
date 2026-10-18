import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Works } from "./components/Works";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Brief } from "./components/Brief";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="grain min-h-screen bg-coal font-sans text-paper">
      <a
        href="#works"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-white"
      >
        Перейти к работам
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <Services />
        <About />
        <Process />
        <Brief />
      </main>
      <Footer />
    </div>
  );
}
