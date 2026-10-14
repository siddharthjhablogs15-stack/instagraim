
// ============================================================
//  FILE: server.js
//  LOCATION: instagraim/server.js
//  PURPOSE: Main Backend Server — Handles all API requests
// ============================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const ytdl = require('@distube/ytdl-core');
const instagramGetUrl = require('instagram-url-direct');
const fbDownloader = require('fb-downloader-scrapper');
const { PDFDocument } = require('pdf-lib');
const mammoth = require('mammoth');
const libre = require('libreoffice-convert');
const pdf2pic = require('pdf2pic');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
//  MIDDLEWARE SETUP
// ============================================================

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

app.use(cors({
    origin: ['https://instagraim.in', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Frontend files serve karo public folder se
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting — abuse se bachao
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        error: 'Too many requests. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/', apiLimiter);

// File upload config
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/png', 'image/jpeg', 'image/jpg'
        ];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file format'), false);
        }
    }
});

// Zaruri folders banao agar nahi hain
['uploads', 'downloads', 'converted'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// OpenAI client (AI Checker ke liye)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ============================================================
//  HELPER FUNCTIONS
// ============================================================

// Purani files delete karo (1 hour se purani)
function cleanupOldFiles() {
    const dirs = ['uploads', 'downloads', 'converted'];
    const oneHour = 60 * 60 * 1000;
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) return;
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
            if (Date.now() - stats.mtimeMs > oneHour) {
                fs.unlinkSync(filePath);
            }
        });
    });
}
setInterval(cleanupOldFiles, 30 * 60 * 1000);

function isValidUrl(string) {
    try { new URL(string); return true; }
    catch (_) { return false; }
}

function sanitizeFilename(name) {
    return name.replace(/[^a-z0-9_\-\.]/gi, '_').substring(0, 100);
}

function apiResponse(res, statusCode, success, data = null, error = null) {
    return res.status(statusCode).json({
        success,
        timestamp: new Date().toISOString(),
        ...(data && { data }),
        ...(error && { error })
    });
}

// ============================================================
//  API 1: YOUTUBE VIDEO DOWNLOADER
// ============================================================

// Video ki info lao
app.get('/api/youtube/info', async (req, res) => {
    try {
        const { url } = req.query;

        if (!url || !isValidUrl(url)) {
            return apiResponse(res, 400, false, null, 'Please provide a valid YouTube URL.');
        }
        if (!ytdl.validateURL(url)) {
            return apiResponse(res, 400, false, null, 'Invalid YouTube URL.');
        }

        const info = await ytdl.getInfo(url);
        const videoDetails = info.videoDetails;

        const formats = info.formats
            .filter(f => f.hasVideo && f.hasAudio)
            .map(f => ({
                itag: f.itag,
                quality: f.qualityLabel,
                mimeType: f.mimeType?.split(';')[0],
                fps: f.fps,
                contentLength: f.contentLength
                    ? (parseInt(f.contentLength) / (1024 * 1024)).toFixed(2) + ' MB'
                    : 'Unknown'
            }))
            .sort((a, b) => (parseInt(b.quality) || 0) - (parseInt(a.quality) || 0));

        const audioFormats = info.formats
            .filter(f => f.hasAudio && !f.hasVideo)
            .map(f => ({
                itag: f.itag,
                quality: f.audioBitrate + 'kbps',
                mimeType: f.mimeType?.split(';')[0],
                contentLength: f.contentLength
                    ? (parseInt(f.contentLength) / (1024 * 1024)).toFixed(2) + ' MB'
                    : 'Unknown'
            }));

        return apiResponse(res, 200, true, {
            title: videoDetails.title,
            description: videoDetails.shortDescription,
            thumbnail: videoDetails.thumbnails?.pop()?.url,
            duration: videoDetails.lengthSeconds,
            author: videoDetails.author?.name,
            viewCount: videoDetails.viewCount,
            uploadDate: videoDetails.uploadDate,
            videoFormats: formats,
            audioFormats: audioFormats
        });

    } catch (error) {
        console.error('YouTube Info Error:', error.message);
        return apiResponse(res, 500, false, null, 'Failed to fetch video info.');
    }
});

