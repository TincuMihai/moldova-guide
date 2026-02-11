export const NAV_LINKS = [
  { to: '/', label: 'Acasă' },
  { to: '/explore', label: 'Explorează' },
  { to: '/tours', label: 'Tururi' },
] as const;

export const FOOTER_LINKS = {
  'Explorează': [
    { label: 'Atracții', to: '/explore' },
    { label: 'Tururi ghidate', to: '/tours' },
    { label: 'Restaurante', to: '/explore' },
    { label: 'Evenimente', to: '/explore' },
    { label: 'Crame', to: '/explore' },
  ],
  'Comunitate': [
    { label: 'Itinerarii', to: '/' },
    { label: 'Recenzii', to: '/' },
    { label: 'Ghizi turistici', to: '/' },
    { label: 'Blog', to: '/' },
  ],
  'Despre noi': [
    { label: 'Despre MoldovaGuide', to: '/' },
    { label: 'Parteneriate', to: '/' },
    { label: 'Contact', to: '/' },
    { label: 'Termeni și condiții', to: '/' },
  ],
} as const;
