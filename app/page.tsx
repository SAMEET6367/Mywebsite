import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyWorkWithMe } from "@/components/WhyWorkWithMe";
import { Process } from "@/components/Process";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-ink-950">
      <Nav />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <WhyWorkWithMe />
      <div className="section-divider" />
      <Process />
      <div className="section-divider" />
      <FeaturedWork />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <FAQ />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </main>
  );
}
