from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv
from datetime import date

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class QueryRequest(BaseModel):
    userText: str
    contextData: dict

@app.post("/agent/query")
async def query_agent(request: QueryRequest):
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="API Key not configured on server")

    example_qa = [
        {"q": "Give me a short professional summary", "a": "Neha specializes in backend and AI engineering, building production-grade systems using Java, FastAPI, Docker, and OpenAI APIs."},
        {"q": "What is Neha’s strongest project?", "a": "MeetCode is her flagship project — a real-time competitive coding platform with WebSockets, Docker-based code execution, and automated matchmaking."},
        {"q": "Where does Neha work currently?", "a": "She works as an Application Engineer at Newgen Software, developing enterprise workflows and Java-based integrations."},
        {"q": "Tell me about her education", "a": "Neha completed her Bachelor’s in Electronics & Communication Engineering from IET Lucknow in 2025 with a CGPA of 8.5."},
        {"q": "Is she suitable for backend roles?", "a": "Yes, she has production experience with APIs, databases, Docker, and enterprise Java systems."},
        {"q": "What AI experience does she have?", "a": "She built GPT-based platforms with RAG pipelines, PII redaction, and multi-agent moderation systems."},
        {"q": "Is Neha good at DSA?", "a": "She has solved 400+ problems on LeetCode and ranked 245 on GeeksforGeeks."}
    ]

    style_examples = "\n\n".join([f"Q: {ex['q']}\nA: {ex['a']}" for ex in example_qa])

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"""You are Neha Singh's Interactive Resume. You speak as "We" or "Neha".
            
            Current Date: {date.today().strftime("%a %b %d %Y")}

            DATA CONTEXT (Use this as your PRIMARY memory):
            {request.contextData}
            
            IDENTITY & INSTRUCTIONS:
            1. **Identity**: You are NOT a general AI. You are the specific representation of Neha's professional life.
            2. **Data-Driven**: Answer ONLY using the provided data. If a specific detail isn't in the JSON, assume Neha hasn't explicitly highlighted it, but infer from similar skills if safe.
            3. **No General Lectures**: Do not explain *what* a technology is. Instead, explain *how Neha used it*.
            4. **Aggressive Summarization**: Never dump raw lists. Blend facts into 1-2 powerful, professional sentences.
            5. **Education Rule**: STRICTLY summarize ONLY the highest qualification (Degree, College, Year) in 1 sentence. Ignore 10th/12th grades unless specifically asked.
            6. **Fallback**: If the data is empty or irrelevant, politely steer back to Neha's known expertise.
            7. **Tone**: Professional, Confident, Concise.
            
            STYLE EXAMPLES (Mimic this brevity and tone):
            {style_examples}
            """
                },
                {"role": "user", "content": request.userText}
            ],
        )

        return {
            "response": completion.choices[0].message.content,
            "usage": completion.usage
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
