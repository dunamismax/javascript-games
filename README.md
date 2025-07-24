<p align="center">
  <img src="https://github.com/dunamismax/images/blob/main/javascript/Vanilla-JS-Logo.png" alt="JavaScript 2D Game Development Stack" width="200" />
</p>

<p align="center">
  <a href="https://github.com/dunamismax/javascript-games">
    <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=24&pause=1000&color=F7DF1E&center=true&vCenter=true&width=1000&lines=JavaScript+2D+Game+Development+Stack;Phaser+3+%2B+Lightning+Fast+esbuild;Classic+Arcade+Games+Collection;Pong+%2B+Snake+%2B+Space+Invaders;Asteroids+%2B+Frogger+%2B+Tetris;Mobile+Ready+with+Capacitor;Fastify+Backend+%2B+Socket.IO;60fps+Arcade+Physics+Engine;Modern+Development+Experience;Hot+Reload+%2B+Instant+Builds;Production+Ready+Deployment;Cross+Platform+Mobile+Apps;pnpm+Monorepo+Architecture;Zero+Framework+Overhead;MIT+Licensed+Open+Source" alt="Typing SVG" />
  </a>
</p>

<p align="center">
  <a href="#phaser-3---high-performance-2d-game-engine"><img src="https://img.shields.io/badge/Phaser_3-3.70+-7B2CBF.svg" alt="Phaser 3"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js" alt="Node.js Version"></a>
  <a href="https://esbuild.github.io/"><img src="https://img.shields.io/badge/esbuild-0.20+-FFCF00.svg?logo=esbuild" alt="esbuild Version"></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Fastify-4.0+-000000.svg?logo=fastify" alt="Fastify Version"></a>
  <a href="https://capacitorjs.com/"><img src="https://img.shields.io/badge/Capacitor-6.0+-119EFF.svg?logo=capacitor" alt="Capacitor Version"></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/Code_Quality-ESLint-4B32C3.svg?logo=eslint" alt="ESLint"></a>
  <a href="https://prettier.io/"><img src="https://img.shields.io/badge/Code_Format-Prettier-F7B93E.svg?logo=prettier" alt="Prettier"></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/Package_Manager-pnpm-F69220.svg?logo=pnpm" alt="pnpm"></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Testing-Vitest-6E9F18.svg?logo=vitest" alt="Vitest"></a>
  <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/E2E-Playwright-2EAD33.svg?logo=playwright" alt="Playwright"></a>
  <a href="https://socket.io/"><img src="https://img.shields.io/badge/Multiplayer-Socket.IO-010101.svg?logo=socket.io" alt="Socket.IO"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"></a>
</p>

---

# JavaScript 2D Game Development Stack

A high-performance collection of classic arcade games built with Phaser 3, featuring lightning-fast esbuild compilation, mobile deployment with Capacitor, and modern JavaScript tooling. Experience 60fps gameplay with zero framework overhead.

## Features

- **Phaser 3 Game Engine** - High-performance HTML5 2D game framework with arcade physics
- **Lightning-Fast Builds** - esbuild compilation for instant development feedback
- **Classic Game Collection** - Six fully-featured arcade games with authentic gameplay
- **Mobile Ready** - Capacitor integration for iOS and Android deployment
- **Multiplayer Support** - Socket.IO integration for real-time multiplayer gaming
- **Modern Tooling** - ESLint, Prettier, Vitest testing, and pnpm workspaces
- **Hot Reload Development** - Instant code changes with fast refresh
- **Production Ready** - Optimized builds and deployment configurations

## Project Structure

```sh
├── apps/
│   ├── pong/                  # Classic paddle tennis game (Port 3000)
│   ├── snake/                 # Growing snake arcade game (Port 3001)
│   ├── space-invaders/        # Retro arcade shooter (Port 3002)
│   ├── asteroids/             # Rotating ship physics game (Port 3003)
│   ├── frogger/               # Grid-based crossing game (Port 3004)
│   └── tetris/                # Falling blocks puzzle (Port 3005)
├── packages/
│   ├── game-core/             # Shared game logic and utilities
│   ├── ui-components/         # Game UI components and styling
│   └── server-core/           # Shared server and multiplayer logic
├── tools/                     # Build tools and configurations
└── Configuration files        # ESLint, Prettier, pnpm workspaces
```

