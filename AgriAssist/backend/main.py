from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_pipeline import generate_response

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    crop: str = ""
    location: str = ""
    season: str = ""
    language: str = "English"

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    return generate_response(
        request.message, 
        request.crop, 
        request.location, 
        request.season,
        request.language
    )
