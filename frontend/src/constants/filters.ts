export const PRICE_OPTIONS = [
  { value: 'all', label: 'Toate' },
  { value: 'free', label: 'Gratuit' },
  { value: '$', label: '$' },
  { value: '$$', label: '$$' },
  { value: '$$$', label: '$$$' },
] as const;

export const DURATION_OPTIONS = [
  { value: 'all', label: 'Orice durată' },
  { value: 'short', label: '1–3 ore' },
  { value: 'half', label: '4–6 ore' },
  { value: 'full', label: '7+ ore' },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'all', label: 'Orice limbă' },
  { value: 'Română', label: '🇲🇩 Română' },
  { value: 'English', label: '🇬🇧 English' },
  { value: 'Français', label: '🇫🇷 Français' },
  { value: 'Русский', label: '🇷🇺 Русский' },
] as const;

export const SORT_OPTIONS_ATTRACTIONS = [
  { value: 'rating', label: '⭐ Rating' },
  { value: 'reviews', label: '💬 Recenzii' },
  { value: 'name', label: '🔤 Nume (A–Z)' },
] as const;

export const SORT_OPTIONS_TOURS = [
  { value: 'rating', label: '⭐ Cele mai bune' },
  { value: 'price_low', label: '💰 Preț crescător' },
  { value: 'price_high', label: '💰 Preț descrescător' },
  { value: 'reviews', label: '💬 Cele mai recenzate' },
] as const;
