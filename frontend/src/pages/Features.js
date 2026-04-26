import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Features() {
  return (
    <div className="app-shell page">
      <Navbar />

      <main className="container" style={{ padding: "4rem 0 3rem" }}>
        <div className="page-heading">
          <span className="eyebrow" style={{ justifySelf: "center" }}>Product features</span>
          <h1 className="section-title">Everything a founder needs in one place.</h1>
          <p className="section-copy" style={{ maxWidth: "760px", margin: "0 auto" }}>
            The experience is designed to feel fast and premium, with focused workflows for idea discovery, validation, and presentation.
          </p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
            {
              title: "Idea Generator",
              text: "Create startup concepts with clear problem statements, target users, and differentiators.",
            },
            {
              title: "Market Research",
              text: "Scan opportunities, competitors, and trends with a workflow built for quick decisions.",
            },
            {
              title: "Pitch Deck Builder",
              text: "Turn your concept into investor-friendly messaging with a polished structure.",
            },
          ].map((feature) => (
            <article key={feature.title} className="card" style={{ padding: "1.4rem", minHeight: "100%" }}>
              <div style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "18px",
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg, rgba(56, 189, 248, 0.22), rgba(249, 115, 22, 0.22))",
                marginBottom: "1rem",
                fontSize: "1.2rem"
              }}>✦</div>
              <h3 style={{ margin: 0, fontSize: "1.3rem" }}>{feature.title}</h3>
              <p className="section-copy" style={{ fontSize: "0.98rem", marginTop: "0.8rem" }}>{feature.text}</p>
            </article>
          ))}
        </div>

        <section className="surface section" style={{ marginTop: "1.5rem" }}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", alignItems: "center" }}>
            <div className="section-stack">
              <span className="eyebrow" style={{ justifySelf: "start" }}>Workflow</span>
              <h2 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2.3rem)", letterSpacing: "-0.03em" }}>A focused path from idea to investor story.</h2>
              <p className="section-copy" style={{ fontSize: "0.98rem" }}>
                The interface stays out of the way and keeps the next action obvious, which is what makes the product feel professional.
              </p>
            </div>
            <div className="card" style={{ padding: "1.2rem" }}>
              <div className="pill-row">
                <span className="pill">Discover</span>
                <span className="pill">Validate</span>
                <span className="pill">Launch</span>
              </div>
              <div style={{ marginTop: "1rem", display: "grid", gap: "0.8rem" }}>
                {[
                  "Generate startup concepts from one sentence.",
                  "Compare opportunities and identify the strongest angle.",
                  "Draft a sharper pitch in one clean flow.",
                ].map((item) => (
                  <div key={item} style={{ padding: "0.9rem 1rem", borderRadius: "16px", background: "rgba(15, 23, 42, 0.72)", border: "1px solid rgba(148, 163, 184, 0.12)" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Features;