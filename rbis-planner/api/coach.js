export default async function handler(req, res) {
  // This securely grabs your private key from Vercel's secret vault
  const apiKey = process.env.GEMINI_API_KEY; 
  
  if (!apiKey) {
    return res.status(500).json({ error: "Server Configuration Error: API Key missing from Vercel vault." });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { prompt, systemInstruction } = req.body;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  try {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };
    if (systemInstruction) {
      payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to communicate with Gemini: " + error.message });
  }
}
