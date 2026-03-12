/**
 * Client-side sanitization for user inputs.
 * Prevents XSS and limits content length for security & performance.
 */

const MAX_STRING = 10000;
const MAX_ARRAY_ITEMS = 100;
const MAX_URL_LENGTH = 2048;

/** Strip scripts and dangerous HTML; limit length */
export function sanitizeString(str, maxLen = MAX_STRING) {
  if (str == null || typeof str !== 'string') return '';
  let s = str.slice(0, maxLen);
  s = s.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  s = s.replace(/javascript:/gi, '');
  s = s.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  return s.trim();
}

/** Sanitize URL - allow http, https, mailto only */
export function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const s = url.slice(0, MAX_URL_LENGTH).trim();
  if (/^(https?|mailto):\/?\/?[^\s]+$/i.test(s)) return s;
  return '';
}

/** Sanitize array of strings */
export function sanitizeArray(arr, maxItems = MAX_ARRAY_ITEMS) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, maxItems).map((item) => (typeof item === 'string' ? sanitizeString(item, 500) : String(item))).filter(Boolean);
}

/** Sanitize object with string values */
export function sanitizeObject(obj, keys = []) {
  if (!obj || typeof obj !== 'object') return {};
  const out = {};
  const keyList = keys.length ? keys : Object.keys(obj);
  keyList.forEach((k) => {
    const v = obj[k];
    if (typeof v === 'string') out[k] = sanitizeString(v, 2000);
    else if (Array.isArray(v)) out[k] = sanitizeArray(v);
    else if (v != null) out[k] = v;
  });
  return out;
}
