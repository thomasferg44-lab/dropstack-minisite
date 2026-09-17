import { content } from "./lib/config.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./sections/Hero.jsx";
import Services from "./sections/Services.jsx";

// Page sections in order. Each entry renders only when it has content, and
// the header builds its nav from whatever actually rendered, so an empty
// section never leaves a dead anchor. Later build stages add to this list.
const sections = [
  { id: "services", label: "Services", show: content.services.length > 0, Component: Services },
];

export default function App() {
  const visible = sections.filter((s) => s.show);
  return (
    <>
      <Header nav={visible.map(({ id, label }) => ({ id, label }))} />
      <main id="main">
        <Hero />
        {visible.map(({ id, Component }) => (
          <Component key={id} id={id} />
        ))}
      </main>
      <Footer />
    </>
  );
}
