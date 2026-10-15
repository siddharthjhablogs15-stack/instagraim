
// ========== CURRENT DATE ==========
document.addEventListener('DOMContentLoaded', function() {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateEl.textContent = today.toLocaleDateString('hi-IN', options);
    }
});

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        const icon = this.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== IMAGE FILTER TABS ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const imageCards = document.querySelectorAll('.image-card');

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        imageCards.forEach(function(card) {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========== LIKE BUTTON TOGGLE ==========
const likeBtns = document.querySelectorAll('.like-btn');

likeBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('liked');
        const icon = this.querySelector('i');
        if (this.classList.contains('liked')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('🎉 धन्यवाद! आपने सफलतापूर्वक सब्सक्राइब कर लिया है: ' + email);
            this.reset();
        }
    });
}

// ========== SEARCH FUNCTIONALITY ==========
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        alert('🔍 "' + query + '" के लिए सर्च रिजल्ट जल्द आ रहे हैं...');
        // In production, redirect to search results page:
        // window.location.href = '/search?q=' + encodeURIComponent(query);
    }
}

// ========== LOAD MORE IMAGES ==========
const loadMoreBtn = document.getElementById('loadMoreImages');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        const btn = this;
        btn.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        // Simulate loading delay
        setTimeout(function() {
            const imageGrid = document.getElementById('imageGrid');
            const newCards = [
                {
                    category: 'entertainment',
                    img: 'https://via.placeholder.com/400x300/e74c3c/ffffff?text=New+Image+1',
                    title: 'नई ट्रेंडिंग इमेज - एंटरटेनमेंट',
                    time: '12 घंटे पहले',
                    views: '5.1K'
                },
                {
                    category: 'fashion',
                    img: 'https://via.placeholder.com/400x300/3498db/ffffff?text=New+Image+2',
                    title: 'फैशन वीक की बेस्ट तस्वीरें',
                    time: '14 घंटे पहले',
                    views: '3.8K'
                },
                {
                    category: 'nature',
                    img: 'https://via.placeholder.com/400x300/2ecc71/ffffff?text=New+Image+3',
                    title: 'प्रकृति की खूबसूरत तस्वीरें',
                    time: '16 घंटे पहले',
                    views: '7.4K'
                }
            ];

            newCards.forEach(function(card) {
                var article = document.createElement('article');
                article.className = 'image-card';
                article.setAttribute('data-category', card.category);
                article.style.animation = 'fadeIn 0.5s ease';
                article.innerHTML =
                    '<div class="card-image">' +
                        '<img src="' + card.img + '" alt="' + card.title + '" loading="lazy">' +
                        '<div class="card-overlay">' +
                            '<span class="category-badge hot">🔥 Hot</span>' +
                            '<button class="like-btn"><i class="far fa-heart"></i></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="card-content">' +
                        '<h3>' + card.title + '</h3>' +
                        '<p class="meta"><i class="fas fa-clock"></i> ' + card.time + ' <span class="dot">•</span> <i class="fas fa-eye"></i> ' + card.views + '</p>' +
                    '</div>';
                imageGrid.appendChild(article);
            });

            // Re-attach like button events for new cards
            var newLikeBtns = imageGrid.querySelectorAll('.like-btn:not(.attached)');
            newLikeBtns.forEach(function(btn) {
                btn.classList.add('attached');
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.classList.toggle('liked');
                    var icon = this.querySelector('i');
                    if (this.classList.contains('liked')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                    }
                });
            });

            btn.innerHTML = 'Load More Images <i class="fas fa-spinner"></i>';
            btn.disabled = false;
        }, 1500);
    });
}

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                var icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// ========== FADE IN ANIMATION ON SCROLL ==========
var style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(
