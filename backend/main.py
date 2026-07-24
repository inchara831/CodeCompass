from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os
import time

# Load .env
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise Exception("❌ GEMINI_API_KEY not found in .env file")

# Gemini Client
client = genai.Client(api_key=API_KEY)

# FastAPI App
app = FastAPI(title="Code Compass Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class UserInput(BaseModel):
    text: str


# Home Route
@app.get("/")
def home():
    return {
        "message": "🚀 Code Compass Backend Running"
    }


# Chat Route
@app.post("/chat")
async def chat(user_input: UserInput):
    start = time.time()

    try:
        print("\n==============================")
        print("📩 New Request Received")
        print("Question:", user_input.text)

        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=user_input.text,
        )

        end = time.time()

        print("✅ Gemini replied successfully")
        print(f"⏱ Time Taken: {end - start:.2f} seconds")
        print("==============================\n")

        return {
            "response": response.text
        }

    except Exception as e:
        end = time.time()

        print("\n❌ ERROR")
        print(e)
        print(f"⏱ Failed after {end - start:.2f} seconds")
        print("==============================\n")

        return {
            "response": f"Error: {str(e)}"
        }


# Run Server
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )