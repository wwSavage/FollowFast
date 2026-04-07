export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, businessName, leadName } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: `You are a friendly AI assistant for ${businessName}, a local service business. You are following up with a lead named ${leadName}. Your goal is to qualify them, answer questions, and book an appointment. Keep responses short, warm, and professional — max 2-3 sentences.`,
      messages: messages
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.content[0].text });
}