// Video download karo
app.get('/api/youtube/download', async (req, res) => {
    try {
        const { url, itag, type } = req.query;

        if (!url || !ytdl.validateURL(url)) {
            return apiResponse(res, 400, false, null, 'Invalid YouTube URL.');
        }

        const info = await ytdl.getInfo(url);
        const title = sanitizeFilename(info.videoDetails.title);

        if (type === 'audio') {
            res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
            res.setHeader('Content-Type', 'audio/mpeg');
            ytdl(url, { quality: 'highestaudio', filter: 'audioonly' }).pipe(res);
        } else {
            res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
            res.setHeader('Content-Type', 'video/mp4');
            ytdl(url, {
                quality: itag || 'highest',
                filter: format => format.hasVideo && format.hasAudio
            }).pipe(res);
        }

    } catch (error) {
        console.error('YouTube Download Error:', error.message);
        return apiResponse(res, 500, false, null, 'Download failed.');
    }
});

// ============================================================
//  API 2: INSTAGRAM DOWNLOADER
// ============================================================

app.post('/api/instagram/download', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url || !isValidUrl(url) || !url.includes('instagram.com')) {
            return apiResponse(res, 400, false, null, 'Please provide a valid Instagram URL.');
        }

        const result = await instagramGetUrl(url);

        if (!result || !result.url_list || result.url_list.length === 0) {
            return apiResponse(res, 404, false, null, 'Could not find media.');
        }

        return apiResponse(res, 200, true, {
            platform: 'Instagram',
            mediaCount: result.url_list.length,
            media: result.url_list.map((mediaUrl, index) => ({
                index: index + 1,
                url: mediaUrl,
                type: mediaUrl.includes('.mp4') ? 'video' : 'image'
            }))
        });

    } catch (error) {
        console.error('Instagram Error:', error.message);
        return apiResponse(res, 500, false, null, 'Failed to fetch Instagram media.');
    }
});

// ============================================================
//  API 3: FACEBOOK DOWNLOADER
// ============================================================

app.post('/api/facebook/download', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url || !isValidUrl(url)) {
            return apiResponse(res, 400, false, null, 'Please provide a valid Facebook URL.');
        }
        if (!url.includes('facebook.com') && !url.includes('fb.watch') && !url.includes('fb.com')) {
            return apiResponse(res, 400, false, null, 'Not a valid Facebook URL.');
        }

        const result = await fbDownloader(url);

        if (!result || !result.download) {
            return apiResponse(res, 404, false, null, 'Could not find video.');
        }

        return apiResponse(res, 200, true, {
            platform: 'Facebook',
            title: result.title || 'Facebook Video',
            thumbnail: result.thumbnail || null,
            duration: result.duration || null,
            downloads: [
                { quality: 'HD', url: result.download?.find(d => d.quality === 'hd')?.url || null },
                { quality: 'SD', url: result.download?.find(d => d.quality === 'sd')?.url || null }
            ].filter(d => d.url)
        });

    } catch (error) {
        console.error('Facebook Error:', error.message);
        return apiResponse(res, 500, false, null, 'Failed to fetch Facebook video.');
    }
});

// ============================================================
//  API 4: PDF CONVERTER
// ============================================================

