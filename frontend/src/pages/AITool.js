import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Send, 
  Loader2, 
  Copy, 
  Check, 
  AlertCircle,
  BrainCircuit,
  Lightbulb,
  History,
  Download,
  Bookmark,
  Zap,
  Target,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const promptTemplates = {
  startupIdea: {
    icon: Lightbulb,
    title: "Startup Idea",
    prompt: "Generate a innovative startup idea in the field of"
  },
  businessPlan: {
    icon: Target,
    title: "Business Plan",
    prompt: "Create a detailed business plan outline for"
  },
  marketing: {
    icon: TrendingUp,
    title: "Marketing Strategy",
    prompt: "Develop a marketing strategy for a product/service related to"
  },
  funding: {
    icon: DollarSign,
    title: "Funding Strategy",
    prompt: "Suggest funding strategies and investor pitches for"
  },
  team: {
    icon: Users,
    title: "Team Building",
    prompt: "Recommend team structure and hiring plan for"
  }
};

function AITool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (output && !loading) {
      setIsTyping(true);
      setDisplayedText("");
      let index = 0;
      const timer = setInterval(() => {
        if (index < output.length) {
          setDisplayedText(output.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 20); // Adjust speed as needed
      return () => clearInterval(timer);
    }
  }, [output, loading]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('aiHistory');
    const savedIdeas = localStorage.getItem('savedIdeas');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedIdeas) setSavedIdeas(JSON.parse(savedIdeas));
  }, []);

  const saveToHistory = (query, response) => {
    const newEntry = { query, response, timestamp: new Date().toISOString() };
    const newHistory = [newEntry, ...history.slice(0, 9)]; // Keep last 10
    setHistory(newHistory);
    localStorage.setItem('aiHistory', JSON.stringify(newHistory));
  };

  const saveIdea = () => {
    if (!output) return;
    const newIdea = { content: output, timestamp: new Date().toISOString() };
    const newSaved = [newIdea, ...savedIdeas];
    setSavedIdeas(newSaved);
    localStorage.setItem('savedIdeas', JSON.stringify(newSaved));
  };

  const exportIdea = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-idea.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const applyTemplate = (template) => {
    setSelectedTemplate(template);
    setInput(template.prompt + " ");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClick = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    setOutput("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/generate?query=${encodeURIComponent(input.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      setOutput(data.response);
      saveToHistory(input.trim(), data.response);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect to the AI engine. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell page" style={{
      background: `
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 35%),
        radial-gradient(circle at 75% 75%, rgba(30, 58, 138, 0.2) 0%, transparent 40%),
        radial-gradient(circle at 50% 10%, rgba(67, 56, 202, 0.1) 0%, transparent 30%),
        radial-gradient(circle at 10% 90%, rgba(37, 99, 235, 0.12) 0%, transparent 25%),
        radial-gradient(circle at 90% 40%, rgba(79, 70, 229, 0.08) 0%, transparent 20%),
        linear-gradient(135deg, #000000 0%, #0f0f23 20%, #1a1a2e 40%, #16213e 60%, #0f0f23 80%, #000000 100%),
        linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0%, transparent 50%, rgba(30, 58, 138, 0.02) 100%)
      `,
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 0
      }}>
        {/* Floating orbs */}
        <motion.div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "250px",
            height: "250px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(50px)"
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, rgba(67, 56, 202, 0.18) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(45px)"
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "20%",
            width: "140px",
            height: "140px",
            background: "radial-gradient(circle, rgba(30, 58, 138, 0.16) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(35px)"
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: "40%",
            left: "60%",
            width: "100px",
            height: "100px",
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.14) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(30px)"
          }}
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Geometric patterns */}
        <motion.div
          style={{
            position: "absolute",
            top: "30%",
            right: "30%",
            width: "100px",
            height: "100px",
            background: "conic-gradient(from 0deg, rgba(59, 130, 246, 0.1), rgba(67, 56, 202, 0.08), rgba(30, 58, 138, 0.06), rgba(37, 99, 235, 0.08), rgba(59, 130, 246, 0.1))",
            borderRadius: "50%",
            transform: "rotate(45deg)"
          }}
          animate={{
            rotate: [45, 135, 45],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid pattern overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.3
        }} />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "3px",
              height: "3px",
              background: `rgba(${59 + Math.random() * 20}, ${130 + Math.random() * 20}, ${246 + Math.random() * 20}, 0.6)`,
              borderRadius: "50%"
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <main className="container" style={{ padding: "6rem 0 4rem", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Hero Section */}
        <motion.div
          className="page-heading"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <motion.span
            className="eyebrow"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "50px",
              fontSize: "0.875rem",
              fontWeight: "600",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            AI-Powered Business Intelligence
          </motion.span>
          <motion.h1
            className="section-title"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "800",
              color: "#f8fafc",
              margin: "0 0 1.5rem 0",
              lineHeight: "1.1",
              letterSpacing: "-0.02em"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform Ideas into
            <span style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: "0.5rem"
            }}>
              Strategic Success
            </span>
          </motion.h1>
          <motion.p
            className="section-copy"
            style={{
              maxWidth: "700px",
              margin: "0 auto 2.5rem",
              fontSize: "1.25rem",
              color: "#94a3b8",
              lineHeight: "1.6",
              fontWeight: "400"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Leverage advanced AI to analyze your startup concepts, validate market opportunities,
            and develop comprehensive business strategies with data-driven insights.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                background: showHistory ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.1)",
                border: `1px solid ${showHistory ? "#3b82f6" : "rgba(59, 130, 246, 0.3)"}`,
                color: "#3b82f6",
                padding: "0.875rem 1.75rem",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)"
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(59, 130, 246, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <History className="w-4 h-4" />
              Query History ({history.length})
            </motion.button>
            <motion.button
              onClick={() => setShowSaved(!showSaved)}
              style={{
                background: showSaved ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.1)",
                border: `1px solid ${showSaved ? "#22c55e" : "rgba(34, 197, 94, 0.3)"}`,
                color: "#22c55e",
                padding: "0.875rem 1.75rem",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)"
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(34, 197, 94, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark className="w-4 h-4" />
              Saved Ideas ({savedIdeas.length})
            </motion.button>
          </motion.div>
        </motion.div>

        {/* History Section */}
        <AnimatePresence>
          {showHistory && (
            <motion.section
              style={{ maxWidth: "1100px", margin: "3rem auto" }}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                className="card"
                style={{
                  padding: "2.5rem",
                  background: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(71, 85, 105, 0.2)",
                  borderRadius: "20px",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                  }}>
                    <History className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.5rem", fontWeight: "700", color: "#f8fafc" }}>
                      Query History
                    </h3>
                    <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>
                      Review your previous AI analyses and insights
                    </p>
                  </div>
                </div>

                {history.length === 0 ? (
                  <motion.div
                    style={{
                      textAlign: "center",
                      padding: "3rem",
                      color: "#64748b",
                      background: "rgba(15, 23, 42, 0.4)",
                      borderRadius: "16px",
                      border: "2px dashed rgba(71, 85, 105, 0.3)"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "0.5rem" }}>
                      No queries yet
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>
                      Start by entering your startup idea above to see your analysis history here.
                    </p>
                  </motion.div>
                ) : (
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    {history.map((entry, index) => (
                      <motion.div
                        key={index}
                        style={{
                          padding: "1.5rem",
                          background: "rgba(15, 23, 42, 0.6)",
                          borderRadius: "16px",
                          border: "1px solid rgba(71, 85, 105, 0.2)",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease"
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.1)",
                          borderColor: "rgba(59, 130, 246, 0.3)"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                          <div style={{
                            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                            color: "white",
                            padding: "0.375rem 0.875rem",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.375rem"
                          }}>
                            <Zap className="w-3 h-3" />
                            Query #{history.length - index}
                          </div>
                          <span style={{
                            color: "#64748b",
                            fontSize: "0.85rem",
                            background: "rgba(71, 85, 105, 0.3)",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "12px"
                          }}>
                            {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p style={{
                          color: "#3b82f6",
                          fontWeight: "600",
                          margin: "0 0 0.75rem 0",
                          fontSize: "1rem",
                          lineHeight: "1.4"
                        }}>
                          {entry.query}
                        </p>
                        <p style={{
                          color: "#e2e8f0",
                          margin: 0,
                          fontSize: "0.95rem",
                          lineHeight: "1.6",
                          opacity: 0.9
                        }}>
                          {entry.response.length > 300 ? `${entry.response.slice(0, 300)}...` : entry.response}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Saved Ideas Section */}
        <AnimatePresence>
          {showSaved && (
            <motion.section
              style={{ maxWidth: "1100px", margin: "3rem auto" }}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                className="card"
                style={{
                  padding: "2.5rem",
                  background: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(71, 85, 105, 0.2)",
                  borderRadius: "20px",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)"
                  }}>
                    <Bookmark className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.5rem", fontWeight: "700", color: "#f8fafc" }}>
                      Saved Ideas
                    </h3>
                    <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>
                      Your curated collection of promising startup concepts
                    </p>
                  </div>
                </div>

                {savedIdeas.length === 0 ? (
                  <motion.div
                    style={{
                      textAlign: "center",
                      padding: "3rem",
                      color: "#64748b",
                      background: "rgba(15, 23, 42, 0.4)",
                      borderRadius: "16px",
                      border: "2px dashed rgba(71, 85, 105, 0.3)"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "0.5rem" }}>
                      No saved ideas yet
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>
                      Generate and save your favorite startup ideas to build your collection.
                    </p>
                  </motion.div>
                ) : (
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    {savedIdeas.map((idea, index) => (
                      <motion.div
                        key={index}
                        style={{
                          padding: "1.5rem",
                          background: "rgba(15, 23, 42, 0.6)",
                          borderRadius: "16px",
                          border: "1px solid rgba(71, 85, 105, 0.2)",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease"
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(34, 197, 94, 0.1)",
                          borderColor: "rgba(34, 197, 94, 0.3)"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                          <div style={{
                            background: "linear-gradient(135deg, #22c55e, #16a34a)",
                            color: "white",
                            padding: "0.375rem 0.875rem",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.375rem"
                          }}>
                            <Bookmark className="w-3 h-3" />
                            Saved Idea #{savedIdeas.length - index}
                          </div>
                          <span style={{
                            color: "#64748b",
                            fontSize: "0.85rem",
                            background: "rgba(71, 85, 105, 0.3)",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "12px"
                          }}>
                            {new Date(idea.timestamp).toLocaleDateString()} {new Date(idea.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p style={{
                          color: "#e2e8f0",
                          margin: 0,
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          opacity: 0.95
                        }}>
                          {idea.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        <section style={{ maxWidth: "1000px", margin: "4rem auto 0" }}>
          {/* Prompt Templates */}
          <motion.div
            className="card"
            style={{
              padding: "2.5rem",
              marginBottom: "3rem",
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(71, 85, 105, 0.2)",
              borderRadius: "20px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
              }}>
                <Zap className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.5rem", fontWeight: "700", color: "#f8fafc" }}>
                  Quick Start Templates
                </h3>
                <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>
                  Jumpstart your analysis with pre-built business scenarios
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {Object.entries(promptTemplates).map(([key, template], index) => {
                const Icon = template.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => applyTemplate(template)}
                    style={{
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(71, 85, 105, 0.2)",
                      padding: "1.5rem",
                      borderRadius: "16px",
                      color: "#e2e8f0",
                      fontSize: "0.95rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "1rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "left",
                      backdropFilter: "blur(10px)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 12px 30px rgba(139, 92, 246, 0.15)",
                      borderColor: "rgba(139, 92, 246, 0.4)",
                      background: "rgba(139, 92, 246, 0.05)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                    }}>
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "600", color: "#f8fafc" }}>
                        {template.title}
                      </h4>
                      <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.4" }}>
                        {template.prompt.replace("Generate a innovative startup idea in the field of", "Generate innovative ideas in")}
                        {template.prompt.replace("Create a detailed business plan outline for", "Develop business plans for")}
                        {template.prompt.replace("Develop a marketing strategy for a product/service related to", "Create marketing strategies for")}
                        {template.prompt.replace("Suggest funding strategies and investor pitches for", "Plan funding strategies for")}
                        {template.prompt.replace("Recommend team structure and hiring plan for", "Design team structures for")}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <div className="grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "2.5rem",
            marginTop: "2rem"
          }}>

            {/* Input Card */}
            <motion.div
              className="card"
              style={{
                padding: "2.5rem",
                background: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(71, 85, 105, 0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                height: "fit-content"
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.01 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)"
                }}>
                  <motion.div
                    animate={input ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Lightbulb className={input ? "text-slate-900 w-6 h-6" : "text-slate-700 w-6 h-6"} />
                  </motion.div>
                </div>
                <div>
                  <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.5rem", fontWeight: "700", color: "#f8fafc" }}>
                    Your Business Concept
                  </h3>
                  <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>
                    Describe your startup idea for AI-powered analysis
                  </p>
                </div>
              </div>

              <motion.textarea
                placeholder="Example: A mobile app that connects local farmers directly with consumers, eliminating middlemen and ensuring fair prices..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  width: "100%",
                  height: "160px",
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "2px solid rgba(71, 85, 105, 0.3)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  color: "#f8fafc",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  resize: "none",
                  outline: "none",
                  transition: "all 0.3s ease",
                  lineHeight: "1.6"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(71, 85, 105, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
                animate={input ? { borderColor: "#3b82f6", boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" } : {}}
                transition={{ duration: 0.3 }}
              />

              <motion.button
                onClick={handleClick}
                disabled={loading || !input.trim()}
                style={{
                  background: input.trim() ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" : "rgba(71, 85, 105, 0.3)",
                  color: input.trim() ? "#ffffff" : "#64748b",
                  border: "none",
                  padding: "1.25rem 2rem",
                  borderRadius: "14px",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  boxShadow: input.trim() ? "0 8px 25px rgba(59, 130, 246, 0.3)" : "none",
                  position: "relative",
                  overflow: "hidden"
                }}
                whileHover={input.trim() ? {
                  scale: 1.02,
                  boxShadow: "0 12px 35px rgba(59, 130, 246, 0.4)"
                } : {}}
                whileTap={input.trim() ? { scale: 0.98 } : {}}
                animate={loading ? { scale: [1, 1.01, 1] } : {}}
                transition={{ duration: 0.8, repeat: loading ? Infinity : 0 }}
              >
                {input.trim() && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                    }}
                    animate={{ left: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                )}
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <motion.div
                    animate={input.trim() ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                )}
                {loading ? "Analyzing Your Idea..." : "Generate Business Analysis"}
              </motion.button>
            </motion.div>

            {/* Output Card */}
            <motion.div
              className="card"
              style={{
                padding: "2.5rem",
                background: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(71, 85, 105, 0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                minHeight: "500px",
                position: "relative",
                overflow: "hidden"
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* Animated background gradient */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(45deg, rgba(59, 130, 246, 0.03), rgba(34, 197, 94, 0.03), rgba(139, 92, 246, 0.03))",
                  opacity: output ? 0.5 : 0,
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                  }}>
                    <motion.div
                      animate={output ? { rotate: 360 } : {}}
                      transition={{ duration: 3, repeat: output ? Infinity : 0, ease: "linear" }}
                    >
                      <BrainCircuit className="text-white w-6 h-6" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.5rem", fontWeight: "700", color: "#f8fafc" }}>
                      AI Business Analysis
                    </h3>
                    <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>
                      Comprehensive market insights and strategic recommendations
                    </p>
                  </div>
                  {isTyping && (
                    <motion.div
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      style={{ width: "4px", height: "24px", background: "#3b82f6", borderRadius: "2px", marginLeft: "0.5rem" }}
                    />
                  )}
                </div>
                {output && (
                  <motion.div
                    style={{ display: "flex", gap: "0.5rem" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.button
                      onClick={saveIdea}
                      style={{
                        background: "rgba(34, 197, 94, 0.1)",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        color: "#22c55e",
                        padding: "0.75rem",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)"
                      }}
                      title="Save Analysis"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(34, 197, 94, 0.2)",
                        boxShadow: "0 6px 20px rgba(34, 197, 94, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bookmark className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={exportIdea}
                      style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                        color: "#f59e0b",
                        padding: "0.75rem",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)"
                      }}
                      title="Export Analysis"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(245, 158, 11, 0.2)",
                        boxShadow: "0 6px 20px rgba(245, 158, 11, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={handleCopy}
                      style={{
                        background: "rgba(59, 130, 246, 0.1)",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        color: "#3b82f6",
                        padding: "0.75rem",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)"
                      }}
                      title="Copy to Clipboard"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? <Check className="text-emerald-400 w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </motion.button>
                  </motion.div>
                )}
              </div>

              <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        gap: "2rem"
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-16 h-16 text-blue-400" />
                      </motion.div>
                      <div style={{ textAlign: "center" }}>
                        <motion.p
                          style={{ color: "#3b82f6", fontSize: "1.2rem", fontWeight: "600", margin: "0 0 0.5rem 0" }}
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Analyzing Your Business Concept
                        </motion.p>
                        <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0 }}>
                          Processing market data, competitive analysis, and strategic insights...
                        </p>
                      </div>
                      <motion.div
                        style={{
                          width: "240px",
                          height: "6px",
                          background: "rgba(71, 85, 105, 0.3)",
                          borderRadius: "3px",
                          overflow: "hidden"
                        }}
                      >
                        <motion.div
                          style={{
                            height: "100%",
                            background: "linear-gradient(90deg, #3b82f6, #22c55e, #f59e0b, #8b5cf6)",
                            borderRadius: "3px"
                          }}
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.div>
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      style={{
                        padding: "2rem",
                        borderRadius: "16px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        display: "flex",
                        gap: "1rem",
                        color: "#fca5a5",
                        backdropFilter: "blur(10px)"
                      }}
                    >
                      <motion.div
                        animate={{ x: [-3, 3, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      >
                        <AlertCircle className="w-6 h-6 shrink-0 text-red-400" />
                      </motion.div>
                      <div>
                        <p style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "600", color: "#fca5a5" }}>
                          Analysis Error
                        </p>
                        <p style={{ margin: 0, fontSize: "1rem", color: "#fca5a5", opacity: 0.9 }}>
                          {error}
                        </p>
                      </div>
                    </motion.div>
                  ) : output ? (
                    <motion.div
                      key="output"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        color: "#e2e8f0",
                        lineHeight: "1.7",
                        whiteSpace: "pre-wrap",
                        fontSize: "1.05rem",
                        position: "relative",
                        padding: "1rem",
                        background: "rgba(15, 23, 42, 0.4)",
                        borderRadius: "12px",
                        border: "1px solid rgba(71, 85, 105, 0.2)"
                      }}
                    >
                      {/* Decorative corner elements */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        style={{
                          position: "absolute",
                          top: "-6px",
                          left: "-6px",
                          width: "12px",
                          height: "12px",
                          background: "linear-gradient(135deg, #3b82f6, #22c55e)",
                          borderRadius: "50%"
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          width: "12px",
                          height: "12px",
                          background: "linear-gradient(135deg, #f59e0b, #8b5cf6)",
                          borderRadius: "50%"
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        style={{
                          position: "absolute",
                          bottom: "-6px",
                          left: "-6px",
                          width: "12px",
                          height: "12px",
                          background: "linear-gradient(135deg, #ec4899, #3b82f6)",
                          borderRadius: "50%"
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        style={{
                          position: "absolute",
                          bottom: "-6px",
                          right: "-6px",
                          width: "12px",
                          height: "12px",
                          background: "linear-gradient(135deg, #22c55e, #f59e0b)",
                          borderRadius: "50%"
                        }}
                      />
                      {displayedText}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          style={{ color: "#3b82f6", fontWeight: "bold", fontSize: "1.2rem" }}
                        >
                          |
                        </motion.span>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        gap: "1.5rem",
                        opacity: 0.6
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Send className="w-12 h-12 text-slate-500" />
                      </motion.div>
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "1.2rem", fontWeight: "500", color: "#64748b", margin: "0 0 0.5rem 0" }}>
                          Ready for Your Analysis
                        </p>
                        <p style={{ fontSize: "1rem", color: "#64748b", margin: 0 }}>
                          Enter your business concept above to receive comprehensive AI insights
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
      </div>
    </div>
  );
}

export default AITool;