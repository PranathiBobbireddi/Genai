import os
import faiss
import numpy as np
import google.generativeai as genai
from sentence_transformers import SentenceTransformer

# Please paste your Gemini API Key here or set the environment variable.
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyDwPHew1-dqAUrd8t7nzffi9aeN6ij0dws")

if GEMINI_API_KEY != "PASTE_YOUR_KEY_HERE":
    genai.configure(api_key=GEMINI_API_KEY)

# Initialize models
try:
    llm_model = genai.GenerativeModel('gemini-2.5-flash')
    embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
except Exception as e:
    print("Warning: Model initialization failed. This is expected if dependencies are missing or key is invalid.")

# Mock Agricultural Dataset for RAG
knowledge_base = [
    "Rice (Paddy) requires significant water, continuous flooding is ideal during vegetative stages.",
    "Wheat is a winter (Rabi) crop in India, requiring cool weather during growth and warm during maturity.",
    "Excessive nitrogen fertilizer reduces yield and increases susceptibility to pests like Stem Borer.",
    "Neem oil spray is an effective organic pesticide for whiteflies and aphids.",
    "Cotton requires well-drained black or regur soils, and is highly sensitive to waterlogging.",
    "Sugarcane takes 12-18 months to mature and requires heavy irrigation.",
    "For alluvial soil, typical NPK fertilizer ratio of 4:2:1 works well for most grain crops.",
    "During Kharif season monitor for fungal outbreaks due to high humidity and rains.",
    "Split application of Urea prevents leaching losses and ensures slow nutrient release.",
    "Micro-irrigation such as drip is recommended for Maize to conserve water in dry areas."
]

print("Initializing RAG Knowledge Base indexing...")
try:
    embeddings = embedding_model.encode(knowledge_base)
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings, dtype=np.float32))
    print("Indexing complete.")
except Exception:
    pass # Will gracefully fail if sentence transformer hasn't downloaded yet during initialization.

def retrieve_context(query: str, top_k: int = 3):
    try:
        query_vector = embedding_model.encode([query])
        distances, indices = index.search(np.array(query_vector, dtype=np.float32), top_k)
        results = [knowledge_base[i] for i in indices[0] if i < len(knowledge_base)]
        return "\n".join(results)
    except:
        return "No local context found."

def generate_response(message: str, crop: str, location: str, season: str, language: str = "English"):
    if GEMINI_API_KEY == "PASTE_YOUR_KEY_HERE":
        return {
            "response": "Please configure your GEMINI_API_KEY in backend/rag_pipeline.py to activate real AI responses.",
            "reason": "The system cannot reach Google Gemini without a valid API key."
        }
        
    context = retrieve_context(message)
    
    prompt = f"""
You are an expert Agricultural AI Assistant. You answer farmer queries accurately.
IMPORTANT RULE: You MUST ONLY answer questions related to agriculture, farming, crops, fertilizers, pests, soil, weather, or agricultural schemes.
If the user's query is NOT related to agriculture, you MUST decline to answer and state that you are an agricultural assistant. Do not provide information on non-agricultural topics under any circumstances.
CRITICAL LANGUAGE REQUIREMENT: You MUST generate your ENTIRE response exclusively in {language}, regardless of the language of the provided context.

User Context: Crop: {crop}, Location: {location}, Season: {season}
Relevant Agricultural Knowledge (RAG):
{context}

User Query: {message}

Instructions:
1. First, determine if the query is strictly related to agriculture. If it is not, politely decline to answer.
2. If it is related, provide a direct, helpful answer to the user's query.
3. Provide a brief explanation of the reasoning.
4. Keep the tone simple and helpful for a farmer.
5. Format your response exactly like this:
Answer: <your direct answer or polite decline>
Reason: <your explanation or reason for declining>
"""
    try:
        response = llm_model.generate_content(prompt)
        text = response.text.strip()
        
        # Parse the output
        parts = text.split("Reason:", 1)
        if len(parts) == 2:
            ans = parts[0].replace("Answer:", "").strip()
            reason = parts[1].strip()
            return {"response": ans, "reason": reason}
        else:
            return {"response": text, "reason": "Generated automatically based on agricultural context."}
    except Exception as e:
        # Expose the specific error message to the frontend response
        return {"response": f"API Error Details: {str(e)}", "reason": str(e)}
