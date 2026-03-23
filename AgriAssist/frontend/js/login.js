document.addEventListener('DOMContentLoaded', () => {
    // If user is already logged in, instantly redirect to dashboard
    if (localStorage.getItem('agriUser')) {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('user-name').value.trim();
        const phone = document.getElementById('user-phone').value.trim();
        const lang = document.getElementById('user-lang').value;
        
        if (name && phone && lang) {
            const userData = {
                name: name,
                phone: phone,
                language: lang,
                loginDate: new Date().toISOString()
            };
            
            // Securely save credentials locally without a DB
            localStorage.setItem('agriUser', JSON.stringify(userData));
            
            // Redirect directly to the AgriAssist Dashboard
            window.location.href = 'index.html';
        }
    });
});
