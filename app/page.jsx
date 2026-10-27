"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const stats = [
  ["01", "SOIL", "Moisture intelligence"],
  ["02", "AI", "Crop health vision"],
  ["03", "IOT", "Connected field sensors"],
  ["04", "WATER", "Precision irrigation"],
];

function Tractor() {
  return <div className="tractor" aria-hidden="true"><div className="tractor-body"><span className="tractor-cabin"/><span className="tractor-hood"/><span className="tractor-light"/></div><i className="wheel wheel-a"/><i className="wheel wheel-b"/><i className="wheel wheel-c"/><i className="wheel wheel-d"/><span className="implement"/></div>;
}

function Sensor({ icon, title, value, note }) { return <article className="sensor-card"><div className="sensor-icon">{icon}</div><div><p>{title}</p><strong>{value}</strong><small>{note}</small></div><span className="pulse"/></article>; }

export default function Page() {
  const hero = useRef(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const root = hero.current;
    const ctx = gsap.context(() => {
      const tractor = root.querySelector(".tractor");
      const fill = root.querySelector(".hero-fill");
      const field = root.querySelector(".field-lines");
      const chips = root.querySelectorAll(".hero-chip");
      const progress = { value: 0 };

      const update = () => {
        const w = root.clientWidth;
        const tractorWidth = window.innerWidth <= 560 ? 104 : 170;
        const start = 12;
        const end = Math.max(start, w - tractorWidth - 12);
        const x = start + progress.value * (end - start);
        gsap.set(tractor, { x });
        gsap.set(field, { xPercent: -18 * progress.value });
        fill.style.clipPath = `inset(0 ${100 - progress.value * 100}% 0 0)`;
      };

      gsap.from(chips, { y: 18, opacity: 0, duration: .7, stagger: .12, ease: "power3.out" });
      gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: .9, stagger: .08, ease: "power3.out", delay: .15 });

      const mm = gsap.matchMedia();
      mm.add({ reduce: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
        if (conditions.reduce) {
          progress.value = .35;
          update();
          return;
        }

        // Automatic tractor drive: fully visible at both ends, smoothly crossing
        // the complete field and returning forever. It does not require scrolling.
        gsap.to(progress, {
          value: 1,
          duration: 10,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          onUpdate: update
        });

        // Rotating wheels make the tractor visibly drive.
        gsap.to(root.querySelectorAll(".wheel"), {
          rotation: 360,
          duration: .7,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%"
        });
      });

      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, root);
    return () => ctx.revert();
  }, []);

  return <main>
    <header className="nav"><a className="brand" href="#top"><span>AG</span>IO</a><button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Open navigation">☰</button><nav className={menu ? "open" : ""}><a href="#technology">Technology</a><a href="#dashboard">Dashboard</a><a href="#services">Services</a><a href="#about">About</a></nav><a className="nav-cta" href="#dashboard">Explore Farm ↗</a></header>

    <section id="top" ref={hero} className="hero">
      <div className="hero-glow glow-a"/><div className="hero-glow glow-b"/>
      <div className="hero-copy"><div className="eyebrow">NEXT-GENERATION AGRICULTURE <span>● LIVE FIELD</span></div><h1>GROW<br/><em>SMARTER.</em></h1><p>Where intelligent machines, connected sensors and AI work together to help every field perform better.</p><div className="hero-actions"><a className="primary" href="#technology">Enter the field <b>↓</b></a><a className="ghost" href="#dashboard">View live data</a></div></div>
      <div className="hero-track"><div className="field-lines"/><div className="crop-row row-one"/><div className="crop-row row-two"/><div className="hero-title hero-outline">PRECISION FARMING</div><div className="hero-title hero-fill">PRECISION FARMING</div><Tractor/></div>
      <div className="hero-chips"><span className="hero-chip">AI VISION <b>ON</b></span><span className="hero-chip">SOIL 68%</span><span className="hero-chip">WATER 42%</span></div>
      <div className="scroll-hint"><span/> TRACTOR DRIVING AUTOMATICALLY</div>
    </section>

    <section id="technology" className="section technology"><div className="section-kicker">01 / FIELD INTELLIGENCE</div><div className="section-head"><h2>One field.<br/><em>Connected.</em></h2><p>Agio brings the entire farm into one intelligent system — from soil beneath the crop to decisions above it.</p></div><div className="sensor-grid"><Sensor icon="◉" title="SOIL MOISTURE" value="68%" note="Optimal zone"/><Sensor icon="◒" title="TEMPERATURE" value="28.4°C" note="Field average"/><Sensor icon="⌁" title="HUMIDITY" value="74%" note="Stable"/><Sensor icon="✦" title="CROP HEALTH" value="94%" note="AI confidence"/></div></section>

    <section id="dashboard" className="dashboard"><div className="dashboard-top"><div><span className="live-dot"/> LIVE FARM MONITOR</div><span>FIELD A01 · SOUTH INDIA</span></div><div className="dashboard-main"><div className="map-card"><div className="map-grid"/><div className="map-field"><span/><span/><span/><span/><span/><span/></div><div className="map-pin pin-a">AI</div><div className="map-pin pin-b">S</div><div className="map-label">SMART FIELD / 02.4 HA</div></div><div className="dashboard-side"><div><small>FIELD SCORE</small><strong>92<span>/100</span></strong></div><div className="bar"><i style={{width:"92%"}}/></div><p>Crop conditions are healthy. Irrigation can remain in precision mode for the next 18 hours.</p><a href="#services">Open farm analytics ↗</a></div></div></section>

    <section id="services" className="section services"><div className="section-kicker">02 / WHAT AGIO CONNECTS</div><div className="service-list">{[["01","AI CROP VISION","Detect symptoms, crop stress and field anomalies from images."],["02","SMART IRRIGATION","Use moisture data to reduce unnecessary water and target the root zone."],["03","FARM IOT","Connect ESP32-class controllers, sensors and field equipment."],["04","DRONE + GPS","Map crops, inspect large areas and turn field observations into decisions."]].map(([n,t,d])=><article key={n} className="service"><span>{n}</span><h3>{t}</h3><p>{d}</p><b>↗</b></article>)}</div></section>

    <section id="about" className="closing"><div className="closing-orbit"/><span className="section-kicker">03 / THE FUTURE OF FARMING</span><h2>TECHNOLOGY<br/><em>MEETS EARTH.</em></h2><p>Built for farmers, engineers and the next generation of agriculture.</p><a className="primary" href="#top">Back to the field ↑</a></section>
    <footer><span>AGIO © 2026</span><span>SMART AGRICULTURE PLATFORM</span><span>BUILT FOR THE FIELD</span></footer>
  </main>;
}
