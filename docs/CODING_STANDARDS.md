# Coding Standards & Best Practices

## 1. Type Safety
- **Strict TypeScript:** Enable `strict` mode in `tsconfig.json`. Use explicit types. Avoid using `any` at all costs.
- **Interfaces:** Prefer `interface` over `type` for models and class implementations. Name interfaces semantically (e.g., `ProjectRepository` instead of `IProjectRepository` as typical per Next.js standards, or optionally prefix with `I` based on team preference).

## 2. Naming Conventions
- **Variables & Functions:** `camelCase` (e.g., `fetchProjects`, `appDetails`).
- **Interfaces & Types:** `PascalCase` (e.g., `ProjectEntity`, `AppResponse`).
- **Components & Files:** Use `PascalCase` for React components (`FeatureCard.tsx`) and `camelCase` for directories or utilities (`appData.ts`, `/components`).
- **Repositories & Use Cases:** Suffix suitably (e.g., `GetProjectsUseCase.ts`, `ProjectRepositoryImpl.ts`).

## 3. Formatting and Linting
- Ensure all members use Prettier (with a `.prettierrc` configuration).
- Use ESLint (configured for Next.js and React) to catch errors early.
- Keep components concise. Break them down if they exceed 150-200 lines. 

## 4. State Management (Provider Pattern)
- Keep Global State minimal. Use local state (`useState`, `useReducer`) when the state affects only a subset of components.
- Do not mutate state directly. Always use the reducer dispatch or the state setter functions.
- Centralize context definitions via dedicated files (e.g., `AppProvider.tsx`, `useAppContext.ts`). Every context must have a custom hook (e.g., `useApp()`) to consume it.

## 5. Clean Architecture Implementation
- UI Components must *only* depend on the `Domain` models, NEVER directly on `Data` or `API` responses structure. 
- Mappers must be used to normalize data fetched from the `Data Layer` into `Entities`. 
- Repositories should have clearly defined interfaces in the Core/Domain namespace, with the concrete implementation living in the Data namespace.

## 6. CSS / Styling Rules
- Vanilla CSS, CSS Modules: Scoped classes or global utility tokens for consistent design. 
- Avoid heavy CSS files for single components. Break styles logically.
- Use explicit class names, optionally following BEM `Block__Element--Modifier` conventions.

## 7. Version Control & Git
- Ensure descriptive commit messages (e.g., `feat: Add project details page` or `fix: Resolve layout issue on iOS Safari`).
- Do not push directly to main/master. 
- Group tasks and bug fixes chronologically as per `TASKS.md`.
