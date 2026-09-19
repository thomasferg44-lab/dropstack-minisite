import { config, content } from "./lib/config.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./sections/Hero.jsx";
import Services from "./sections/Services.jsx";
import Gallery from "./sections/Gallery.jsx";
import About from "./sections/About.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import ServiceAreas from "./sections/ServiceAreas.jsx";
import Faq from "./sections/Faq.jsx";
import Contact from "./sections/Contact.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";

// Page sections in order. Each entry renders only when it has content, and
// the header builds its nav from whatever actually rendered, so an empty
// section never leaves a dead anchor. `nav: false` keeps the header short. Later build stages add to this list.
const sections = [
  { id: "services", label: "Services", show: content.services.length > 0, Component: Services },
  { id: "gallery", label: "Our work", show: content.gallery.length > 0, Component: Gallery },
  { id: "about", label: "About", show: Boolean(content.about.heading || content.about.body), Component: About },
  { id: "testimonials", label: "Reviews", show: content.testimonials.length > 0, Component: Testimonials, nav: false },
  { id: "areas", label: "Areas", show: config.serviceAreas.length > 0, Component: ServiceAreas, nav: false },
  { id: "faq", label: "FAQ", show: content.faq.length > 0, Component: Faq },
  { id: "contact", label: "Contact", show: true, Component: Contact },
];

export default function App() {
  const visible = sections.filter((s) => s.show);
  return (
    <>
      <Header nav={visible.filter((s) => s.nav !== false).map(({ id, label }) => ({ id, label }))} />
      <main id="main">
        <Hero />
        {visible.map(({ id, Component }) => (
          <Component key={id} id={id} />
        ))}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
