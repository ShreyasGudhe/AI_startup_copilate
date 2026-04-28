import React from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  BarChart3, 
  FileText, 
  Zap, 
  ShieldCheck, 
  Target, 
  ArrowRight,
  TrendingUp,
  Users
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

function Features() {
  const features = [
    {
      title: "Idea Generator",
      text: "Transform a simple spark into a full-scale startup concept with clear problem statements and unique selling points.",
      icon: <Lightbulb className="w-6 h-6 text-sky-400" />,
      color: "rgba(56, 189, 248, 0.2)"
    },
    {
      title: "Market Insight",
      text: "Advanced scanning of market opportunities, competitor analysis, and emerging trends to give you a strategic edge.",
      icon: <Target className="w-6 h-6 text-orange-400" />,
      color: "rgba(249, 115, 22, 0.2)"
    },
    {
      title: "Pitch Perfect",
      text: "Convert your validated concept into high-impact, investor-ready messaging with professional structure and flow.",
      icon: <FileText className="w-6 h-6 text-emerald-400" />,
      color: "rgba(16, 185, 129, 0.2)"
    },
    {
      title: "High Velocity",
      text: "Built for speed. Navigate from discovery to validation in minutes, not months.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      color: "rgba(234, 179, 8, 0.2)"
    },
    {
      title: "Growth Metrics",
      text: "Visualize your potential trajectory with data-driven projections and trend analysis.",
      icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
      color: "rgba(99, 102, 241, 0.2)"
    },
    {
      title: "User Personas",
      text: "Deep dive into your target audience with auto-generated demographic profiles and pain points.",
      icon: <Users className="w-6 h-6 text-rose-400" />,
      color: "rgba(244, 63, 94, 0.2)"
    }
  ];

  return (
    <div className="app-shell page">
      <Navbar />

      <main className="container" style={{ padding: "8rem 0 6rem" }}>
        <motion.div 
          className="page-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow" style={{ justifySelf: "center" }}>Capabilities</span>
          <h1 className="section-title" style={{ maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            The complete toolkit for the <span style={{ color: "#38bdf8" }}>modern founder.</span>
          </h1>
          <p className="section-copy" style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.25rem" }}>
            Everything you need to discover, validate, and articulate your vision, supercharged by purpose-built AI.
          </p>
        </motion.div>

        <motion.div 
          className="grid" 
          style={{ 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginTop: "4rem"
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.article 
              key={idx} 
              className="card" 
              style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "16px",
                display: "grid",
                placeItems: "center",
                background: feature.color,
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                {feature.icon}
              </div>
              <div>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem", fontWeight: "700", color: "#f8fafc" }}>
                  {feature.title}
                </h3>
                <p className="section-copy" style={{ fontSize: "0.95rem", margin: 0 }}>
                  {feature.text}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <section className="surface section" style={{ marginTop: "6rem", overflow: "hidden" }}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "center", gap: "4rem" }}>
            <motion.div 
              className="section-stack"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                <ShieldCheck className="text-sky-400 w-5 h-5" />
                <span className="eyebrow" style={{ margin: 0 }}>Enterprise Grade</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "2.5rem", fontWeight: "800", letterSpacing: "-0.04em", color: "#f8fafc" }}>
                Built for professional workflows.
              </h2>
              <p className="section-copy" style={{ marginTop: "1.5rem" }}>
                The interface stays out of the way, keeping your attention on the work. Experience a flow that feels like a natural extension of your creative process.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <button style={{
                  background: "#38bdf8",
                  color: "#020617",
                  border: "none",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "12px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  transition: "opacity 0.2s"
                }}>
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              className="card" 
              style={{ 
                padding: "2rem", 
                position: "relative", 
                backgroundColor: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(56, 189, 248, 0.2)"
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="pill-row">
                <span className="pill" style={{ background: "rgba(56, 189, 248, 0.15)", color: "#7dd3fc" }}>Discover</span>
                <span className="pill">Validate</span>
                <span className="pill">Launch</span>
              </div>
              <div style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
                {[
                  { label: "Idea Synthesis", status: "completed" },
                  { label: "Market Competitor Mapping", status: "active" },
                  { label: "Financial Modeling", status: "pending" }
                ].map((item, i) => (
                  <div key={i} style={{ 
                    padding: "1rem", 
                    borderRadius: "14px", 
                    background: "rgba(15, 23, 42, 0.8)", 
                    border: "1px solid rgba(148, 163, 184, 0.15)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <span style={{ fontSize: "0.95rem", color: "#f1f5f9" }}>{item.label}</span>
                    <div style={{ 
                      width: "8px", 
                      height: "8px", 
                      borderRadius: "50%", 
                      backgroundColor: item.status === "active" ? "#38bdf8" : i === 0 ? "#10b981" : "#475569",
                      boxShadow: item.status === "active" ? "0 0 10px #38bdf8" : "none"
                    }} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Features;