
// ============================================================
//  INSTAGRAIM.IN — FRONTEND API INTEGRATION
//  This connects the frontend UI to the backend APIs
// ============================================================

const API_BASE = window.location.origin + '/api';

// ============================================================
//  1. VIDEO DOWNLOAD HANDLER
// ============================================================

let currentPlatform = 'youtube';

function switchPlatform(platform, el) {
    currentPlatform = platform;
    document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');

    const input = document.getElementById('videoUrl');
    const placeholders = {
        youtube: 'Paste YouTube video URL here... (e.g., https://youtube.com/watch?v=...)',
        instagram: 'Paste Instagram Reel/Post URL here... (e.g., https://instagram.com/reel/...)',
        facebook: 'Paste Facebook video URL here... (e.g., https://facebook.com/watch/...)'
    };
    input.placeholder = placeholders[platform];
}

async function handleDownload() {
    const url = document.getElementById('videoUrl').value.trim();
    const btn = document.querySelector('.download-box button');

    if (!url) {
        showToast('⚠️ Please paste a valid video URL!', 'warning');
        return;
    }

    // Auto-detect platform
    if (url.includes('youtube.com') || url.includes('youtu.be')) currentPlatform = 'youtube';
    else if (url.includes('instagram.com')) currentPlatform = 'instagram';
    else if (url.includes('facebook.com') || url.includes('fb.watch')) currentPlatform = 'facebook';
    else {
        showToast('❌ Unsupported URL. Please use YouTube, Instagram, or Facebook links.', 'error');
        return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;

    try {
        switch (currentPlatform) {
            case 'youtube':
                await handleYouTubeDownload(url);
                break;
            case 'instagram':
                await handleInstagramDownload(url);
                break;
            case 'facebook':
                await handleFacebookDownload(url);
                break;
        }
    } catch (error) {
        showToast('❌ ' + (error.message || 'Something went wrong. Please try again.'), 'error');
    } finally {
        btn.innerHTML = '<i class="fas fa-download"></i> Download';
        btn.disabled = false;
    }
}

// ============================================================
//  YOUTUBE DOWNLOAD
// ============================================================

async function handleYouTubeDownload(url) {
    // Step 1: Get video info
    const response = await fetch(`${API_BASE}/youtube/info?url=${encodeURIComponent(url)}`);
    const result = await response.json();

    if (!result.success) throw new Error(result.error);

    const data = result.data;

    // Step 2: Show quality selection modal
    showDownloadModal({
        platform: 'YouTube',
        title: data.title,
        thumbnail: data.thumbnail,
        duration: formatDuration(data.duration),
        author: data.author,
        formats: data.videoFormats,
        audioFormats: data.audioFormats,
        downloadUrl: (itag, type) =>
            `${API_BASE}/youtube/download?url=${encodeURIComponent(url)}&itag=${itag}&type=${type}`
    });
}

// ============================================================
//  INSTAGRAM DOWNLOAD
// ============================================================

async function handleInstagramDownload(url) {
    const response = await fetch(`${API_BASE}/instagram/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });
    const result = await response.json();

    if (!result.success) throw new Error(result.error);

    const data = result.data;

    showMediaModal({
        platform: 'Instagram',
        media: data.media
    });
}

// ============================================================
//  FACEBOOK DOWNLOAD
// ============================================================

async function handleFacebookDownload(url) {
    const response = await fetch(`${API_BASE}/facebook/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });
    const result = await response.json();

    if (!result.success) throw new Error(result.error);

    const data = result.data;

    showMediaModal({
        platform: 'Facebook',
        title: data.title,
        thumbnail: data.thumbnail,
        media: data.downloads.map(d => ({
            url: d.url,
            type: 'video',
            quality: d.quality
        }))
    });
}

// ============================================================
//  2. PDF CONVERTER HANDLER
// ============================================================

const pdfInput = document.getElementById('pdfInput');
if (pdfInput) {
    pdfInput.addEventListener('change', handlePdfUpload);
}

async function handlePdfUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Show conversion options
    showPdfOptionsModal(file);
}

