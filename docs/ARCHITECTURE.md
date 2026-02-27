# Architecture Guidelines

## 1. Core Principles
The Jawalabs Web Platform uses **Clean Architecture** patterns adapted for a modern Next.js frontend, ensuring independence of UI components from core business logic, strict layering, and highly testable modules. 
We use the **Provider Pattern** via React's Context API for robust, modular State Management.

## 2. Technology Stack
- **Framework:** Next.js (App Router or Pages Router, utilizing SSR/SSG for optimized performance and SEO)
- **Language:** TypeScript (for type-safety and robust data models)
- **Styling:** CSS Modules / Vanilla CSS for maximum flexibility.
- **State Management:** Provider pattern (React Context Providers scoping the components appropriately).

## 3. Directory Structure
A clean architecture representation in Next.js typically looks like this:

```
src/
├── app/                  # (or pages/) Next.js specific routes, UI rendering
│   ├── layout.tsx
│   ├── page.tsx
│   └── apps/             # Apps listing page
│       └── [id]/         # App detail page & Privacy Policy
├── core/                 # The Domain Layer (Business Logic)
│   ├── entities/         # Core TypeScript interfaces (e.g., App model)
│   ├── useCases/         # Application-specific business rules
│   └── errors/           # Custom error handlers
├── data/                 # The Data Layer
│   ├── models/           # DTOs (Data Transfer Objects) mapping API to Entities
│   ├── repositories/     # Concrete implementations of Domain interfaces
│   └── sources/          # Data sources (APIs, Contentful, Firebase, mock local JSON)
├── presentation/         # UI Elements and State
│   ├── components/       # Reusable React components (Atoms, Molecules, Organisms)
│   ├── providers/        # Context API Providers for Global/Scoped State
│   └── hooks/            # Custom reusable UI hooks
└── config/               # Application-level configurations (ENV variables, constants)
```

## 4. Layer Separation
### 4.1 Domain Layer (`/core`)
- Completely agnostic to Next.js or UI. 
- Defines the `Project` entity (e.g., `id`, `name`, `platform`, `description`, `privacy_policy_url`).
- Defines interfaces for the `AppRepository` (methods like `getApps()`, `getAppById(id)`).

### 4.2 Data Layer (`/data`)
- Integrates with external content sources or static JSON files to mock our database.
- Implements the `AppRepository` interface to fetch data and map it to Domain entities.

### 4.3 Presentation Layer (`/presentation` & `/app`)
- Connects the Domain and Data layers to the UI via a State Provider (`AppProvider`).
- Fetches initial state appropriately using Next.js data fetching (e.g., RSC - React Server Components).
- Reusable UI elements strictly consume data; they do not fetch it directly from APIs.

## 5. State Management approach
We group state logically by feature. For example, `AppsProvider`.
```tsx
export const AppsContext = createContext<{ apps: Project[]; loading: boolean }>(/* default */);

export const AppsProvider = ({ children, initialApps }) => {
    // local state managed via useReducer or useState
    // ...
    return <AppsContext.Provider value={{...}}>{children}</AppsContext.Provider>;
}
```
This isolates the UI's dependency on the internal management of App project state, aligning strictly with Clean Architecture.
