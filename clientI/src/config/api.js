// Centralized API configuration for the frontend
// Uses Vite env variable when available, with fallback to production URL

export const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? import.meta.env.VITE_API_BASE_URL
    : 'https://primetrade-ai-wf1e.vercel.app';

export function buildApiUrl(path) {
  if (!path.startsWith('/')) {
    // Ensure paths are normalized
    path = `/${path}`;
  }
  return `${API_BASE_URL}${path}`;
}


