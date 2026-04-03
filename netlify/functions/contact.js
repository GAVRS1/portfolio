export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const receiver = process.env.CONTACT_RECEIVER || process.env.VITE_CONTACT_EMAIL || 'fallback@example.com';
  const payload = JSON.parse(event.body || '{}');

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      receiver,
      preview: `Message from ${payload.name || 'anonymous'} <${payload.email || 'no-email'}>`
    })
  };
}