---

<p align="center">
  <img src="https://github.com/dunamismax/images/blob/main/javascript/JavaScript-logo.png" alt="JavaScript" width="100" />
</p>

## Quick Start

**Prerequisites:** [Node.js 18+](https://nodejs.org/) and [pnpm 8+](https://pnpm.io/)

### Get Playing in 3 Steps

```bash
# 1. Clone and install
git clone https://github.com/dunamismax/javascript-games.git
cd javascript-games && pnpm install

# 2. Build all games
pnpm build

# 3. Start development servers
pnpm dev
```

**Access Games:** Visit individual game ports or use the game launcher at `http://localhost:3000`

## Phaser 3 - High-Performance 2D Game Engine

Phaser 3 powers all games in this collection, providing a robust framework for 2D game development with optimized rendering, physics, and input handling.

### Key Features

- **Arcade Physics** - Lightweight physics system optimized for 60fps gameplay
- **Scene Management** - Structured game flow with MenuScene → GameScene → GameOverScene
- **Input Handling** - Keyboard, mouse, and touch input with customizable controls
- **Asset Management** - Efficient sprite loading and texture atlasing
- **Audio System** - Web Audio API integration with spatial audio support
- **Mobile Optimization** - Touch controls and responsive scaling

### Performance Comparison

| Metric          | Traditional Canvas | Phaser 3 Optimized |
| --------------- | ------------------ | ------------------ |
| Frame Rate      | 30-45fps           | 60fps              |
| Physics Updates | Basic collision    | Arcade physics     |
| Asset Loading   | Manual management  | Automatic preload  |
| Mobile Support  | Limited            | Full touch support |
| Bundle Size     | Varies widely      | Optimized builds   |

## Tech Stack

**Game Engine:** Phaser 3 with arcade physics and scene management
**Core:** Node.js 18+, Modern JavaScript ES Modules, Fastify server
**Frontend:** HTML5 Canvas, responsive design, touch controls
**Build Tools:** esbuild for lightning-fast compilation and hot reload
**Mobile:** Capacitor for native iOS and Android deployment
**Deployment:** Production builds with asset optimization and caching

## Architecture

**Monorepo Structure:** pnpm workspaces with shared packages and independent games

- **`game-core`** - Shared game logic, utilities, and common components
- **`ui-components`** - Game UI elements, menus, and styling system
- **`server-core`** - Multiplayer server logic and Socket.IO integration
- **Individual Games** - Self-contained game applications with unique mechanics
- **Mobile Apps** - Capacitor-wrapped versions for native deployment

## Development Scripts

```bash
# Development
pnpm dev               # Start all games in development mode
pnpm dev:pong         # Start only Pong game (Port 3000)
pnpm dev:snake        # Start only Snake game (Port 3001)
pnpm dev:invaders     # Start only Space Invaders (Port 3002)
pnpm dev:asteroids    # Start only Asteroids (Port 3003)
pnpm dev:frogger      # Start only Frogger (Port 3004)
pnpm dev:tetris       # Start only Tetris (Port 3005)

# Building
pnpm build            # Build all games for production
pnpm build:mobile     # Build for mobile deployment
pnpm clean            # Clean all built assets

# Testing
pnpm test             # Run unit tests with Vitest
pnpm test:e2e         # Run end-to-end tests with Playwright
pnpm test:coverage    # Generate test coverage reports

# Code Quality
pnpm lint             # Lint all JavaScript files with ESLint
pnpm lint:fix         # Auto-fix linting issues
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Mobile
pnpm mobile:setup     # Setup Capacitor for mobile development
pnpm mobile:ios       # Build and deploy to iOS
pnpm mobile:android   # Build and deploy to Android
```

---

<p align="center">
  <img src="https://github.com/dunamismax/images/blob/main/javascript/js-evolution-wallpaper.jpg" alt="JavaScript Evolution" width="450" />
</p>

## Key Features

**High Performance:** Phaser 3 game engine, esbuild compilation, arcade physics, 60fps gameplay optimization

**Modern Development:** Hot reload with instant feedback, Vitest unit testing, Playwright E2E testing, comprehensive linting

**Mobile Ready:** Capacitor native app deployment, touch controls, responsive scaling, iOS and Android support

**Production Deployment:** Optimized asset bundles, CDN-ready builds, progressive loading, performance monitoring

## Games Collection

**1. Pong (Port 3000):**

- Classic two-player paddle tennis gameplay
- W/S keys vs UP/DOWN arrow controls
- First player to score 5 points wins
- Real-time physics and ball acceleration

**2. Snake (Port 3001):**

- Growing snake with food collection mechanics
- Arrow keys or WASD movement controls
- Collision detection with walls and self
- Progressive difficulty and scoring system

**3. Space Invaders (Port 3002):**

- Retro arcade shooter with wave progression
- Arrow keys for movement, spacebar to shoot
- Enemy formation patterns and power-ups
- Classic arcade sound effects and visuals

**4. Asteroids (Port 3003):**

- Rotating ship with realistic physics
- Thrust and rotation controls with momentum
- Asteroid destruction and fragment mechanics
- Wrap-around screen boundaries

**5. Frogger (Port 3004):**

- Grid-based crossing with timing challenges
- Navigate through traffic and river hazards
- Multiple difficulty levels and obstacles
- Lives system with checkpoint progression

**6. Tetris (Port 3005):**

- Classic falling blocks puzzle mechanics
- Arrow keys for movement and rotation
- Line clearing with cascade effects
- Progressive speed increase and scoring

## Mobile Deployment

**iOS Deployment:**

```bash
cd apps/asteroids
npx cap add ios
pnpm build && npx cap sync
npx cap open ios      # Opens Xcode for building
```

**Android Deployment:**

```bash
cd apps/asteroids
npx cap add android
pnpm build && npx cap sync
npx cap open android  # Opens Android Studio
```

**Note:** Mobile deployment requires Xcode (iOS) and Android Studio (Android) development environments.

## Production Deployment

**Quick Deploy:**

```bash
pnpm build    # Build all games for production
pnpm start    # Start production servers
```

**Self-Hosting:** Use production builds with CDN distribution for optimal performance. All games are optimized for static hosting and can be deployed to any web server.

## Contributing

1. Fork and create feature branch
2. Make changes following existing game patterns and architecture
3. Run `pnpm lint && pnpm format && pnpm build && pnpm test`
4. Test changes in both development and production modes
5. Submit pull request with clear description

**Code Style:** Uses ESLint and Prettier with shared configurations for consistent code quality

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <a href="https://www.buymeacoffee.com/dunamismax">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
  </a>
</p>

<p align="center">
  <a href="https://twitter.com/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"></a>
  <a href="https://bsky.app/profile/dunamismax.bsky.social" target="_blank"><img src="https://img.shields.io/badge/Bluesky-blue?style=for-the-badge&logo=bluesky&logoColor=white" alt="Bluesky"></a>
  <a href="https://reddit.com/user/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Reddit-%23FF4500.svg?&style=for-the-badge&logo=reddit&logoColor=white" alt="Reddit"></a>
  <a href="https://discord.com/users/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Discord-dunamismax-7289DA.svg?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://signal.me/#p/+dunamismax.66" target="_blank"><img src="https://img.shields.io/badge/Signal-dunamismax.66-3A76F0.svg?style=for-the-badge&logo=signal&logoColor=white" alt="Signal"></a>
</p>

---

<p align="center">
  <strong>JavaScript 2D Game Development Stack</strong><br>
  <sub>Phaser 3 • esbuild • Node.js • Capacitor • Lightning-Fast Arcade Gaming</sub>
</p>

<p align="center">
  <img src="https://github.com/dunamismax/images/blob/main/javascript/js-coffee-particles.jpg" alt="JavaScript Coffee" width="450" />
</p>
