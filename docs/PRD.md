# Product Requirements Document (PRD)

## 1. Project Overview
**Project Name:** Jawalabs Web Platform
**Project Description:** A professional company profile and portfolio website for Jawalabs, an agency/company that develops useful and entertaining mobile applications for Android and iOS. 
**Target Audience:** Potential users looking for app information, ad networks, and business partners.

## 2. Goals and Objectives
- **Showcase Expertise:** Present the company as a professional creator of high-quality mobile apps.
- **Project Portfolio:** Display a comprehensive list of all published Android and iOS applications.
- **App Details & Compliance:** Provide detailed pages for each app, crucially including a Privacy Policy link for store compliance (Google Play Console / App Store Connect).
- **Ad Monetization Verification:** Host a global `app-ads.txt` file at the root domain to verify app ownership for ad networks.

## 3. Scope of Work
### 3.1 Core Features
- **Homepage Showcase:** Introduction to Jawalabs, highlighting top/featured applications and the company's mission.
- **Projects/Apps Directory:** A page listing all mobile applications with filters (Android, iOS, Category).
- **App Detail Page:** 
  - App icon, title, description, and screenshots.
  - Emphasized link to the specific Privacy Policy for the app.
  - Links to download on App Store and Google Play.
- **Privacy Policy Template/Pages:** Dedicated pages or dynamic rendering of privacy policies for each application.
- **Static Assets:** `app-ads.txt` hosted at the root (`/app-ads.txt`).

### 3.2 Non-Functional Requirements
- **Architecture:** Clean Architecture principles.
- **State Management:** React Context API (Provider pattern).
- **Framework:** Next.js (React) for optimized SEO, fast page loads, and static site generation (SSG) / server-side rendering (SSR).
- **SEO & Performance:** High lighthouse score, proper meta tags, and open graph data for social sharing.

## 4. User Journeys
1. **App User / Reviewer:** Visits the app detail page via a link from the mobile app stores -> Reviews the Privacy Policy.
2. **Ad Network Crawler:** Accesses `jawalabs.com/app-ads.txt` to verify ad inventory ownership.
3. **Business Partner / Investor:** Visits the homepage -> Browses the list of projects -> Reads company information.
