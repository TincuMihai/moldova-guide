# 🇲🇩 MoldovaGuide — Platformă de Turism Local

Platformă completă de turism local și descoperire urbană în Republica Moldova.

## 📋 Descriere

MoldovaGuide conectează turiștii și localnicii cu atracții, restaurante, evenimente, tururi ghidate și experiențe locale din Moldova. Ghizii turistici pot oferi tururi personalizate, iar utilizatorii pot explora, salva favorite și planifica călătorii.

## 🛠️ Stack Tehnologic

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router DOM 6
- **Icons:** Lucide React
- **Fonturi:** Playfair Display + DM Sans (Google Fonts)

## 🚀 Instalare și Rulare

### Cerințe
- Node.js 18+
- npm 9+

### Pași

```bash
# 1. Clonează repository-ul
git clone https://github.com/<username>/moldovaguide.git
cd moldovaguide

# 2. Instalează dependențele
npm install

# 3. Rulează în development
npm run dev

# 4. Build pentru producție
npm run build

# 5. Preview build-ul
npm run preview
```

## 📁 Structura Proiectului

```
moldovaguide/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Navigare responsive cu mobile menu
│   │   │   ├── Footer.tsx        # Footer cu link-uri și info
│   │   │   └── Layout.tsx        # Layout wrapper cu Outlet
│   │   └── ui/
│   │       ├── StarRating.tsx    # Componentă rating cu stele
│   │       ├── AttractionCard.tsx # Card atracție (grid/list/compact)
│   │       └── TourCard.tsx      # Card tur ghidat (default/featured)
│   ├── data/
│   │   └── mockData.ts          # Date mock — atracții, tururi, ghizi, review-uri
│   ├── pages/
│   │   ├── HomePage.tsx          # Landing page cu hero, categorii, tururi, testimoniale
│   │   ├── ExplorePage.tsx       # Explorare atracții cu filtre și sortare
│   │   └── BrowseToursPage.tsx   # Browse tururi cu filtre tematice
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── App.tsx                  # Router principal
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Tailwind directives + componente custom
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

## 📄 Pagini Realizate (3/26)

| # | Pagina | Ruta | Status |
|---|--------|------|--------|
| 1 | **Home / Landing** | `/` | ✅ Complet |
| 2 | **Explore City** | `/explore` | ✅ Complet |
| 3 | **Browse Tours** | `/tours` | ✅ Complet |

### Home / Landing (`/`)
- Hero section cu search bar și statistici
- Grid categorii interactive (10 categorii)
- Tururi populare featured
- Atracții de top
- Secțiune testimoniale
- CTA pentru ghizi

### Explore City (`/explore`)
- Căutare full-text
- Filtre: categorie, nivel preț
- Sortare: rating, recenzii, nume
- Toggle grid/list view
- Placeholder hartă interactivă
- Empty state cu reset

### Browse Tours (`/tours`)
- Header cu gradient
- Teme scrollabile (pills)
- Sidebar: căutare, durată, limbă
- Sortare: rating, preț, recenzii
- Newsletter CTA
- Empty state

## 🎨 Design System

- **Culori primare:** Brand Orange (#ec751c) + Forest Green (#22c538)
- **Fonturi:** Playfair Display (headings) + DM Sans (body)
- **Componente:** btn-primary, btn-secondary, card, card-elevated, badge, glass, input-field
- **Animații:** fade-in, fade-up, slide-in, scale-in, float

## 📱 Responsive

Toate paginile sunt responsive: mobile (320px+), tablet (640px+), desktop (1024px+).

## 🔮 Pași Următori

- Pagini detalii atracție și tur
- Sistem autentificare (3 roluri: turist, ghid, proprietar)
- Dashboard utilizator și ghid
- Trip Planner cu drag-and-drop
- Integrare hartă interactivă (Leaflet/Mapbox)
- Backend API (Node.js + Express + PostgreSQL)
- Sistem de booking și plăți

---

**Realizat cu ❤️ în Moldova** | Proiect Tehnologii Web 2026
