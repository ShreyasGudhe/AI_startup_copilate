import React from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <div className="app-shell page">
      <Navbar />

      <main className="container" style={{ padding: "4rem 0 3rem" }}>
        <section className="surface section-stack" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          <div className="pill-row">
            <span className="pill">Trusted by solo founders</span>
            <span className="pill">Strategy-first AI</span>
            <span className="pill">Pitch-ready output</span>
          </div>
        </section>

        <section className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "center" }}>
          <div style={{ display: "grid", gap: "1.4rem" }}>
            <span className="eyebrow">Founder mode enabled</span>
            <h1 className="section-title">Build, validate, and pitch your startup with AI.</h1>
            <p className="section-copy">
              Turn rough ideas into structured opportunities with instant startup concepts, market insights, and pitch-ready messaging.
            </p>

            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <Link to="/ai" className="button button-primary">Start generating</Link>
              <Link to="/features" className="button button-secondary">Explore features</Link>
            </div>

            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", marginTop: "0.75rem" }}>
              {[
                ["01", "Idea generation"],
                ["02", "Market research"],
                ["03", "Investor pitch"],
              ].map(([number, label]) => (
                <div key={number} className="card" style={{ padding: "1rem" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#7dd3fc" }}>{number}</div>
                  <div className="muted" style={{ marginTop: "0.35rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card hero-card">
            <div style={{ display: "grid", gap: "1rem" }}>
              <div className="muted" style={{ fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Live preview</div>
              <div style={{
                borderRadius: "20px",
                padding: "1.35rem",
                background: "linear-gradient(180deg, rgba(56, 189, 248, 0.16), rgba(15, 23, 42, 0.35))",
                border: "1px solid rgba(125, 211, 252, 0.16)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>SaaS idea generator</div>
                    <div className="muted" style={{ fontSize: "0.92rem", marginTop: "0.2rem" }}>Describe your concept and get a structured output.</div>
                  </div>
                  <div style={{ width: "0.8rem", height: "0.8rem", borderRadius: "999px", background: "#22c55e", boxShadow: "0 0 0 8px rgba(34, 197, 94, 0.12)" }} />
                </div>
                <div style={{ marginTop: "1rem", display: "grid", gap: "0.85rem" }}>
                  {[
                    "Problem statement",
                    "Target audience",
                    "Revenue model",
                  ].map((item) => (
                    <div key={item} style={{ padding: "0.9rem 1rem", borderRadius: "16px", background: "rgba(15, 23, 42, 0.66)", border: "1px solid rgba(148, 163, 184, 0.12)" }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: "1.5rem" }} className="grid">
          <div className="surface section" style={{ display: "grid", gap: "1rem" }}>
            <span className="eyebrow" style={{ justifySelf: "start" }}>How it works</span>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {[
                ["1", "Describe the concept", "Start with a simple idea, problem, or market."],
                ["2", "Refine the strategy", "Turn rough thoughts into a clearer business case."],
                ["3", "Generate the pitch", "Produce investor-ready language and next steps."],
              ].map(([step, title, text]) => (
                <article key={step} className="card" style={{ padding: "1.2rem" }}>
                  <div style={{ fontSize: "0.9rem", color: "#7dd3fc", fontWeight: 800 }}>STEP {step}</div>
                  <h3 style={{ margin: "0.45rem 0 0.55rem", fontSize: "1.15rem" }}>{title}</h3>
                  <p className="section-copy" style={{ fontSize: "0.95rem" }}>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: "1.5rem" }}>
          {[
            ["120+", "starter prompts"],
            ["8 sec", "average response time"],
            ["3 views", "idea, research, pitch"],
          ].map(([value, label]) => (
            <div key={label} className="surface" style={{ padding: "1.25rem" }}>
              <div className="metric">
                <div className="metric-value">{value}</div>
                <div className="metric-label">{label}</div>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;