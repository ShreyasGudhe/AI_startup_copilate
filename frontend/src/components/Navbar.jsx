import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="container" style={{ paddingTop: "1rem" }}>
      <div className="glass" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem 1.25rem",
        borderRadius: "24px",
        position: "relative",
        zIndex: 1,
        flexWrap: "wrap"
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <span style={{
            width: "2.6rem",
            height: "2.6rem",
            borderRadius: "18px",
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, #38bdf8, #f97316)",
            color: "#020617",
            fontWeight: 900,
            boxShadow: "0 12px 30px rgba(56, 189, 248, 0.32)"
          }}>SC</span>
          <div>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Startup Copilot</div>
            <div className="muted" style={{ fontSize: "0.84rem" }}>AI tools for founders</div>
          </div>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`} to="/features">Features</NavLink>
          <NavLink className={({ isActive }) => `nav-link nav-link-accent ${isActive ? "nav-link-active" : ""}`} to="/ai">AI Tool</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;