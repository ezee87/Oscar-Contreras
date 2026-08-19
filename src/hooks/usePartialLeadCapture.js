import { useEffect, useRef } from 'react';

const GHL_ORIGIN = 'https://links.iqautomated.io';
const CLIENT_CODE = 'oscar-contreras';
const MESSAGE_TYPE = 'ghl-form-progress';
const MAX_DEDUPLICATION_ENTRIES = 200;
const deliveredMessages = new Set();
const pendingMessages = new Set();

const EMAIL_ALIASES = ['email', 'emailAddress', 'email_address', 'contactEmail'];
const PHONE_ALIASES = ['phone', 'phoneNumber', 'phone_number', 'mobile', 'mobilePhone'];
const NAME_ALIASES = ['fullName', 'full_name', 'name', 'contactName'];

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
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

function stableSerialize(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableSerialize).join(',')}]`;
  }

  if (isRecord(value)) {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`)
      .join(',')}}`;
  }

  return JSON.stringify(value);
}

function rememberDelivered(fingerprint) {
  deliveredMessages.add(fingerprint);
  if (deliveredMessages.size > MAX_DEDUPLICATION_ENTRIES) {
    deliveredMessages.delete(deliveredMessages.values().next().value);
  }
}

export default function usePartialLeadCapture(variant) {
  const variantRef = useRef(variant);

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== GHL_ORIGIN || !isRecord(event.data)) return;
      if (event.data.type !== MESSAGE_TYPE) return;

      const nestedPayload = isRecord(event.data.payload) ? event.data.payload : {};
      const source = { ...event.data, ...nestedPayload };
      delete source.type;
      delete source.payload;

      const email = firstValue(source, EMAIL_ALIASES);
      const phone = firstValue(source, PHONE_ALIASES);
      if (!isValidEmail(email) && !isValidPhone(phone)) return;

      const payload = {
        ...source,
        eventType: source.eventType ?? MESSAGE_TYPE,
        fullName: firstValue(source, NAME_ALIASES),
        email,
        phone,
        answers: source.answers ?? {},
        clientCode: CLIENT_CODE,
        variant: variantRef.current,
      };
      const fingerprint = stableSerialize(payload);

      if (deliveredMessages.has(fingerprint) || pendingMessages.has(fingerprint)) return;
      pendingMessages.add(fingerprint);

      try {
        const response = await fetch('/api/partial-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            capturedAt: source.capturedAt ?? new Date().toISOString(),
          }),
          keepalive: true,
        });

        if (response.ok) rememberDelivered(fingerprint);
      } catch {
        // A later identical message may retry after a transient network failure.
      } finally {
        pendingMessages.delete(fingerprint);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
}
