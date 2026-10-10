
/* ===== RESET & BASE ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    background: #f9f9f9;
    color: #111;
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: inherit;
}

/* ===== NAVBAR ===== */
.navbar {
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
    padding: 0 24px;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 16px rgba(99, 102, 241, 0.35);
    transition: all 0.3s ease;
}

.navbar.scrolled {
    padding: 0 24px;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
}

.logo {
    font-size: 24px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.5px;
    cursor: pointer;
}

.logo span {
    color: #fbbf24;
}

.nav-links {
    display: flex;
    gap: 8px;
    align-items: center;
}

.nav-links a {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 24px;
    transition: all 0.2s ease;
}

.nav-links a:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.search-box {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.search-box:focus-within {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
}

.search-box input {
    background: transparent;
    border: none;
    padding: 8px 16px;
    color: #fff;
    font-size: 13px;
    width: 180px;
    outline: none;
}

.search-box input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.search-btn {
    background: transparent;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

/* Hamburger */
.hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
}

.hamburger span {
    width: 24px;
    height: 2.5px;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

/* ===== HERO ===== */
.hero {
    background: linear-gradient(135deg, #4f46e5, #7c3aed, #c026d3);
    padding: 60px 24px;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 600px;
    margin: 0 auto;
}

.hero h1 {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 12px;
    line-height: 1.2;
}

.hero p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 24px;
    line-height: 1.6;
}

.hero-btn {
    display: inline-block;
    background: #fbbf24;
    color: #111;
    font-weight: 700;
    padding: 14px 36px;
    border-radius: 30px;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(251, 191, 36, 0.4);
}

.hero-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(251, 191, 36, 0.5);
}

.hero-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    animation: floatUp linear infinite;
}

@keyframes floatUp {
    0% {
        transform: translateY(100%) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) scale(1);
        opacity: 0;
    }
}

/* ===== STATS BAR ===== */
.stats-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 28px 24px;
    max-width: 1200px;
    margin: 0 auto;
}

.stat-card {
    background: #fff;
    border-radius: 14px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
}

.stat-num {
    font-size: 28px;
    font-weight: 800;
    color: #6366f1;
    font-family: 'Courier New', monospace;
}

.stat-label {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* ===== CATEGORIES ===== */
.categories-section {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 16px 0;
}

.categories-scroll {
    display: flex;
    gap: 10px;
    padding: 0 24px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.categories-scroll::-webkit-scrollbar {
    display: none;
}

.cat-pill {
    flex-shrink: 0;
    padding: 10px 22px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    color: #555;
    font-family: inherit;
}

.cat-pill:hover {
    border-color: #6366f1;
    color: #6366f1;
    transform: translateY(-2px);
}

.cat-pill.active {
    background: #6366f1;
    color: #fff;
    border-color: #6366f1;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* ===== SECTION COMMON ===== */
.section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 0 16px;
}

.section-header h2 {
    font-size: 22px;
    font-weight: 700;
}

.see-all {
    font-size: 13px;
    color: #6366f1;
    font-weight: 600;
    transition: all 0.2s;
}

.see-all:hover {
    color: #4f46e5;
}

/* ===== TRENDING CARDS ===== */
.trending-scroll {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    padding-bottom: 20px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-snap-type: x mandatory;
}

.trending-scroll::-webkit-scrollbar {
    display: none;
}

.trending-card {
    flex-shrink: 0;
    width: 155px;
    height: 220px;
    border-radius: 18px;
    background: var(--card-bg);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 14px;
    scroll-snap-align: start;
}

.trending-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.tc-icon {
    position: absolute;
    top: 12px;
    left: 12px;
    font-size: 30px;
}

.tc-content {
    position: relative;
    z-index: 2;
}

.tc-title {
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.3;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.tc-views {
    color: rgba(255, 255, 255, 0.8);
    font-size: 11px;
    margin-top: 4px;
}

.tc-ring {
    position: absolute;
    inset: 0;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-radius: 18px;
    pointer-events: none;
}

/* ===== FEATURED BANNER ===== */
.featured-banner {
    max-width: 1200px;
    margin: 32px auto;
    background: linear-gradient(135deg, #1e1b4b, #312e81, #4338ca);
    border-radius: 24px;
    padding: 40px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-left: 24px;
    margin-right: 24px;
}

.fb-text h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
}

.fb-text p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 20px;
    line-height: 1.5;
}

.fb-btn {
    display: inline-block;
    background: #fbbf24;
    color: #111;
    font-weight: 700;
    padding: 12px 28px;
    border-radius: 24px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.fb-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
}

.fb-emoji {
    font-size: 72px;
    flex-shrink: 0;
}

/* ===== STORIES GRID ===== */
.stories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 18px;
    padding-bottom: 16px;
}

.story-card {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
}

.story-card.visible {
    opacity: 1;
    transform: translateY(0);
}

.story-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.story-thumb {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 52px;
    position: relative;
    overflow: hidden;
}

.story-thumb::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.05));
}

