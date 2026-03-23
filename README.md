# AgriAssist 🌾🤖

AgriAssist is a **multilingual, context-aware Generative AI Chatbot** designed to help farmers make intelligent, data-driven decisions. By seamlessly combining an intelligent Retrieval-Augmented Generation (RAG) backend with a beautifully modern frontend interface, AgriAssist provides instant advice on crop management, pest control, weather insights, and government agricultural schemes.

---

## ✨ Key Features

- **Multilingual UI & AI Responses**: Fully localized and instantly translatable between English, Telugu (తెలుగు), and Hindi (हिंदी).
- **Farm Context Awareness**: Save your crop type, state/location, season, and soil condition to receive personalized, highly accurate agricultural advice.
- **Native Voice Assistant**: Uses browser-native Web Speech APIs to listen to your voice (Speech-to-Text) in any of the localized languages, preventing API rate-limit exhaustion.
- **Live Weather Integration**: Automatically detects your location and seamlessly fetches real-time temperature and weather conditions via the OpenWeatherMap API for dynamic insight cards.
- **Explainable AI (RAG Pipeline)**: Powered by Google Gemini 1.5 Flash and FAISS embeddings. 

## 🛠️ Technology Stack

* **Frontend**: HTML5, Vanilla CSS (Custom Theming, Dark Mode), JavaScript (Native Web APIs, LocalStorage)
* **Backend**: Python, FastAPI, Uvicorn 
* **AI & NLP**: `google-generativeai` (Gemini 1.5 Flash), `sentence-transformers`, `faiss-cpu`

---

## 🚀 How to Run Locally

### 1. Backend Setup
Navigate to the `backend` folder and install the required Python packages:

```bash
cd backend
pip install -r requirements.txt
```

Set your Google Gemini API Key in `rag_pipeline.py` or `.env` and start the server:

```bash
uvicorn main:app --reload
```

### 2. Frontend Setup
Simply open `frontend/login.html` in any modern web browser! The system will automatically use `localStorage` to save your session and language preference before routing you securely to the `index.html` dashboard.

*Note: Ensure to put your OpenWeatherMap API key in `script.js` to enable the live weather insights feature.*

---
<div align="center">
  <i>Developed with ❤️ for Agriculture by Pranathi Bobbireddi</i>
</div>
