<p align="center">
  <img src="/images/js-evolution.jpeg" alt="js-games Logo" width="400" />
</p>

<p align="center">
  <a href="https://github.com/dunamismax/js-games">
    <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=24&pause=1000&color=F7DF1E&center=true&vCenter=true&width=800&lines=JavaScript+2D+Game+Development+Stack;Phaser+3+%2B+esbuild+%2B+Fastify;Lightning-Fast+Builds+%2B+Mobile+Ready;Classic+Games%3A+Asteroids+%2B+Frogger+%2B+Tetris;Zero+Framework+Overhead" alt="Typing SVG" />
  </a>
</p>

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js" alt="Node.js Version"></a>
  <a href="https://phaser.io/"><img src="https://img.shields.io/badge/Phaser-3.70+-7B2CBF.svg?logo=phaser" alt="Phaser Version"></a>
  <a href="https://esbuild.github.io/"><img src="https://img.shields.io/badge/esbuild-0.20+-FFCF00.svg?logo=esbuild" alt="esbuild Version"></a>
  <a href="https://www.fastify.io/"><img src="https://img.shields.io/badge/Fastify-4.0+-000000.svg?logo=fastify" alt="Fastify Version"></a>
  <a href="https://capacitorjs.com/"><img src="https://img.shields.io/badge/Capacitor-6.0+-119EFF.svg?logo=capacitor" alt="Capacitor Version"></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-8.0+-F69220.svg?logo=pnpm" alt="pnpm Version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"></a>
</p>

---

## JavaScript 2D Game Development Stack

High-performance Phaser 3 games for web and mobile platforms using modern JavaScript tooling.

### Tech Stack

- **Game Engine**: Phaser 3 for 2D HTML5 games
- **Build**: esbuild for lightning-fast compilation
- **Backend**: Fastify + Socket.IO for multiplayer
- **Mobile**: Capacitor for iOS/Android deployment
- **Package Manager**: pnpm for efficient dependency management

## Quick Start

```bash
git clone https://github.com/dunamismax/js-games.git
cd js-games
pnpm install && pnpm build && pnpm dev
```

## Games

### 1. Pong (Port 3000)

Classic two-player paddle tennis - W/S vs UP/DOWN arrows, first to 5 wins

### 2. Snake (Port 3001)

Growing snake game - Arrow keys/WASD, eat food, avoid walls and tail

### 3. Space Invaders (Port 3002)

Retro arcade shooter - Arrow keys to move, spacebar to shoot

### 4. Asteroids (Port 3003)

Rotating ship physics - Arrow keys for rotation/thrust, spacebar to fire

### 5. Frogger (Port 3004)

Grid-based crossing - Navigate traffic and river hazards

### 6. Tetris (Port 3005)

Falling blocks puzzle - Arrow keys to move/rotate, clear lines

## Development Commands

```bash
pnpm dev           # Start all games with hot reload
pnpm build         # Build all games for production
pnpm test          # Run unit tests
pnpm test:e2e      # Run end-to-end tests
pnpm lint          # ESLint all packages
```

### Individual Games

```bash
cd apps/pong && pnpm dev              # Port 3000
cd apps/snake && pnpm dev             # Port 3001
cd apps/space-invaders && pnpm dev    # Port 3002
cd apps/asteroids && pnpm dev         # Port 3003
cd apps/frogger && pnpm dev           # Port 3004
cd apps/tetris && pnpm dev            # Port 3005
```

## Mobile Deployment

```bash
cd apps/asteroids
npx cap add ios android
pnpm build && npx cap sync
npx cap open ios      # Opens Xcode
npx cap open android  # Opens Android Studio
```

## Architecture

- **Monorepo**: Shared packages for game logic, UI components, server core
- **Scene Structure**: MenuScene → GameScene → GameOverScene
- **Physics**: Arcade physics for 60fps performance
- **Testing**: Vitest for units, Playwright for E2E

## Contributing

Fork → Feature branch → Tests → Lint → Pull request

## Support This Project

If you find this JavaScript 2D Game Development Stack valuable, consider supporting its development:

<p align="center">
  <a href="https://www.buymeacoffee.com/dunamismax" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" />
  </a>
</p>

## Connect

<p align="center">
  <a href="https://twitter.com/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"></a>
  <a href="https://bsky.app/profile/dunamismax.bsky.social" target="_blank"><img src="https://img.shields.io/badge/Bluesky-blue?style=for-the-badge&logo=bluesky&logoColor=white" alt="Bluesky"></a>
  <a href="https://reddit.com/user/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Reddit-%23FF4500.svg?&style=for-the-badge&logo=reddit&logoColor=white" alt="Reddit"></a>
  <a href="https://discord.com/users/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Discord-dunamismax-7289DA.svg?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://signal.me/#p/+dunamismax.66" target="_blank"><img src="https://img.shields.io/badge/Signal-dunamismax.66-3A76F0.svg?style=for-the-badge&logo=signal&logoColor=white" alt="Signal"></a>
</p>

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <img src="/images/js-yellow-crown.jpg" alt="JavaScript Games" width="400" />
</p>

<p align="center">
  <strong>JavaScript 2D Game Development Stack</strong><br>
  <sub>Phaser 3 + esbuild + Fastify + MongoDB + Capacitor</sub>
</p>
