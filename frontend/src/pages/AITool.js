import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AITool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Correct: inside component
  const handleClick = async () => {
    try {
      const trimmed = input.trim();
      if (!trimmed) {
        setOutput("Please enter an idea to generate a response.");
        return;
      }

      setLoading(true);

      const res = await fetch(`/generate?query=${encodeURIComponent(trimmed)}`);
      const isJson = res.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await res.json() : null;

      if (!res.ok) {
        const detail = data?.detail ? ` (${data.detail})` : "";
        throw new Error(`Request failed: ${res.status}${detail}`);
      }

      setOutput(data?.response || "No response returned from backend.");
    } catch (error) {
      console.error(error);
      setOutput(error?.message || "Error connecting to backend. Check that the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell page">
      <Navbar />

      <main className="container" style={{ padding: "4rem 0 3rem" }}>
        <section
          className="surface section"
          style={{ maxWidth: "1040px", margin: "0 auto" }}
        >
          <div
            className="page-heading page-heading-left"
            style={{ marginBottom: "1.4rem" }}
          >
            <span className="eyebrow">AI startup tool</span>
            <h1 className="section-title">
              Generate a sharper startup angle in seconds.
            </h1>
            <p className="section-copy">
              Enter a raw idea and get a structured response.
            </p>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* INPUT */}
            <div className="card" style={{ padding: "1.25rem" }}>
              <input
                type="text"
                placeholder="Enter your idea..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="input-field"
              />

              <button
                onClick={handleClick}
                className="button button-primary"
                style={{ marginTop: "15px" }}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Insight"}
              </button>
            </div>

            {/* OUTPUT */}
            <div className="card" style={{ padding: "1.25rem" }}>
              <h3>Output</h3>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <p>{output || "AI response will appear here..."}</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AITool;