.play-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 2;
}

.story-card:hover .play-icon {
    background: #6366f1;
    transform: scale(1.1);
}

.story-info {
    padding: 14px;
}

.story-info h4 {
    font-size: 14px;
    font-weight: 700;
    color: #111;
    margin-bottom: 6px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.story-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: #888;
}

.story-meta .dot {
    width: 3px;
    height: 3px;
    background: #ccc;
    border-radius: 50%;
}

.story-tag {
    display: inline-block;
    margin-top: 8px;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 600;
}

.tag-trending { background: #fef3c7; color: #d97706; }
.tag-popular { background: #dbeafe; color: #2563eb; }
.tag-new { background: #fce7f3; color: #db2777; }
.tag-hot { background: #fee2e2; color: #dc2626; }
.tag-fitness { background: #d1fae5; color: #059669; }
.tag-budget { background: #ede9fe; color: #7c3aed; }
.tag-recipe { background: #fef9c3; color: #ca8a04; }
.tag-investment { background: #e0f2fe; color: #0284c7; }

/* ===== LOAD MORE ===== */
.load-more-wrap {
    text-align: center;
    padding: 20px 0 40px;
}

.load-more-btn {
    background: #6366f1;
    color: #fff;
    border: none;
    padding: 14px 36px;
    border-radius: 30px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
}

.load-more-btn:hover {
    background: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
}

/* ===== NEWSLETTER ===== */
.newsletter {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    padding: 48px 24px;
    text-align: center;
    color: #fff;
}

.newsletter h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
}

.newsletter p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 24px;
}

.newsletter-form {
    display: flex;
    gap: 10px;
    max-width: 450px;
    margin: 0 auto;
}

.newsletter-form input {
    flex: 1;
    padding: 14px 20px;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
    font-family: inherit;
}

.newsletter-form button {
    background: #fbbf24;
    color: #111;
    border: none;
    padding: 14px 28px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
}

.newsletter-form button:hover {
    background: #f59e0b;
}

.newsletter-msg {
    margin-top: 12px;
    font-size: 14px;
    font-weight: 600;
}

/* ===== BACK TO TOP ===== */
.back-to-top {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    background: #6366f1;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 999;
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.back-to-top:hover {
    background: #4f46e5;
    transform: translateY(-4px);
}

/* ===== FOOTER ===== */
.footer {
    background: #111;
    color: #999;
    padding: 40px 24px;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.f-logo {
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 8px;
}

.f-logo span {
    color: #fbbf24;
}

.f-tagline {
    font-size: 13px;
    color: #777;
    margin-bottom: 20px;
}

.footer-links {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.footer-links a {
    color: #999;
    font-size: 13px;
    transition: color 0.2s;
}

.footer-links a:hover {
    color: #fff;
}

.footer-social {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 20px;
}

.social-icon {
    width: 40px;
    height: 40px;
    background: #222;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.2s ease;
}

.social-icon:hover {
    background: #6366f1;
    transform: translateY(-3px);
}

.f-copyright {
    font-size: 11px;
    color: #555;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .nav-links {
        display: none;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        flex-direction: column;
        padding: 16px;
        gap: 4px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .nav-links.open {
        display: flex;
    }

    .nav-links a {
        padding: 12px 16px;
        border-radius: 12px;
    }

    .hamburger {
        display: flex;
    }

    .search-box input {
        width: 120px;
    }

    .hero h1 {
        font-size: 26px;
    }

    .hero p {
        font-size: 14px;
    }

    .stats-bar {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .stories-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .featured-banner {
        flex-direction: column;
        text-align: center;
        padding: 28px;
    }

    .fb-emoji {
        font-size: 48px;
    }

    .newsletter-form {
        flex-direction: column;
    }

    .stat-num {
        font-size: 22px;
    }
}

@media (max-width: 480px) {
    .stories-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .story-thumb {
        height: 160px;
        font-size: 40px;
    }

    .story-info {
        padding: 10px;
    }

    .story-info h4 {
        font-size: 12px;
    }

    .trending-card {
        width: 130px;
        height: 190px;
    }
}

