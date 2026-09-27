# BingeBox — TV Shows Dashboard

A Vue 3 application that displays TV shows grouped by genre, with search functionality and detailed show information.

## Features
- **Dashboard**: Browse TV shows grouped by genre, each genre sorted by rating (highest first)
- **Search**: Debounced search (300 ms) with the query kept in the URL (`/?q=breaking`), so results survive refresh and can be shared
- **Show Details**: Poster, rating, genres, network, language, runtime, status, summary, official website and cast
- **Load More**: Fetch the next page of shows on demand with a Load More button
- **Recently Viewed**: The last 10 opened shows are kept in `localStorage` and suggested when a search has no results
- **Local Caching**: Loaded shows are cached in `localStorage` for 24 hours, so repeat visits don't refetch
- **Loading & Error States**: Skeleton placeholders while loading; error messages with a "Try again" button
- **404 Page**: Unknown routes show a Not Found page
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Testing**: Vitest
- **Language**: TypeScript

## Prerequisites

- Node.js `^22.18.0` or `>=24.12.0`
- npm `>=10.0.0`

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Run tests

```bash
npm run test:unit
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── api/              # API layer (TVMaze integration)
├── components/
│   ├── container/    # Smart components (ShowsDashboard, SearchResult, ShowDetails)
│   └── ui/           # Presentational components (ShowCard, AlertMessage, etc.)
├── composables/      # Reusable logic (useShows, useShowDetails)
├── stores/           # Pinia stores (search)
├── pages/            # Route pages
├── router/           # Vue Router configuration
├── types/            # TypeScript interfaces
├── assets/           # Static assets and global styles
└── utils/            # Cache helper, constants
tests/                # Unit tests, mirroring src/ (api, components, composables, stores, utils)
```

## Architecture Decisions

### 1. Composition API with Composables

Used Vue 3's Composition API with custom composables (`useShows`, `useShowDetails`) to encapsulate and reuse stateful logic. This keeps components focused on presentation while composables handle data fetching and state management.

### 2. Separation of Concerns

- **API Layer** (`api/`): `fetchClient.ts` wraps `fetch` and turns HTTP errors into readable messages; `tvmaze.ts` holds one small function per endpoint
- **Composables**: Business logic (fetching, pagination, genre grouping, caching, error state)
- **Pinia Stores**: `search` (query, results, URL sync) and `recentlyViewed` (last 10 opened shows, persisted in `localStorage`)
- **Components**: Container (smart) components talk to composables and stores; UI components only receive props and emit events

### 3. Genre Grouping with Rating Sort

Shows are grouped by genre using a computed property that:
1. Iterates through shows and assigns each to its genres
2. Sorts shows within each genre by rating (descending)
3. Allows a show to appear in multiple genre categories

### 4. Search with URL Persistence

Search queries are persisted in the URL (`/?q=breaking`) enabling:
- Shareable search links
- Browser back/forward navigation
- State preservation on page refresh

### 5. Dashboard Caching (`utils/cache.ts`)

A small generic cache utility wraps `localStorage` and is shared across composables that need to cache API data:
- The dashboard can load instantly from cache when available
- Fetch fresh data once the cache has expired
- Resuming pagination from where it left off rather than starting over.

### 6. Error Handling Strategy

- **Initial dashboard load fails**: an error message with a "Try again" button
- **Load More fails**: the error is logged and the button stays, so the user can click again
- **Search fails**: an error message with a "Try again" button
- **Show details fail**: an error message with a "Try again" button
- **Unknown routes**: a 404 page
- **Missing images**: placeholder images for shows and cast

### 7. Testing Strategy

Focused on business logic testing:
- **API tests**: Request construction, error handling
- **Composable tests**: Data fetching, genre grouping, sorting logic
- **Store tests**: Search actions, state management, URL updates
- **Utils tests**: Cache get/set/clear behavior
- **components tests**: `tests/components/SearchInput.spec.ts`, `tests/composables/useShows.spec.ts`

Other presentational components are not unit tested because they hold almost no logic.


## API

This application uses the [TVMaze API](https://www.tvmaze.com/api):

- `GET /shows?page={page}` — Paginated list of all shows
- `GET /search/shows?q={query}` — Search shows by name
- `GET /shows/{id}?embed=cast` — Show details with cast

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test:unit` | Run unit tests |
| `npm run lint` | Lint and fix code |
| `npm run format` | Format code with Prettier |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations & Next Steps

- No end-to-end tests yet (e.g. Playwright for the main flows)
- Shows without genres are not shown on the dashboard
- Accessibility could be improved (search input label, distinct labels for each genre row)