# Tasks & Logical Phases

## Phase 1: Initial Setup & Architecture
- [ ] Initialize Next.js project with TypeScript.
- [ ] Set up the directory structure corresponding to Clean Architecture rules (`/core`, `/data`, `/presentation`).
- [ ] Configure ESLint, Prettier, and global styling defaults.
- [ ] Define the `app-ads.txt` in the `/public` root.

## Phase 2: Domain Modeling & Repositories
- [ ] Create domain entities (`Project`, `CompanyProfile`).
- [ ] Define repository interfaces for accessing the lists of apps and details.
- [ ] Create mock data sources (e.g., simple JSON file or local DB interface) simulating API connections.
- [ ] Implement data mapping and concrete repositories.

## Phase 3: Core UI Development & Providers
- [ ] Set up base layouts (Header, Footer, Navigation).
- [ ] Create Context API files (`ProjectProvider`) to handle states logically across the UI.
- [ ] Build global UI elements (Buttons, Typography, Cards, responsive layouts) focusing on a very premium and dynamic design aesthetic.
- [ ] Enhance aesthetics using custom CSS patterns (glassmorphism backgrounds, clean fonts).

## Phase 4: Page Implementation
- [ ] **Home Page:** Feature hero banner, engaging headline, Top Projects showcase natively linking to app stores.
- [ ] **Projects Page:** Full list of iOS and Android apps developed by Jawalabs with interactive hover states.
- [ ] **Project Detail Page:** Detail view mapping dynamically based on `[id]`. Include download links, media/screenshots, and descriptions.
- [ ] **Privacy Policy Page:** Dynamic route to fetch and display the respective privacy policy for an app properly formatted for Google/Apple reviewers.

## Phase 5: SEO and Metadata
- [ ] Implement robust specific SEO tagging on all pages using Next.js Metadata.
- [ ] Ensure valid `<meta>` data on privacy policy pages specifically.
- [ ] Test cross-browser responsiveness and loading latency.

## Phase 6: Deployment & Maintenance
- [ ] Deploy the site (e.g., onto Vercel or similar modern infrastructure).
- [ ] Add domain mapping.
- [ ] Ensure `https://yourdomain.com/app-ads.txt` resolves directly to the raw text.
- [ ] Configure any required CI/CD pipelines.
