import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google AI Studio Gemini API client securely on backend
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Middleware
app.use(express.json());

// In-memory lead store (or connect to MongoDB / PostgreSQL / Supabase)
const leads: Array<{ email: string; timestamp: string; projectType?: string }> = [];

// ==========================================
// BACKEND API ROUTES
// ==========================================

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiConnected: !!ai,
  });
});

// 2. Contact & Lead Capture Endpoint
app.post('/api/contact', (req, res) => {
  const { email, projectType } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  const newLead = {
    email,
    projectType: projectType || 'General Ingestion',
    timestamp: new Date().toISOString(),
  };
  leads.push(newLead);
  console.log('📥 [BACKEND] New client lead received:', newLead);

  return res.json({
    success: true,
    message: 'Lead received successfully. Direct upload link dispatched.',
    lead: newLead,
  });
});

// 3. Secure Backend Gemini AI Analysis Endpoint
app.post('/api/ai/analyze', async (req, res) => {
  const { prompt, model = 'gemini-2.0-flash' } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  if (!ai) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on server.' });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.error('❌ [BACKEND] Gemini API Error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to process AI request.' });
  }
});

// ==========================================
// STATIC FRONTEND ASSETS & SPA ROUTING
// ==========================================

const distPath = path.join(__dirname, 'dist');

// Serve static build assets with optimal caching for high-res frames
app.use(
  express.static(distPath, {
    maxAge: '7d',
    etag: true,
  })
);

// Fallback to index.html for React SPA client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 [KRITVIDEO SERVER] Running live at http://localhost:${PORT}`);
  console.log(`📡 [API] Health Check: http://localhost:${PORT}/api/health`);
});
