
// ===== STORIES DATA =====
const storiesData = [
    {
        emoji: "🤖",
        title: "AI Se Paise Kaise Kamayein 2026",
        category: "tech",
        time: "2 min",
        tag: "Trending",
        tagClass: "tag-trending",
        thumbClass: "linear-gradient(135deg, #fef3c7, #fde68a)"
    },
    {
        emoji: "🏠",
        title: "₹5 Lakh Mein Ghar Kaise Banayein",
        category: "finance",
        time: "3 min",
        tag: "Popular",
        tagClass: "tag-popular",
        thumbClass: "linear-gradient(135deg, #dbeafe, #93c5fd)"
    },
    {
        emoji: "💄",
        title: "Winter Skincare Routine Tips",
        category: "beauty",
        time: "2 min",
        tag: "New",
        tagClass: "tag-new",
        thumbClass: "linear-gradient(135deg, #fce7f3, #f9a8d4)"
    },
    {
        emoji: "🏋️",
        title: "30 Din Mein Body Banayein",
        category: "health",
        time: "4 min",
        tag: "Fitness",
        tagClass: "tag-fitness",
        thumbClass: "linear-gradient(135deg, #d1fae5, #6ee7b7)"
    },
    {
        emoji: "✈️",
        title: "₹5000 Mein Goa Trip Plan",
        category: "travel",
        time: "3 min",
        tag: "Budget",
        tagClass: "tag-budget",
        thumbClass: "linear-gradient(135deg, #ede9fe, #c4b5fd)"
    },
    {
        emoji: "📈",
        title: "Best Stocks to Buy in 2026",
        category: "finance",
        time: "3 min",
        tag: "Investment",
        tagClass: "tag-investment",
        thumbClass: "linear-gradient(135deg, #fee2e2, #fca5a5)"
    },
    {
        emoji: "🎮",
        title: "GTA 6 Release Date Confirmed",
        category: "entertainment",
        time: "2 min",
        tag: "Hot",
        tagClass: "tag-hot",
        thumbClass: "linear-gradient(135deg, #e0f2fe, #7dd3fc)"
    },
    {
        emoji: "🍔",
        title: "5 Minute Mein Banayein Momos",
        category: "food",
        time: "2 min",
        tag: "Recipe",
        tagClass: "tag-recipe",
        thumbClass: "linear-gradient(135deg, #fef9c3, #fde047)"
    },
    {
        emoji: "📱",
        title: "Top 5 Phones Under ₹15000",
        category: "tech",
        time: "3 min",
        tag: "Trending",
        tagClass: "tag-trending",
        thumbClass: "linear-gradient(135deg, #fef3c7, #fde68a)"
    },
    {
        emoji: "🏏",
        title: "Virat Kohli Retirement News",
        category: "sports",
        time: "2 min",
        tag: "Hot",
        tagClass: "tag-hot",
        thumbClass: "linear-gradient(135deg, #fee2e2, #fca5a5)"
    },
    {
        emoji: "📚",
        title: "UPSC 2027 Preparation Guide",
        category: "education",
        time: "5 min",
        tag: "Popular",
        tagClass: "tag-popular",
        thumbClass: "linear-gradient(135deg, #dbeafe, #93c5fd)"
    },
    {
        emoji: "🧘",
        title: "Morning Yoga Routine for Beginners",
        category: "health",
        time: "3 min",
        tag: "New",
        tagClass: "tag-new",
        thumbClass: "linear-gradient(135deg, #fce7f3, #f9a8d4)"
    },
    {
        emoji: "🚗",
        title: "Best Electric Cars in India 2026",
        category: "tech",
        time: "4 min",
        tag: "Trending",
        tagClass: "tag-trending",
        thumbClass: "linear-gradient(135deg, #d1fae5, #6ee7b7)"
    },
    {
        emoji: "🎵",
        title: "Top 10 Bollywood Songs This Week",
        category: "entertainment",
        time: "2 min",
        tag: "Hot",
        tagClass: "tag-hot",
        thumbClass: "linear-gradient(135deg, #ede9fe, #c4b5fd)"
    },
    {
        emoji: "🍕",
        title: "Ghar Par Pizza Kaise Banayein",
        category: "food",
        time: "3 min",
        tag: "Recipe",
        tagClass: "tag-recipe",
        thumbClass: "linear-gradient(135deg, #fef9c3, #fde047)"
    },
    {
        emoji: "💼",
        title: "Freelancing Se ₹1 Lakh/Month",
        category: "finance",
        time: "4 min",
        tag: "Investment",
        tagClass: "tag-investment",
        thumbClass: "linear-gradient(135deg, #e0f2fe, #7dd3fc)"
    }
];

