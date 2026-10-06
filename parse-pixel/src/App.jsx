import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import BrandStory from "./sections/BrandStory";
import LogicToVisual from "./sections/LogicToVisual";
import Process from "./sections/Process";
import Work from "./sections/Work";
import Global from "./sections/Global";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import useSmoothScroll from "./hooks/useSmoothScroll";
import useReveal from "./hooks/useReveal";

export default function App() {
  useSmoothScroll();
  useReveal();
  return (
    <>
      <div className="bg-fx" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <BrandStory />
        <LogicToVisual />
        <Process />
        <Work />
        <Global />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
