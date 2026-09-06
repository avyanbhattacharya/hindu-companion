# Hindu Companion – Local-First Web Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Local-First](https://img.shields.io/badge/Architecture-Local--First-orange.svg)](#local-first-architecture)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline--Ready-green.svg)](#pwa--offline-capabilities)

A free, private, lightweight, and local-first web application starter for **Hindu Companion** – supporting Naam Japa counting, digital mala tracking, and daily devotional practice.

---

## Technical Context & Background

This project initializes `hindu-companion` based on local-first web starter principles and learnings from prior devotional counter development (`naam-japa-counter`).

### Key Technical Insights from Prior Work:
1. **Lock-Screen Resilience on Mobile (iOS / Android)**:
   - **Problem**: Mobile OSs (especially iOS Safari) pause or throttle JavaScript execution when the device screen locks or the tab goes into the background. Relying solely on `setInterval()` tick counts causes time/count drift.
   - **Solution**: The counter computes counts dynamically from actual elapsed timestamp differences (`Date.now() - startedAt`). When returning from a locked screen, the count dynamically catches up to real elapsed time:
     $$\text{Count} = \text{Accumulated Count} + \frac{\text{Elapsed Active Milliseconds}}{\text{Seconds per Naam} \times 1000}$$

2. **108-Count Round Tracking**:
   - In traditional Hindu devotional Japa practice, 1 mala equals **108** repetitions.
   - The application automatically calculates completed rounds ($\lfloor \text{Total Count} / 108 \rfloor$) and current round progress ($\text{Total Count} \pmod{108}$).

3. **Dual Counter Modes**:
   - **Touchless Japa Counter**: Hands-free automatic counting with adjustable pace (1.0 to 5.0 seconds per naam).
   - **Tap Japa Counter**: Digital mala with a large, tactile +1 tap button.

---

## Local-First Architecture Principles

`hindu-companion` is built upon local-first web application principles:

- **100% Private & Serverless**: No user registration, no server backend, no analytics, and no external tracking scripts. All data belongs to the user.
- **Client-Side Persistence**: State is persisted locally using browser `localStorage`. Your session persists across tab closes and device reboots.
- **Data Portability**: Integrated local JSON Export & Import tools allow users to back up or restore practice records locally.
- **Offline PWA Support**: Built with Web App Manifest (`manifest.webmanifest`) and Service Worker (`sw.js`) for offline installation and home-screen access.

---

## Project Structure

```
hindu-companion/
├── index.html            # Touchless Japa Counter & Companion Dashboard
├── tap.html              # Tap Japa Counter (Digital Mala)
├── sw.js                 # Service Worker for offline caching
├── manifest.webmanifest  # PWA web app manifest
├── icon.svg              # Lotus/Mala SVG vector icon
├── .nojekyll             # GitHub Pages Jekyll bypass
├── robots.txt            # Search engine crawler directives
├── sitemap.xml           # Site map structure
├── LICENSE               # MIT License
└── README.md             # Technical documentation
```

---

## Local Development & Usage

Because `hindu-companion` is built with vanilla HTML, CSS, and modern Web JavaScript, no heavy compilation or Node.js build process is required.

### Quick Start:
1. Clone or download this repository:
   ```bash
   git clone https://github.com/avyanbhattacharya/hindu-companion.git
   cd hindu-companion
   ```
2. Open `index.html` directly in any web browser, or serve it using a lightweight local web server:
   ```bash
   npx http-server -p 8080 .
   ```
3. Open `http://localhost:8080` in your browser.

---

## Publishing to GitHub Pages

1. Navigate to your repository's **Settings** on GitHub.
2. Select **Pages** under *Code and automation*.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then click **Save**.
5. Access your live site at `https://<username>.github.io/hindu-companion/`.

---

## Mobile & Home Screen Installation (PWA)

- **iOS (Safari)**: Open the web app, tap the **Share** button, and select **Add to Home Screen**.
- **Android (Chrome)**: Open the web app, tap the menu (⋮), and select **Install app** or **Add to Home screen**.

---

## License

Distributed under the [MIT License](LICENSE).