// PDF to Word / Excel / Image
app.post('/api/pdf/convert', upload.single('file'), async (req, res) => {
    try {
        const { convertTo } = req.body;
        const file = req.file;

        if (!file) return apiResponse(res, 400, false, null, 'Please upload a file.');

        const inputPath = file.path;
        const originalName = path.parse(file.originalname).name;

        switch (convertTo) {
            case 'word': {
                const outputPath = path.join('converted', `${originalName}.docx`);
                const pdfBuffer = fs.readFileSync(inputPath);
                await new Promise((resolve, reject) => {
                    libre.convert(pdfBuffer, '.docx', undefined, (err, result) => {
                        if (err) reject(err);
                        fs.writeFileSync(outputPath, result);
                        resolve();
                    });
                });
                res.download(outputPath, `${originalName}.docx`, () => {
                    fs.unlinkSync(inputPath);
                    fs.unlinkSync(outputPath);
                });
                break;
            }
            case 'excel': {
                const outputPath = path.join('converted', `${originalName}.xlsx`);
                const pdfBuffer = fs.readFileSync(inputPath);
                await new Promise((resolve, reject) => {
                    libre.convert(pdfBuffer, '.xlsx', undefined, (err, result) => {
                        if (err) reject(err);
                        fs.writeFileSync(outputPath, result);
                        resolve();
                    });
                });
                res.download(outputPath, `${originalName}.xlsx`, () => {
                    fs.unlinkSync(inputPath);
                    fs.unlinkSync(outputPath);
                });
                break;
            }
            case 'image': {
                const outputDir = path.join('converted', `${Date.now()}`);
                fs.mkdirSync(outputDir, { recursive: true });
                const converter = pdf2pic.fromPath(inputPath, {
                    density: 200,
                    saveFilename: originalName,
                    savePath: outputDir,
                    format: 'png'
                });
                const result = await converter.bulk(-1);
                if (result.length === 1) {
                    res.download(result[0].path, `${originalName}.png`, () => {
                        fs.unlinkSync(inputPath);
                        fs.rmSync(outputDir, { recursive: true });
                    });
                } else {
                    const archiver = require('archiver');
                    const zipPath = path.join('converted', `${originalName}_images.zip`);
                    const output = fs.createWriteStream(zipPath);
                    const archive = archiver('zip', { zlib: { level: 9 } });
                    archive.pipe(output);
                    result.forEach(img => archive.file(img.path, { name: path.basename(img.path) }));
                    await archive.finalize();
                    output.on('close', () => {
                        res.download(zipPath, `${originalName}_images.zip`, () => {
                            fs.unlinkSync(inputPath);
                            fs.unlinkSync(zipPath);
                            fs.rmSync(outputDir, { recursive: true });
                        });
                    });
                }
                break;
            }
            default:
                fs.unlinkSync(inputPath);
                return apiResponse(res, 400, false, null, 'Invalid type. Use: word, image, or excel.');
        }

    } catch (error) {
        console.error('PDF Convert Error:', error.message);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return apiResponse(res, 500, false, null, 'Conversion failed.');
    }
});

// Word to PDF
app.post('/api/pdf/word-to-pdf', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return apiResponse(res, 400, false, null, 'Please upload a Word file.');

        const inputPath = file.path;
        const originalName = path.parse(file.originalname).name;
        const outputPath = path.join('converted', `${originalName}.pdf`);
        const docBuffer = fs.readFileSync(inputPath);

        await new Promise((resolve, reject) => {
            libre.convert(docBuffer, '.pdf', undefined, (err, result) => {
                if (err) reject(err);
                fs.writeFileSync(outputPath, result);
                resolve();
            });
        });

        res.download(outputPath, `${originalName}.pdf`, () => {
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });

    } catch (error) {
        console.error('Word to PDF Error:', error.message);
        return apiResponse(res, 500, false, null, 'Conversion failed.');
    }
});

// Merge PDFs
app.post('/api/pdf/merge', upload.array('files', 20), async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length < 2) {
            return apiResponse(res, 400, false, null, 'Upload at least 2 PDF files.');
        }

        const mergedPdf = await PDFDocument.create();
        for (const file of files) {
            const pdfBytes = fs.readFileSync(file.path);
            const pdf = await PDFDocument.load(pdfBytes);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach(page => mergedPdf.addPage(page));
        }

        const mergedBytes = await mergedPdf.save();
        const outputPath = path.join('converted', `merged_${Date.now()}.pdf`);
        fs.writeFileSync(outputPath, mergedBytes);

        res.download(outputPath, 'merged.pdf', () => {
            files.forEach(f => fs.unlinkSync(f.path));
            fs.unlinkSync(outputPath);
        });

    } catch (error) {
        console.error('PDF Merge Error:', error.message);
        return apiResponse(res, 500, false, null, 'Merge failed.');
    }
});

