export const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
  completed: 'bg-sky-50 text-sky-600 border-sky-200',
};

export const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmat',
  pending: 'În așteptare',
  cancelled: 'Anulat',
  completed: 'Finalizat',
};

export const ROLE_LABELS: Record<string, string> = {
  tourist: 'Turist',
  guide: 'Ghid turistic',
  admin: 'Admin',
};

export const STATS_PLATFORM = {
  totalAttractions: 256,
  totalTours: 48,
  totalGuides: 32,
  happyTravelers: 12400,
  citiesCovered: 15,
} as const;
