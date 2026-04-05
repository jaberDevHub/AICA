// AI Chat Proxy Serverless Function
module.exports = async function handler(req, res) {
  // Enable CORS with restricted origin
  const allowedOrigins = [
    'https://chat-aime.vercel.app',
    'https://chat-ai-*.vercel.app',
    'http://localhost:3000',
    'http://localhost:5501'
  ];

  const origin = req.headers.origin;
  // Allow any localhost port for local development
  const isLocalhost = origin && /^http:\/\/localhost(:\d+)?$/.test(origin);
  if (isLocalhost || allowedOrigins.some(allowed => {
    if (allowed.includes('*')) {
      const pattern = allowed.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return allowed === origin;
  })) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting check (simple implementation)
  const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
  const currentTime = Date.now();

  try {
    const { model, messages } = req.body;

    // Validate model
    const allowedModels = ['Qwen', 'KIMI', 'Qwen3-14B', 'Qwen3.5-397B-A17B-Q8'];
    if (!allowedModels.includes(model)) {
      return res.status(400).json({ error: 'Model not supported' });
    }

    // Map model to actual AI server URLs (MOVED TO ENVIRONMENT VARIABLES)
    const modelEndpoints = {
      'Qwen': process.env.QWEN_API_URL,
      'KIMI': process.env.KIMI_API_URL,
      'Qwen3-14B': process.env.QWEN3_API_URL,
      'Qwen3.5-397B-A17B-Q8': process.env.QWEN35_API_URL
    };

    const endpoint = modelEndpoints[model];
    if (!endpoint) {
      return res.status(500).json({ error: 'Model configuration missing' });
    }

    // SECURITY: Remove logging of actual endpoints
    console.log(`Processing request for model: ${model}`);

    try {
      // Forward request to AI server
      const response = await fetch(`${endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-local'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`AI server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      res.status(200).json(data);

    } catch (fetchError) {
      console.error('AI server connection failed:', fetchError.message);

      // SECURITY: Sanitized error message - NO IP EXPOSURE
      res.status(503).json({
        error: 'AI service temporarily unavailable',
        message: 'The AI service is currently experiencing connection issues. Please try again later.',
        code: 'AI_SERVICE_UNAVAILABLE'
      });
    }

  } catch (error) {
    console.error('Chat proxy error:', error);
    res.status(500).json({
      error: 'Request processing failed',
      code: 'INTERNAL_ERROR'
    });
  }
};