// ===== DOM ELEMENTS =====
const storiesGrid = document.getElementById('storiesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const navbar = document.getElementById('navbar');
const searchInput = document.getElementById('searchInput');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');
const catPills = document.querySelectorAll('.cat-pill');
const heroParticles = document.getElementById('heroParticles');

let currentPage = 0;
const storiesPerPage = 8;
let currentCategory = 'all';
let filteredStories = [...storiesData];

// ===== CREATE STORY CARD HTML =====
function createStoryCard(story, index) {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.dataset.category = story.category;
    card.innerHTML = `
        <div class="story-thumb" style="background: ${story.thumbClass}">
            ${story.emoji}
            <div class="play-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <polygon points="8,5 19,12 8,19"/>
                </svg>
            </div>
        </div>
        <div class="story-info">
            <h4>${story.title}</h4>
            <div class="story-meta">
                <span>${getCategoryEmoji(story.category)} ${capitalize(story.category)}</span>
                <span class="dot"></span>
                <span>${story.time}</span>
            </div>
            <span class="story-tag ${story.tagClass}">${story.tag}</span>
        </div>
    `;

    // Animate in with delay
    setTimeout(() => {
        card.classList.add('visible');
    }, index * 80);

    return card;
}

// ===== HELPER FUNCTIONS =====
function getCategoryEmoji(cat) {
    const emojis = {
        tech: '💻', entertainment: '🎬', sports: '🏏', finance: '💰',
        food: '🍔', travel: '✈️', beauty: '💄', education: '📚', health: '🏥'
    };
    return emojis[cat] || '📖';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== LOAD STORIES =====
function loadStories(reset = false) {
    if (reset) {
        storiesGrid.innerHTML = '';
        currentPage = 0;
    }

    const start = currentPage * storiesPerPage;
    const end = start + storiesPerPage;
    const pageStories = filteredStories.slice(start, end);

    pageStories.forEach((story, i) => {
        const card = createStoryCard(story, i);
        storiesGrid.appendChild(card);
    });

    currentPage++;

    // Hide load more if no more stories
    if (end >= filteredStories.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// ===== CATEGORY FILTER =====
catPills.forEach(pill => {
    pill.addEventListener('click', () => {
        // Update active pill
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        currentCategory = pill.dataset.category;

        if (currentCategory === 'all') {
            filteredStories = [...storiesData];
        } else {
            filteredStories = storiesData.filter(s => s.category === currentCategory);
        }

        loadStories(true);

        // Also filter trending cards
        filterTrendingCards(currentCategory);
    });
});

// ===== FILTER TRENDING CARDS =====
function filterTrendingCards(category) {
    const trendingCards = document.querySelectorAll('.trending-card');
    trendingCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
        filteredStories = currentCategory === 'all'
            ? [...storiesData]
            : storiesData.filter(s => s.category === currentCategory);
    } else {
        filteredStories = storiesData.filter(s =>
            s.title.toLowerCase().includes(query) ||
            s.category.toLowerCase().includes(query) ||
            s.tag.toLowerCase().includes(query)
        );
    }

    loadStories(true);
});

// ===== LOAD MORE =====
loadMoreBtn.addEventListener('click', () => {
    loadStories();
});

// ===== HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== SCROLL EVENTS =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shadow on scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const statNums = document.querySelectorAll('.stat-num');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const increment = target / 60;
                const duration = 1500;
                const stepTime = duration / 60;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }

                    // Format number
                    if (target >= 1000000) {
                        el.textContent = (current / 1000000).toFixed(1) + 'M+';
                    } else if (target >= 1000) {
                        el.textContent = Math.floor(current / 1000) + 'K+';
                    } else {
                        el.textContent = Math.floor(current) + '+';
                    }
                }, stepTime);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(num => observer.observe(num));
}

// ===== NEWSLETTER =====
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    newsletterMsg.textContent = '✅ Subscribed successfully! Welcome aboard!';
    newsletterMsg.style.color = '#fbbf24';
    newsletterForm.querySelector('input').value = '';

    setTimeout(() => {
        newsletterMsg.textContent = '';
    }, 4000);
});

// ===== HERO PARTICLES =====
function createParticles() {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        particle.style.animationDelay = (Math.random() * 4) + 's';
        heroParticles.appendChild(particle);
    }
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section, .featured-banner, .newsletter, .stats-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== TRENDING SCROLL DRAG =====
function initDragScroll() {
    const slider = document.getElementById('trendingScroll');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadStories();
    animateCounters();
    createParticles();
    initScrollReveal();
    initDragScroll();
});

