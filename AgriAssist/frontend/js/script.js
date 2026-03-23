/**
 * AgriAssist - Fully Integrated App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Authentication Route Guard ---
    const userDataStr = localStorage.getItem('agriUser');
    if (!userDataStr) {
        window.location.href = 'login.html';
        return;
    }
    const userData = JSON.parse(userDataStr);
    
    // Display Username in Header
    setTimeout(() => {
        const greetingEl = document.getElementById('user-greeting');
        if (greetingEl) {
            greetingEl.textContent = `Welcome, ${userData.name.split(' ')[0]}!`;
        }
    }, 100);

    // --- DOM Elements ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const langSwitchBtn = document.getElementById('lang-switch');
    const langText = document.getElementById('lang-text');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    const navBtns = document.querySelectorAll('.nav-btn');
    const pageSections = document.querySelectorAll('.page-section');
    const goToDashboardBtn = document.getElementById('go-to-dashboard-btn');

    const contextForm = document.getElementById('context-form');
    const profileSummary = document.getElementById('profile-summary');
    const summaryText = document.getElementById('summary-text');
    const editContextBtn = document.getElementById('edit-context');

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const voiceBtn = document.querySelector('.voice-btn');

    // --- Translations Dictionary ---
    const translations = {
        'ENG': {
            'nav-home': 'Home',
            'nav-dash': 'Dashboard',
            'nav-about': 'About',
            'hero-title': 'Welcome to AgriAssist',
            'hero-desc': 'Your multilingual AI companion for smart farming. Get real-time advice on crops, fertilizers, pest control, and government schemes.',
            'hero-btn': 'Go to Dashboard <i class="fa-solid fa-arrow-right"></i>',
            'feat1-title': 'Multilingual Support',
            'feat1-desc': 'Communicate in English or Telugu effortlessly with a simple switch.',
            'feat2-title': 'AI-Powered Chat',
            'feat2-desc': 'Ask anything related to agriculture and get instant, reliable answers.',
            'feat3-title': 'Personalized Context',
            'feat3-desc': 'Save your farm details to get tailored advice for your specific crops and soil.',
            'ctx-title': '<i class="fa-solid fa-seedling"></i> Farm Context',
            'ctx-crop': 'Crop Type',
            'ctx-loc': 'Location',
            'ctx-season': 'Season',
            'ctx-soil': 'Soil Condition (Optional)',
            'ctx-btn': 'Save Context',
            'ins-title': '<i class="fa-solid fa-lightbulb"></i> Insights',
            'ins-tip1-title': 'Weather Tip',
            'ins-tip1-desc': 'Good time to sow seeds; clear skies expected next week.',
            'ins-tip2-title': 'Pest Alert',
            'ins-tip2-desc': 'High risk of Stem Borer detected in your region.',
            'chat-title': 'Agri Bot',
            'chat-status': 'Online',
            'about-title': '<i class="fa-solid fa-circle-info"></i> About AgriAssist',
            'about-desc1': 'AgriAssist is an innovative Multilingual GenAI Chatbot specifically designed for farmers. Our goal is to bridge the information gap by providing a smart, easy-to-use, and localized assistant that understands regional agricultural contexts.',
            'about-mission-title': 'Our Mission',
            'about-mission-desc': 'To empower farmers with modern technology, helping them make informed decisions about crop management, soil health, pest control, and market trends, thereby increasing yield and sustainability.',
            'about-feat-title': 'Key Features',
            'about-f1': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> Context-Aware Responses',
            'about-f2': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> Multi-Language Support',
            'about-f3': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> Real-Time Explainability',
            'about-f4': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> Smart Visual Interface',
            'about-footer': 'Developed with <i class="fa-solid fa-heart" style="color: var(--danger-color);"></i> for Agriculture.',
            'ctx-edit': 'Edit Profile',
            'opt-crop-sel': 'Select crop...',
            'opt-crop-rice': 'Rice (Paddy)',
            'opt-crop-wheat': 'Wheat',
            'opt-crop-cotton': 'Cotton',
            'opt-crop-sugar': 'Sugarcane',
            'opt-crop-maize': 'Maize',
            'opt-sea-sel': 'Select season...',
            'opt-sea-khari': 'Kharif (Monsoon)',
            'opt-sea-rabi': 'Rabi (Winter)',
            'opt-sea-zaid': 'Zaid (Summer)',
            'opt-soil-sel': 'Select soil type...',
            'opt-soil-alluv': 'Alluvial',
            'opt-soil-black': 'Black / Regur',
            'opt-soil-red': 'Red / Yellow',
            'opt-soil-later': 'Laterite'
        },
        'TEL': {
            'nav-home': 'హోమ్',
            'nav-dash': 'డాష్‌బోర్డ్',
            'nav-about': 'గురించి',
            'hero-title': 'AgriAssist కి స్వాగతం',
            'hero-desc': 'స్మార్ట్ ఫార్మింగ్ కోసం మీ బహుభాషా AI సహచరుడు. పంటలు, ఎరువులు మరియు పథకాలపై నిజ-సమయ సలహాలు పొందండి.',
            'hero-btn': 'డాష్‌బోర్డ్‌కు వెళ్లండి <i class="fa-solid fa-arrow-right"></i>',
            'feat1-title': 'బహుభాషా మద్దతు',
            'feat1-desc': 'సాధారణ స్విచ్‌తో ఇంగ్లీషు లేదా తెలుగులో సులభంగా కమ్యూనికేట్ చేయండి.',
            'feat2-title': 'AI-శక్తితో కూడిన చాట్',
            'feat2-desc': 'వ్యవసాయానికి సంబంధించిన ఏదైనా అడగండి మరియు తక్షణ సమాధానాలు పొందండి.',
            'feat3-title': 'వ్యక్తిగతీకరించిన ప్లాన్',
            'feat3-desc': 'మీ నిర్దిష్ట పంటలు కోసం తగిన సలహాలను పొందడానికి వివరాలను సేవ్ చేయండి.',
            'ctx-title': '<i class="fa-solid fa-seedling"></i> పొలం వివరాలు',
            'ctx-crop': 'పంట రకం',
            'ctx-loc': 'ప్రాంతం',
            'ctx-season': 'సీజన్',
            'ctx-soil': 'నేల రకం (ఐచ్ఛికం)',
            'ctx-btn': 'వివరాలను సేవ్ చేయండి',
            'ins-title': '<i class="fa-solid fa-lightbulb"></i> వాతావరణ సమాచారం',
            'ins-tip1-title': 'వాతావరణం',
            'ins-tip1-desc': 'విత్తనాలు నాటడానికి మంచి సమయం; వచ్చే వారం ఆకాశం స్పష్టంగా ఉంటుంది.',
            'ins-tip2-title': 'తెగుళ్ల హెచ్చరిక',
            'ins-tip2-desc': 'మీ ప్రాంతంలో పురుగుల ప్రమాదం ఎక్కువగా ఉంది.',
            'chat-title': 'అగ్రి బాట్',
            'chat-status': 'ఆన్‌లైన్',
            'about-title': '<i class="fa-solid fa-circle-info"></i> AgriAssist గురించి',
            'about-desc1': 'AgriAssist రైతుల కోసం ప్రత్యేకంగా రూపొందించబడిన వినూత్న బహుభాషా చాట్‌బాట్. స్థానిక వ్యవసాయ పద్ధతులను అర్థం చేసుకునే స్మార్ట్ సహాయకుడిని అందించడం మా లక్ష్యం.',
            'about-mission-title': 'మా లక్ష్యం',
            'about-mission-desc': 'ఆధునిక సాంకేతికతతో రైతులను బలోపేతం చేయడం, దిగుబడి మరియు స్థిరత్వాన్ని పెంచడంలో సహాయపడటం.',
            'about-feat-title': 'ముఖ్య లక్షణాలు',
            'about-f1': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> సందర్భానుసార స్పందనలు',
            'about-f2': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> బహుభాషా మద్దతు',
            'about-f3': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> వివరణాత్మక సమాధానాలు',
            'about-f4': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> స్మార్ట్ ఇంటర్‌ఫేస్',
            'about-footer': 'వ్యవసాయం కోసం <i class="fa-solid fa-heart" style="color: var(--danger-color);"></i> తో అభివృద్ధి చేయబడింది.',
            'ctx-edit': 'ప్రొఫైల్ సవరించండి',
            'opt-crop-sel': 'పంటను ఎంచుకోండి...',
            'opt-crop-rice': 'వరి (Paddy)',
            'opt-crop-wheat': 'గోధుమ (Wheat)',
            'opt-crop-cotton': 'పత్తి (Cotton)',
            'opt-crop-sugar': 'చెరకు (Sugarcane)',
            'opt-crop-maize': 'మొక్కజొన్న (Maize)',
            'opt-sea-sel': 'సీజన్‌ని ఎంచుకోండి...',
            'opt-sea-khari': 'ఖరీఫ్ (Monsoon)',
            'opt-sea-rabi': 'రబీ (Winter)',
            'opt-sea-zaid': 'జైద్ (Summer)',
            'opt-soil-sel': 'నేల రకాన్ని ఎంచుకోండి...',
            'opt-soil-alluv': 'ఒండ్రు నేల (Alluvial)',
            'opt-soil-black': 'నల్ల రేగడి (Black)',
            'opt-soil-red': 'ఎర్ర నేల (Red)',
            'opt-soil-later': 'లాటరైట్ నేల (Laterite)'
        },
        'HIN': {
            'nav-home': 'होम',
            'nav-dash': 'डैशबोर्ड',
            'nav-about': 'के बारे में',
            'hero-title': 'AgriAssist में आपका स्वागत है',
            'hero-desc': 'स्मार्ट फार्मिंग के लिए आपका बहुभाषी AI साथी। फसलों, उर्वरकों और सरकारी योजनाओं पर वास्तविक समय की सलाह प्राप्त करें।',
            'hero-btn': 'डैशबोर्ड पर जाएं <i class="fa-solid fa-arrow-right"></i>',
            'feat1-title': 'बहुभाषी समर्थन',
            'feat1-desc': 'एक साधारण स्विच के साथ अंग्रेजी, तेलुगू या हिंदी में आसानी से संवाद करें।',
            'feat2-title': 'AI-संचालित चैट',
            'feat2-desc': 'कृषि से संबंधित कुछ भी पूछें और त्वरित, विश्वसनीय उत्तर प्राप्त करें।',
            'feat3-title': 'व्यक्तिगत योजना',
            'feat3-desc': 'अपनी विशिष्ट फसलों और मिट्टी के लिए अनुकूलित सलाह प्राप्त करने के लिए अपने खेत का विवरण सहेजें।',
            'ctx-title': '<i class="fa-solid fa-seedling"></i> खेत का विवरण',
            'ctx-crop': 'फसल का प्रकार',
            'ctx-loc': 'स्थान',
            'ctx-season': 'मौसम',
            'ctx-soil': 'मिट्टी की स्थिति (वैकल्पिक)',
            'ctx-btn': 'विवरण सहेजें',
            'ins-title': '<i class="fa-solid fa-lightbulb"></i> मौसम की जानकारी',
            'ins-tip1-title': 'मौसम टिप',
            'ins-tip1-desc': 'बीज बोने का अच्छा समय; अगले सप्ताह आसमान साफ रहने की उम्मीद है।',
            'ins-tip2-title': 'कीट चेतावनी',
            'ins-tip2-desc': 'आपके क्षेत्र में स्टेम बोरर का उच्च जोखिम।',
            'chat-title': 'एग्री बॉट',
            'chat-status': 'ऑनलाइन',
            'about-title': '<i class="fa-solid fa-circle-info"></i> AgriAssist के बारे में',
            'about-desc1': 'AgriAssist विशेष रूप से किसानों के लिए डिज़ाइन किया गया एक अभिनव बहुभाषी चैटबॉट है। हमारा लक्ष्य एक स्मार्ट सहायक प्रदान करके सूचना अंतर को पाटना है जो क्षेत्रीय कृषि को समझता है।',
            'about-mission-title': 'हमारा मिशन',
            'about-mission-desc': 'आधुनिक तकनीक के साथ किसानों को सशक्त बनाना, जिससे उपज और स्थिरता बढ़ाने में मदद मिले।',
            'about-feat-title': 'मुख्य विशेषताएं',
            'about-f1': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> प्रासंगिक प्रतिक्रियाएं',
            'about-f2': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> बहुभाषी समर्थन',
            'about-f3': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> वास्तविक समय व्याख्या',
            'about-f4': '<i class="fa-solid fa-check text-success" style="margin-right: 0.5rem;"></i> स्मार्ट इंटरफ़ेस',
            'about-footer': 'कृषि के लिए <i class="fa-solid fa-heart" style="color: var(--danger-color);"></i> के साथ विकसित किया गया।',
            'ctx-edit': 'प्रोफ़ाइल संपादित करें',
            'opt-crop-sel': 'फसल चुनें...',
            'opt-crop-rice': 'चावल (धान)',
            'opt-crop-wheat': 'गेहूँ',
            'opt-crop-cotton': 'कपास',
            'opt-crop-sugar': 'गन्ना',
            'opt-crop-maize': 'मक्का',
            'opt-sea-sel': 'मौसम चुनें...',
            'opt-sea-khari': 'खरीफ (मानसून)',
            'opt-sea-rabi': 'रबी (सर्दी)',
            'opt-sea-zaid': 'ज़ायद (गर्मी)',
            'opt-soil-sel': 'मिट्टी का प्रकार चुनें...',
            'opt-soil-alluv': 'जलोढ़ (Alluvial)',
            'opt-soil-black': 'काली मिट्टी (Black)',
            'opt-soil-red': 'लाल मिट्टी (Red)',
            'opt-soil-later': 'लेटरराइट (Laterite)'
        }
    };

    // --- State Variables ---
    let farmContext = {
        crop: "",
        location: "",
        season: "",
        soil: ""
    };
    let isDarkMode = false;
    let currentLang = userData.language || 'ENG';

    // --- 1. Theme Toggling (Dark/Light Mode) ---
    themeToggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    // --- 2. Language Toggling (Full Layout Swap) ---
    langSwitchBtn.addEventListener('click', () => {
        const langs = ['ENG', 'TEL', 'HIN'];
        currentLang = langs[(langs.indexOf(currentLang) + 1) % langs.length];
        langText.textContent = currentLang;
        
        // Update tags correctly
        if(currentLang === 'TEL') {
            document.getElementById('tagline-text').innerText = "మీ స్మార్ట్ వ్యవసాయ సహాయకుడు";
            document.getElementById('chat-input').placeholder = "పంటలు, ఎరువులు, తెగుళ్లు గురించి అడగండి...";
        } else if(currentLang === 'HIN') {
            document.getElementById('tagline-text').innerText = "आपका स्मार्ट फार्मिंग सहायक";
            document.getElementById('chat-input').placeholder = "फसलों, उर्वरकों या योजनाओं के बारे में पूछें...";
        } else {
            document.getElementById('tagline-text').innerText = "Your Smart Farming Assistant";
            document.getElementById('chat-input').placeholder = "Ask about crops, fertilizers, pests, or schemes...";
        }

        // Apply translations map loop
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
    });

    // --- 3. Mobile Menu Toggle ---
    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.right = '2rem';
            navLinks.style.backgroundColor = 'var(--surface-color)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = 'var(--radius-md)';
            navLinks.style.boxShadow = 'var(--shadow-md)';
            navLinks.style.gap = '1rem';
        }
    });

    // --- Navigation Logic ---
    function navigateTo(targetId) {
        // Hide all sections
        pageSections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }

        // Update active class on nav links
        navBtns.forEach(btn => {
            if (btn.dataset.target === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Close mobile menu if open
        if (window.innerWidth <= 992 && navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.dataset.target;
            navigateTo(targetId);
        });
    });

    if (goToDashboardBtn) {
        goToDashboardBtn.addEventListener('click', () => {
            navigateTo('dashboard-section');
        });
    }

    // --- 4. Context Saving Logic ---
    contextForm.addEventListener('submit', (e) => {
        e.preventDefault();
        farmContext.crop = document.getElementById('crop-type').value;
        farmContext.location = document.getElementById('location').value;
        farmContext.season = document.getElementById('season').value;
        farmContext.soil = document.getElementById('soil').value || 'Not specified';

        contextForm.classList.add('hidden');
        profileSummary.classList.remove('hidden');

        const t = translations[currentLang];
        summaryText.innerHTML = `
            <strong><span data-i18n="ctx-crop">${t['ctx-crop']}</span>:</strong> ${capitalize(farmContext.crop)} <br>
            <strong><span data-i18n="ctx-loc">${t['ctx-loc']}</span>:</strong> ${farmContext.location} <br>
            <strong><span data-i18n="ctx-season">${t['ctx-season']}</span>:</strong> ${capitalize(farmContext.season)} <br>
            <strong><span data-i18n="ctx-soil">${t['ctx-soil']}</span>:</strong> ${capitalize(farmContext.soil)}
        `;

        addBotMessage(`I've updated your profile for growing **${capitalize(farmContext.crop)}** in **${farmContext.location}** during the **${capitalize(farmContext.season)}** season. How can I assist you today?`, false);
        
        // Fetch Live Weather Insights
        fetchLiveWeather(farmContext.location);
    });

    const WEATHER_API_KEY = "c9638bf568abb546f35c7f5a030a00f6";

    async function fetchLiveWeather(location) {
        if (!location) return;
        
        const tipCard = document.querySelector('.tip-card');
        if (!tipCard) return;
        
        const weatherTitle = tipCard.querySelector('h4');
        const weatherDesc = tipCard.querySelector('p');
        const weatherIcon = tipCard.querySelector('i');
        
        try {
            weatherDesc.textContent = "Fetching live weather...";
            
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`);
            const data = await response.json();
            
            if (response.ok) {
                const temp = Math.round(data.main.temp);
                const desc = data.weather[0].description;
                const cleanDesc = capitalize(desc);
                
                weatherTitle.innerHTML = `Live Weather: <strong>${data.name}</strong>`;
                weatherDesc.innerHTML = `<strong>${temp}°C</strong>, ${cleanDesc}.`;
                
                // Prevent translation engine from overwriting the live data text
                weatherTitle.removeAttribute('data-i18n');
                weatherDesc.removeAttribute('data-i18n');
                
                if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('storm')) {
                    weatherIcon.className = "fa-solid fa-cloud-rain";
                } else if (desc.includes('cloud')) {
                    weatherIcon.className = "fa-solid fa-cloud";
                } else {
                    weatherIcon.className = "fa-solid fa-sun";
                }
            } else {
                weatherDesc.textContent = "Could not find weather for this location. Ensure city is correct.";
            }
        } catch (error) {
            console.error("Weather API Error:", error);
            weatherDesc.textContent = "Error fetching weather.";
        }
    }
    editContextBtn.addEventListener('click', () => {
        profileSummary.classList.add('hidden');
        contextForm.classList.remove('hidden');
    });

    // --- 5. Chat Interface Logic (REAL BACKEND INTEGRATION) ---
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if(!msg) return;

        // Add user message to UI
        addUserMessage(msg);
        chatInput.value = '';

        // Show typing indicator
        typingIndicator.classList.remove('hidden');
        scrollToBottom();

        try {
            // Fetch configuration from local FastAPI Backend
            const langName = currentLang === 'TEL' ? 'Telugu' : currentLang === 'HIN' ? 'Hindi' : 'English';
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: msg,
                    crop: farmContext.crop,
                    location: farmContext.location,
                    season: farmContext.season,
                    language: langName
                })
            });

            const data = await response.json();
            typingIndicator.classList.add('hidden');

            if(response.ok) {
                // If the response string is just asking for an API Key
                const isSystemMessage = data.response.includes("API_KEY");
                // Stop showing the reasoning block in the chatbot UI
                addBotMessage(data.response, false, '');
            } else {
                addBotMessage("Sorry, the server returned an error: " + response.statusText, true, "HTTP Request Failed.");
            }

        } catch (error) {
            typingIndicator.classList.add('hidden');
            addBotMessage("Error: Could not connect to the backend server.", true, "Please ensure you have started the Python FastAPI backend `uvicorn main:app --reload`.");
        }
    });

    function addUserMessage(text) {
        const msgHTML = `
            <div class="message user">
                <div class="bubble">
                    <p>${escapeHTML(text)}</p>
                    <span class="timestamp">${getCurrentTime()}</span>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', msgHTML);
        scrollToBottom();
    }

    function addBotMessage(text, includeReasoning = false, reasoningText = "") {
        let reasoningHTML = '';
        if(includeReasoning && reasoningText) {
            reasoningHTML = `
                <div class="reasoning-block">
                    <h4><i class="fa-solid fa-microchip"></i> Reasoning:</h4>
                    ${formatMarkdownBold(escapeHTML(reasoningText))}
                </div>
            `;
        }

        const msgHTML = `
            <div class="message bot">
                <div class="bubble">
                    <p>${formatMarkdownBold(escapeHTML(text))}</p>
                    ${reasoningHTML}
                    <span class="timestamp">${getCurrentTime()}</span>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', msgHTML);
        scrollToBottom();
    }

    // --- 7. Voice Input Logic ---
    if (voiceBtn) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                voiceBtn.classList.add('recording');
                voiceBtn.innerHTML = '<i class="fa-solid fa-microphone-lines fa-fade"></i>';
                voiceBtn.style.color = 'var(--danger-color, #dc3545)';
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                chatInput.value = transcript;
                // We will NOT automatically submit the form to prevent API spam. 
                // The user can edit the text and click the Send button manually.
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                voiceBtn.classList.remove('recording');
                voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
                voiceBtn.style.color = '';
            };

            recognition.onend = () => {
                voiceBtn.classList.remove('recording');
                voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
                voiceBtn.style.color = '';
            };

            voiceBtn.addEventListener('click', () => {
                // Set language based on active UI language
                if (currentLang === 'TEL') {
                    recognition.lang = 'te-IN';
                } else if (currentLang === 'HIN') {
                    recognition.lang = 'hi-IN';
                } else {
                    recognition.lang = 'en-US';
                }
                
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                }

                try {
                    recognition.start();
                } catch(e) {
                    console.error(e);
                }
            });
        } else {
            voiceBtn.addEventListener('click', () => {
                alert("Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.");
            });
        }
    }

    // --- Logout Logic ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to logout from AgriAssist?")) {
                localStorage.removeItem('agriUser');
                window.location.href = 'login.html';
            }
        });
    }

    // --- Helpers ---
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }

    function formatMarkdownBold(str) {
        return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    function capitalize(str) {
        if(!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

});