async function convertPdf(file, convertTo) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('convertTo', convertTo);

    showToast('⏳ Converting your file...', 'info');

    try {
        const response = await fetch(`${API_BASE}/pdf/convert`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Conversion failed');
        }

        // Download the converted file
        const blob = await response.blob();
        const extensions = { word: 'docx', image: 'png', excel: 'xlsx' };
        const filename = file.name.replace('.pdf', '') + '.' + (extensions[convertTo] || 'pdf');

        downloadBlob(blob, filename);
        showToast('✅ File converted successfully!', 'success');

    } catch (error) {
        showToast('❌ ' + error.message, 'error');
    }
}

async function convertWordToPdf(file) {
    const formData = new FormData();
    formData.append('file', file);

    showToast('⏳ Converting Word to PDF...', 'info');

    try {
        const response = await fetch(`${API_BASE}/pdf/word-to-pdf`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Conversion failed');

        const blob = await response.blob();
        downloadBlob(blob, file.name.replace(/\.(docx?|doc)$/i, '') + '.pdf');
        showToast('✅ Converted to PDF successfully!', 'success');

    } catch (error) {
        showToast('❌ ' + error.message, 'error');
    }
}

async function mergePdfs(files) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    showToast('⏳ Merging PDF files...', 'info');

    try {
        const response = await fetch(`${API_BASE}/pdf/merge`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Merge failed');

        const blob = await response.blob();
        downloadBlob(blob, 'merged.pdf');
        showToast('✅ PDFs merged successfully!', 'success');

    } catch (error) {
        showToast('❌ ' + error.message, 'error');
    }
}

async function compressPdf(file) {
    const formData = new FormData();
    formData.append('file', file);

    showToast('⏳ Compressing PDF...', 'info');

    try {
        const response = await fetch(`${API_BASE}/pdf/compress`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Compression failed');

        const blob = await response.blob();
        downloadBlob(blob, 'compressed_' + file.name);
        showToast('✅ PDF compressed successfully!', 'success');

    } catch (error) {
        showToast('❌ ' + error.message, 'error');
    }
}

// ============================================================
//  3. AI CONTENT CHECKER HANDLER
// ============================================================

async function checkAI() {
    const text = document.getElementById('aiText').value.trim();
    const btn = document.querySelector('.ai-checker-btn');

    if (!text || text.split(/\s+/).length < 30) {
        showToast('⚠️ Please enter at least 30 words for accurate analysis.', 'warning');
        return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/ai-checker/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const result = await response.json();

        if (!result.success) throw new Error(result.error);

        displayAIResult(result.data);

    } catch (error) {
        showToast('❌ ' + (error.message || 'Analysis failed. Please try again.'), 'error');
    } finally {
        btn.innerHTML = '<i class="fas fa-search"></i> Analyze Content';
        btn.disabled = false;
    }
}

function displayAIResult(data) {
    const resultDiv = document.getElementById('aiResult');
    const scoreEl = document.getElementById('aiScore');
    const fillEl = document.getElementById('resultFill');
    const verdictEl = document.getElementById('aiVerdict');

    resultDiv.classList.add('show');

    const humanPct = data.human_probability;
    scoreEl.textContent = humanPct + '% Human';

    if (humanPct > 70) {
        scoreEl.style.color = '#00c896';
        fillEl.style.background = 'linear-gradient(90deg, #00c896, #06b6d4)';
    } else if (humanPct > 40) {
        scoreEl.style.color = '#f59e0b';
        fillEl.style.background = 'linear-gradient(90deg, #f59e0b, #f97316)';
    } else {
        scoreEl.style.color = '#ef4444';
        fillEl.style.background = 'linear-gradient(90deg, #ef4444, #ec4899)';
    }

    fillEl.style.width = humanPct + '%';

    let verdictHtml = `<strong>${data.verdict}</strong> (Confidence: ${data.confidence})<br><br>`;
    verdictHtml += `📊 Words: ${data.wordCount} | Sentences: ${data.sentenceCount}<br>`;
    verdictHtml += `🤖 AI: ${data.ai_probability}% | 👤 Human: ${data.human_probability}%<br><br>`;

    if (data.analysis) {
        verdictHtml += `<strong>Detailed Analysis:</strong><br>`;
        verdictHtml += `• Perplexity: ${data.analysis.perplexity || 'N/A'}<br>`;
        verdictHtml += `• Burstiness: ${data.analysis.burstiness || 'N/A'}<br>`;
        verdictHtml += `• Vocabulary: ${data.analysis.vocabulary_diversity || 'N/A'}<br>`;
        verdictHtml += `• Pattern: ${data.analysis.coherence_pattern || 'N/A'}<br>`;
    }

    if (data.explanation) {
        verdictHtml += `<br><em>${data.explanation}</em>`;
    }

    verdictEl.innerHTML = verdictHtml;
}

// ============================================================
//  4. UI HELPER FUNCTIONS
// ============================================================

// Toast Notification
function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    const colors = {
        success: '#00c896',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#7c3aed'
    };
    toast.style.cssText = `
        position: fixed; top: 90px; right: 20px; z-index: 10000;
        padding: 16px 24px; border-radius: 12px;
        background: ${colors[type]}22; border: 1px solid ${colors[type]}44;
        color: #fff; font-size: 0.9rem; font-family: 'Inter', sans-serif;
        backdrop-filter: blur(10px); max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Download Modal for YouTube
function showDownloadModal(options) {
    removeModal();

    const modal = document.createElement('div');
    modal.className = 'download-modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(5px); padding: 20px;
    `;

    let formatsHtml = '';
    if (options.formats && options.formats.length > 0) {
        formatsHtml += '<h4 style="margin:15px 0 10px;color:#a78bfa;">🎬 Video Formats</h4>';
        options.formats.forEach(f => {
            formatsHtml += `
                <a href="${options.downloadUrl(f.itag, 'video')}" 
                   class="format-download-btn" target="_blank"
                   style="display:flex;justify-content:space-between;align-items:center;
                          padding:12px 18px;margin:6px 0;border-radius:10px;
                          background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
                          color:#fff;text-decoration:none;transition:all 0.3s;font-size:0.9rem;">
                    <span>📹 ${f.quality} (${f.mimeType || 'mp4'})</span>
                    <span style="color:#888;">${f.contentLength}</span>
                </a>`;
        });
    }

    if (options.audioFormats && options.audioFormats.length > 0) {
        formatsHtml += '<h4 style="margin:15px 0 10px;color:#ec4899;">🎵 Audio Only</h4>';
        options.audioFormats.slice(0, 3).forEach(f => {
            formatsHtml += `
                <a href="${options.downloadUrl(f.itag, 'audio')}" 
                   class="format-download-btn" target="_blank"
                   style="display:flex;justify-content:space-between;align-items:center;
                          padding:12px 18px;margin:6px 0;border-radius:10px;
                          background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
                          color:#fff;text-decoration:none;transition:all 0.3s;font-size:0.9rem;">
                    <span>🎵 MP3 ${f.quality}</span>
                    <span style="color:#888;">${f.contentLength}</span>
                </a>`;
        });
    }

    modal.innerHTML = `
        <div style="background:#1a1a2e;border-radius:20px;max-width:550px;width:100%;
                    max-height:80vh;overflow-y:auto;padding:30px;border:1px solid rgba(255,255,255,0.08);">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:20px;">
                <div style="display:flex;gap:15px;align-items:start;">
                    ${options.thumbnail ? `<img src="${options.thumbnail}" style="width:120px;border-radius:10px;">` : ''}
                    <div>
                        <h3 style="font-size:1rem;margin-bottom:5px;color:#fff;">${options.title || 'Video'}</h3>
                        <p style="color:#888;font-size:0.85rem;">${options.author || ''} • ${options.duration || ''}</p>
                    </div>
                </div>
                <button onclick="removeModal()" style="background:none;border:none;color:#888;font-size:1.5rem;cursor:pointer;">&times;</button>
            </div>
            ${formatsHtml}
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) removeModal();
    });

    document.body.appendChild(modal);
}

// Media Modal for Instagram/Facebook
function showMediaModal(options) {
    removeModal();

    const modal = document.createElement('div');
    modal.className = 'download-modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(5px); padding: 20px;
    `;

    let mediaHtml = '';
    options.media.forEach((item, i) => {
        mediaHtml += `
            <a href="${item.url}" download target="_blank"
               style="display:flex;justify-content:space-between;align-items:center;
                      padding:14px 18px;margin:8px 0;border-radius:10px;
                      background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
                      color:#fff;text-decoration:none;transition:all 0.3s;font-size:0.9rem;">
                <span>${item.type === 'video' ? '🎬' : '🖼️'} ${item.quality || item.type} #${i + 1}</span>
                <span style="color:#a78bfa;"><i class="fas fa-download"></i> Download</span>
            </a>`;
    });

    modal.innerHTML = `
        <div style="background:#1a1a2e;border-radius:20px;max-width:500px;width:100%;
                    padding:30px;border:1px solid rgba(255,255,255,0.08);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="color:#fff;">${options.platform} Media</h3>
                <button onclick="removeModal()" style="background:none;border:none;color:#888;font-size:1.5rem;cursor:pointer;">&times;</button>
            </div>
            <p style="color:#888;font-size:0.9rem;margin-bottom:15px;">Found ${options.media.length} media file(s)</p>
            ${mediaHtml}
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) removeModal();
    });

    document.body.appendChild(modal);
}

// PDF Options Modal
function showPdfOptionsModal(file) {
    removeModal();

    const modal = document.createElement('div');
    modal.className = 'download-modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(5px); padding: 20px;
    `;

    modal.innerHTML = `
        <div style="background:#1a1a2e;border-radius:20px;max-width:450px;width:100%;
                    padding:30px;border:1px solid rgba(255,255,255,0.08);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="color:#fff;">📄 Convert: ${file.name}</h3>
                <button onclick="removeModal()" style="background:none;border:none;color:#888;font-size:1.5rem;cursor:pointer;">&times;</button>
            </div>
            <p style="color:#888;font-size:0.9rem;margin-bottom:20px;">Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            <button onclick="removeModal();convertPdf(window._pdfFile,'word')" style="width:100%;padding:14px;margin:6px 0;border-radius:10px;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);color:#fff;cursor:pointer;font-size:0.95rem;font-family:'Inter',sans-serif;">
                📝 Convert to Word (DOCX)
            </button>
            <button onclick="removeModal();convertPdf(window._pdfFile,'excel')" style="width:100%;padding:14px;margin:6px 0;border-radius:10px;background:rgba(0,200,150,0.15);border:1px solid rgba(0,200,150,0.3);color:#fff;cursor:pointer;font-size:0.95rem;font-family:'Inter',sans-serif;">
                📊 Convert to Excel (XLSX)
            </button>
            <button onclick="removeModal();convertPdf(window._pdfFile,'image')" style="width:100%;padding:14px;margin:6px 0;border-radius:10px;background:rgba(255,87,34,0.15);border:1px solid rgba(255,87,34,0.3);color:#fff;cursor:pointer;font-size:0.95rem;font-family:'Inter',sans-serif;">
                🖼️ Convert to Image (PNG)
            </button>
            <button onclick="removeModal();compressPdf(window._pdfFile)" style="width:100%;padding:14px;margin:6px 0;border-radius:10px;background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.3);color:#fff;cursor:pointer;font-size:0.95rem;font-family:'Inter',sans-serif;">
                📦 Compress PDF
            </button>
        </div>
    `;

    window._pdfFile = file;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) removeModal();
    });

    document.body.appendChild(modal);
}

function removeModal() {
    const modal = document.querySelector('.download-modal-overlay');
    if (modal) modal.remove();
}

// Download blob as file
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Format duration (seconds to MM:SS)
function formatDuration(seconds) {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================================
//  5. CSS ANIMATIONS (injected)
// ============================================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .format-download-btn:hover {
        background: rgba(124,58,237,0.15) !important;
        border-color: rgba(124,58,237,0.3) !important;
    }
`;
document.head.appendChild(style);

// ============================================================
//  6. INITIALIZATION
// ============================================================
console.log('🚀 Instagraim.in Frontend Loaded Successfully');



