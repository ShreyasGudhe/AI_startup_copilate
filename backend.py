import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq


def load_env_file(path: str = "Backend/.env") -> None:
    if not os.path.exists(path):
        return

    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now - update with your frontend URL in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

_model = None

def get_model():
    global _model
    if _model is not None:
        return _model

    load_env_file()
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not set")

    _model = Groq(api_key=api_key)
    return _model

@app.get("/")
def home():
    return {"message": "Backend working"}

@app.get("/generate")
def generate(query: str):
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    try:
        model = get_model()
        system_prompt = """You are an expert AI business consultant specializing in startup development and innovation. Your task is to provide comprehensive, actionable business analysis and strategic recommendations.

When analyzing a business idea or query, structure your response with the following framework:

1. **EXECUTIVE SUMMARY** (2-3 sentences)
   - Brief overview of the opportunity
   - Key strengths and market potential
   - Main recommendation

2. **MARKET ANALYSIS**
   - Target market size and growth potential
   - Competitive landscape
   - Market trends and opportunities

3. **BUSINESS MODEL ASSESSMENT**
   - Revenue streams and pricing strategy
   - Cost structure and profitability
   - Scalability potential

4. **TECHNICAL FEASIBILITY**
   - Technology requirements
   - Development complexity
   - Time-to-market considerations

5. **FINANCIAL PROJECTIONS**
   - Startup costs and funding requirements
   - Revenue projections (3-5 years)
   - Break-even analysis

6. **RISKS & MITIGATION**
   - Key risks and challenges
   - Mitigation strategies
   - Contingency plans

7. **IMPLEMENTATION ROADMAP**
   - Phase 1: MVP development (3 months)
   - Phase 2: Market validation (6 months)
   - Phase 3: Scale and growth (12+ months)

8. **SUCCESS METRICS**
   - Key performance indicators
   - Milestones and checkpoints
   - Exit strategy considerations

Provide specific, actionable recommendations with realistic timelines and budget estimates. Focus on creating sustainable, scalable business models with clear paths to profitability."""

        response = model.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": query}
            ],
            max_tokens=4000,
            temperature=0.7
        )

        return {"response": response.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)