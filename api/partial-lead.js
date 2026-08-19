import process from 'node:process';

const ALLOWED_ORIGIN = 'https://f.empodera.cl';
const MAX_BODY_BYTES = 100_000;
const MAX_DEPTH = 8;
const MAX_KEYS = 200;
const MAX_STRING_LENGTH = 10_000;
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

const EMAIL_ALIASES = ['email', 'emailAddress', 'email_address', 'contactEmail'];
const PHONE_ALIASES = ['phone', 'phoneNumber', 'phone_number', 'mobile', 'mobilePhone'];
const NAME_ALIASES = ['fullName', 'full_name', 'name', 'contactName'];

function setCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Vary', 'Origin');
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function sanitize(value, depth = 0, state = { keys: 0 }) {
  if (depth > MAX_DEPTH) return undefined;

  if (typeof value === 'string') {
    return Array.from(value)
      .filter((character) => {
        const code = character.charCodeAt(0);
        return code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127);
      })
      .join('')
      .trim()
      .slice(0, MAX_STRING_LENGTH);
  }
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (typeof value === 'boolean' || value === null) return value;

  if (Array.isArray(value)) {
    return value.slice(0, MAX_KEYS).map((item) => sanitize(item, depth + 1, state)).filter((item) => item !== undefined);
  }

  if (!isRecord(value)) return undefined;

  const clean = Object.create(null);
  for (const [key, item] of Object.entries(value)) {
    if (state.keys >= MAX_KEYS) break;
    if (FORBIDDEN_KEYS.has(key)) continue;
    const cleanKey = key.trim().slice(0, 100);
    if (!cleanKey) continue;
    state.keys += 1;
    const cleanValue = sanitize(item, depth + 1, state);
    if (cleanValue !== undefined) clean[cleanKey] = cleanValue;
  }
  return clean;
}

function firstValue(source, aliases) {
  for (const alias of aliases) {
    const value = source[alias];
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value).trim();
    }
  }
  return '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function parseBody(body) {
  if (typeof body !== 'string') return body;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

export default async function handler(request, response) {
  const origin = request.headers.origin;
  if (origin !== ALLOWED_ORIGIN) {
    return response.status(403).json({ error: 'Origin not allowed' });
  }

  setCorsHeaders(response);

  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  const rawBody = parseBody(request.body);
  if (!isRecord(rawBody)) return response.status(400).json({ error: 'Invalid body' });

  let serializedBody;
  try {
    serializedBody = JSON.stringify(rawBody);
  } catch {
    return response.status(400).json({ error: 'Invalid body' });
  }
  if (Buffer.byteLength(serializedBody, 'utf8') > MAX_BODY_BYTES) {
    return response.status(413).json({ error: 'Payload too large' });
  }

  const payload = sanitize(rawBody);
  const email = firstValue(payload, EMAIL_ALIASES);
  const phone = firstValue(payload, PHONE_ALIASES);
  if (!isValidEmail(email) && !isValidPhone(phone)) {
    return response.status(400).json({ error: 'A valid email or phone is required' });
  }

  payload.eventType = typeof payload.eventType === 'string' ? payload.eventType : 'ghl-form-progress';
  payload.fullName = firstValue(payload, NAME_ALIASES);
  payload.email = email;
  payload.phone = phone;
  payload.answers = payload.answers ?? Object.create(null);
  payload.clientCode = typeof payload.clientCode === 'string' ? payload.clientCode : 'oscar-contreras';
  payload.variant = typeof payload.variant === 'string' ? payload.variant : '';
  payload.capturedAt = typeof payload.capturedAt === 'string' ? payload.capturedAt : new Date().toISOString();

  const webhookUrl = process.env.N8N_PARTIAL_LEAD_WEBHOOK_URL;
  const webhookSecret = process.env.PARTIAL_LEAD_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    return response.status(503).json({ error: 'Service unavailable' });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': webhookSecret,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) return response.status(502).json({ error: 'Upstream request failed' });
    return response.status(204).end();
  } catch {
    return response.status(502).json({ error: 'Upstream request failed' });
  }
}