// Compress PDF
app.post('/api/pdf/compress', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return apiResponse(res, 400, false, null, 'Please upload a PDF file.');

        const pdfBytes = fs.readFileSync(file.path);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');

        const compressedBytes = await pdfDoc.save({ useObjectStreams: true, addDefaultPage: false });
        const outputPath = path.join('converted', `compressed_${Date.now()}.pdf`);
        fs.writeFileSync(outputPath, compressedBytes);

        res.download(outputPath, 'compressed.pdf', () => {
            fs.unlinkSync(file.path);
            fs.unlinkSync(outputPath);
        });

    } catch (error) {
        console.error('PDF Compress Error:', error.message);
        return apiResponse(res, 500, false, null, 'Compression failed.');
    }
});

// ============================================================
//  API 5: AI CONTENT CHECKER
// ============================================================

app.post('/api/ai-checker/analyze', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return apiResponse(res, 400, false, null, 'Please provide text to analyze.');
        }

        const wordCount = text.trim().split(/\s+/).length;
        if (wordCount < 30) {
            return apiResponse(res, 400, false, null, 'Please provide at least 30 words.');
        }

        // Method 1: OpenAI se check karo
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are an AI content detector. Analyze text and determine AI vs human probability.
                    Respond ONLY in JSON:
                    {
                        "ai_probability": <0-100>,
                        "human_probability": <0-100>,
                        "confidence": "<low|medium|high>",
                        "verdict": "<Likely Human Written|Mixed Content|Likely AI Generated>",
                        "analysis": {
                            "perplexity": "<low|medium|high>",
                            "burstiness": "<low|medium|high>",
                            "vocabulary_diversity": "<low|medium|high>",
                            "coherence_pattern": "<natural|mechanical>",
                            "emotional_depth": "<shallow|moderate|deep>"
                        },
                        "explanation": "<2-3 sentence explanation>"
                    }`
                },
                { role: 'user', content: `Analyze:\n\n${text.substring(0, 5000)}` }
            ],
            temperature: 0.1,
            max_tokens: 500
        });

        let analysis;
        try {
            analysis = JSON.parse(completion.choices[0].message.content);
        } catch {
            analysis = performStatisticalAnalysis(text);
        }

        return apiResponse(res, 200, true, {
            wordCount,
            characterCount: text.length,
            sentenceCount: text.split(/[.!?]+/).filter(s => s.trim()).length,
            ...analysis
        });

    } catch (error) {
        console.error('AI Checker Error:', error.message);
        // Fallback: Statistical method
        const analysis = performStatisticalAnalysis(req.body.text || '');
        return apiResponse(res, 200, true, analysis);
    }
});

// Statistical AI Detection (Backup — bina API ke kaam karta hai)
function performStatisticalAnalysis(text) {
    const words = text.trim().split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const wordCount = words.length;
    const sentenceCount = sentences.length;

    const avgSentenceLength = wordCount / Math.max(sentenceCount, 1);
    const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, '')));
    const ttr = uniqueWords.size / Math.max(wordCount, 1);

    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLen = sentenceLengths.reduce((a, b) => a + b, 0) / Math.max(sentenceLengths.length, 1);
    const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgLen, 2), 0) / Math.max(sentenceLengths.length, 1);
    const stdDev = Math.sqrt(variance);

    const aiPhrases = [
        'in conclusion', 'it is important to note', 'furthermore',
        'in today\'s world', 'it is worth noting', 'in summary',
        'on the other hand', 'as we can see', 'it is essential',
        'plays a crucial role', 'in the realm of', 'delve into',
        'navigating the', 'landscape of', 'in the ever-evolving',
        'harness the power', 'leverage', 'streamline',
        'cutting-edge', 'game-changer', 'paradigm shift'
    ];
    const lowerText = text.toLowerCase();
    const aiPhraseCount = aiPhrases.filter(phrase => lowerText.includes(phrase)).length;

    let aiScore = 50;
    if (stdDev < 5) aiScore += 15;
    else if (stdDev < 8) aiScore += 5;
    else aiScore -= 10;

    if (ttr < 0.4) aiScore += 10;
    else if (ttr > 0.7) aiScore -= 15;

    aiScore += Math.min(aiPhraseCount * 5, 20);

    if (avgSentenceLength >= 15 && avgSentenceLength <= 25) aiScore += 8;
    else aiScore -= 5;

    aiScore = Math.max(5, Math.min(95, aiScore));
    const humanScore = 100 - aiScore;

    let verdict, confidence;
    if (aiScore >= 75) { verdict = 'Likely AI Generated'; confidence = 'high'; }
    else if (aiScore >= 55) { verdict = 'Mixed Content'; confidence = 'medium'; }
    else { verdict = 'Likely Human Written'; confidence = 'medium'; }

    return {
        wordCount, characterCount: text.length, sentenceCount,
        ai_probability: aiScore, human_probability: humanScore,
        confidence, verdict,
        analysis: {
            perplexity: stdDev < 5 ? 'low' : stdDev < 10 ? 'medium' : 'high',
            burstiness: stdDev > 8 ? 'high' : stdDev > 4 ? 'medium' : 'low',
            vocabulary_diversity: ttr > 0.6 ? 'high' : ttr > 0.4 ? 'medium' : 'low',
            coherence_pattern: aiScore > 60 ? 'mechanical' : 'natural',
            emotional_depth: aiScore > 60 ? 'shallow' : 'moderate',
            ai_phrases_detected: aiPhraseCount
        },
        explanation: `Statistical analysis: TTR=${ttr.toFixed(3)}, StdDev=${stdDev.toFixed(2)}, AI phrases=${aiPhraseCount}. ${verdict}.`,
        method: 'statistical_fallback'
    };
}

// ============================================================
//  GENERAL ROUTES
// ============================================================

// Health check
app.get('/api/health', (req, res) => {
    return apiResponse(res, 200, true, {
        status: 'running',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// API docs
app.get('/api', (req, res) => {
    return apiResponse(res, 200, true, {
        name: 'Instagraim.in API',
        version: '1.0.0',
        endpoints: {
            youtube: {
                info: 'GET /api/youtube/info?url=<URL>',
                download: 'GET /api/youtube/download?url=<URL>&itag=<ID>&type=<video|audio>'
            },
            instagram: { download: 'POST /api/instagram/download' },
            facebook: { download: 'POST /api/facebook/download' },
            pdf: {
                convert: 'POST /api/pdf/convert',
                wordToPdf: 'POST /api/pdf/word-to-pdf',
                merge: 'POST /api/pdf/merge',
                compress: 'POST /api/pdf/compress'
            },
            aiChecker: { analyze: 'POST /api/ai-checker/analyze' },
            health: 'GET /api/health'
        }
    });
});

// SPA support — sab routes pe index.html serve karo
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return apiResponse(res, 400, false, null, 'File too large. Max 50MB.');
        }
        return apiResponse(res, 400, false, null, `Upload error: ${err.message}`);
    }
    return apiResponse(res, 500, false, null, 'Internal server error.');
});

// ============================================================
//  SERVER START
// ============================================================
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════╗
    ║   🚀 Instagraim.in Server Running       ║
    ║   📍 http://localhost:${PORT}              ║
    ║   📅 ${new Date().toISOString()}     ║
    ╚══════════════════════════════════════════╝
    `);
});

module.exports = app;

