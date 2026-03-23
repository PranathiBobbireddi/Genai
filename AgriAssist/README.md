# AgriAssist: Multilingual GenAI Chatbot for Farmers

AgriAssist is now a fully functional Full-Stack application powered by **Google Gemini API** and **FAISS RAG Integration**. The system retrieves embedded agricultural knowledge before prompting the Gemini model.

## Folder Structure
- `/frontend/` - Contains the HTML/CSS/JS files for the User Interface.
- `/backend/` - Contains the Python FastAPI server, the RAG logic, and dependencies.

---

## How to Run the Application

Follow these steps exactly to start the full-stack Chatbot:

### 1. Configure your Gemini API Key
Open text editor to this file: `AgriAssist/backend/rag_pipeline.py`
Find the line at the top:
```python
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "PASTE_YOUR_KEY_HERE")
```
Replace `"PASTE_YOUR_KEY_HERE"` with your actual Google Gemini API Key.

### 2. Install Python Dependencies
Open your terminal (PowerShell or CMD) and navigate to the project directory:
```powershell
cd "c:\Users\Bobbireddi Pranathi\OneDrive\Documents\Desktop\GENAI\AgriAssist\backend"
```
Install all required libraries:
```powershell
pip install -r requirements.txt
```

### 3. Start the Backend Server
Once dependencies are installed, start the FastAPI server:
```powershell
uvicorn main:app --reload
```
You should see output indicating that Uvicorn is running on `http://127.0.0.1:8000`. Keep this terminal window open!

### 4. Open the Frontend
Navigate into the `AgriAssist/frontend` folder on your computer.
Simply double-click on **`index.html`** to open it in your web browser. 
(No complex web servers needed for the frontend!)

---

## Features
1. **Real AI Integration**: The mocked chat has been entirely replaced. Typing a query triggers a real `fetch()` request over to the python backend.
2. **FAISS RAG Vector Store**: A sample dataset of agricultural knowledge points is immediately embedded upon startup using sentence transformers. The bot performs a semantic similarity search to augment the prompt before calling Gemini.
3. **Structured Explanation**: The FastAPI backend parses the `gemini-1.5-flash` response into two distinct sections: The answer, and the Reasoning. This is instantly populated inside the frontend UI!
