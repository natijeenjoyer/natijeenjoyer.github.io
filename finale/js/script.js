const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = root.style.getPropertyValue('--bg-color-light');
    if (currentTheme === '#f5f5f5') {
        root.style.setProperty('--bg-color-light', '#00274D');
        root.style.setProperty('--text-color-light', '#FFD700');
        root.style.setProperty('--card-bg', '#00274D');
    } else {
        root.style.setProperty('--bg-color-light', '#f5f5f5');
        root.style.setProperty('--text-color-light', '#333');
        root.style.setProperty('--card-bg', '#ffffff');
    }
});

// Authentication Modal
const authModal = document.getElementById('auth-modal');
const authButton = document.getElementById('auth-button');
const closeModal = document.getElementById('close-modal');
const authForm = document.getElementById('auth-form');

// Toggle modal visibility
authButton.addEventListener('click', () => {
    authModal.classList.add('visible');
});
closeModal.addEventListener('click', () => {
    authModal.classList.remove('visible');
});

// Form submission
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    alert(`Welcome, ${email}!`);
    authModal.classList.remove('visible');
});

// Search functionality
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search news...';
searchInput.className = 'search-bar';
document.querySelector('.navbar').appendChild(searchInput);

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

const validateForm = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!emailRegex.test(email)) {
        alert('Invalid email format!');
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters, include a number and a special character.');
        return false;
    }
    return true;
};
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert('Form submitted successfully!');
        authModal.classList.add('hidden');
    }
});

const fetchNews = async () => {
    const apiKey = 'd7fd005935084360b0d68f70c10bcd3b';
    
    const url = 'https://newsapi.org/v2/everything?q=tesla&from=2024-10-19&sortBy=publishedAt&apiKey=d7fd005935084360b0d68f70c10bcd3b';
    try {
        const response = await fetch(url);
        const data = await response.json();

        const newsFeed = document.querySelector('.news-feed');
        newsFeed.innerHTML = ''; // Очищаем старые карточки

        data.articles.forEach((article) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3 class="card-title">${article.title}</h3>
                <p class="card-description">${article.description || 'No description available.'}</p>
                <button class="btn">Read More</button>
            `;
            newsFeed.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

document.addEventListener('DOMContentLoaded', fetchNews);
