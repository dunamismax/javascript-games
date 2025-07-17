<p align="center">
  <img src="/images/js-games-logo.jpeg" alt="js-games Logo" width="400" />
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

## About This Stack

This monorepo showcases a high-performance JavaScript 2D game development stack - engineered for creating fast, responsive games for both web and mobile platforms. It leverages lightweight, powerful tools to deliver cross-platform gaming experiences with minimal overhead and maximum performance.

### Core Philosophy

- **JavaScript 2D Game Development**: Phaser 3 for powerful, cross-platform 2D games
- **Lightning-Fast Builds**: esbuild for near-instantaneous compilation and bundling
- **Cross-Platform Ready**: Web-first with Capacitor for iOS/Android deployment
- **Monorepo Architecture**: Shared packages for game logic, UI components, and utilities
- **Real-Time Multiplayer**: Fastify + Socket.IO for high-performance multiplayer games
- **Database Performance**: MongoDB for player data, scores, and game state

## 🎮 Games Included

### Asteroids
Classic space shooter with rotating ship mechanics and asteroid destruction.

**Features:**
- Ship rotation and thrust controls with arrow keys
- Asteroid breaking mechanics (large → medium → small)
- Progressive difficulty with increasing asteroid count
- Score system and lives mechanics
- Screen wrapping for ship and bullets

### Frogger
Grid-based crossing game with traffic and river obstacles.

**Features:**
- Grid-based movement with arrow key controls
- Multiple traffic lanes with cars at different speeds
- River crossing with moving logs and turtles
- Drowning mechanics when off platforms
- Progressive levels with increasing difficulty

### Tetris
Classic falling blocks puzzle with full tetromino mechanics.

**Features:**
- All 7 tetromino pieces (I, O, T, S, Z, J, L)
- Piece rotation and line clearing system
- Progressive speed increase by level
- Next piece preview display
- Score calculation based on lines cleared

## Tech Stack

| Layer                 | Technology                                                                        | Purpose                                     |
| --------------------- | --------------------------------------------------------------------------------- | ------------------------------------------- |
| **Game Engine**       | [Phaser 3](https://phaser.io/)                                                   | Fast, free HTML5 game framework            |
| **Build System**      | [esbuild](https://esbuild.github.io/)                                             | Lightning-fast builds and bundling          |
| **Backend Framework** | [Fastify](https://www.fastify.io/)                                                | High-performance Node.js web framework      |
| **Real-Time**         | [Socket.IO](https://socket.io/)                                                   | Bidirectional communication for multiplayer |
| **Database**          | [MongoDB](https://www.mongodb.com/)                                               | Document database for game data             |
| **Mobile Deployment** | [Capacitor](https://capacitorjs.com/)                                             | Cross-platform mobile app deployment        |
| **Testing**           | [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)            | Unit testing and end-to-end testing         |
| **Package Manager**   | [pnpm](https://pnpm.io/)                                                          | Fast, disk space efficient package manager  |

## Quick Start

### Prerequisites

- Node.js 18 or higher
- pnpm 8 or higher
- MongoDB (optional, for multiplayer features)

### Installation

1. Clone and initialize:

   ```bash
   git clone https://github.com/dunamismax/js-games.git
   cd js-games
   pnpm install
   ```

2. Build all packages:

   ```bash
   pnpm build
   ```

3. Start development:

   ```bash
   pnpm dev
   # All games available with hot reload
   ```

## Games Portfolio

### Asteroids Game (Port 3000)

Classic arcade space shooter with modern physics and controls.

**Gameplay:**
- Rotate ship with left/right arrow keys
- Thrust forward with up arrow
- Fire bullets with spacebar
- Destroy asteroids for points
- Avoid collision with asteroids

**Implementation:**
- Phaser 3 physics engine for realistic movement
- Vector-based ship controls and momentum
- Dynamic asteroid generation and destruction
- Score tracking and lives system
- Screen-wrapping mechanics

### Frogger Game (Port 3001)

Grid-based crossing game with traffic and water hazards.

**Gameplay:**
- Move frog with arrow keys (grid-based)
- Cross busy roads avoiding cars
- Navigate river on logs and turtles
- Reach the goal area to advance levels
- Fall in water or get hit by cars to lose lives

**Implementation:**
- Grid-based movement system
- Multiple traffic lanes with varying speeds
- Platform detection for river crossings
- Collision detection for hazards
- Progressive difficulty scaling

### Tetris Game (Port 3002)

Full-featured Tetris implementation with all classic mechanics.

**Gameplay:**
- Control falling tetrominoes with arrow keys
- Rotate pieces with up arrow
- Soft drop with down arrow
- Clear horizontal lines for points
- Game speeds up as level increases

**Implementation:**
- Complete tetromino system (7 piece types)
- Matrix-based game board and collision detection
- Line clearing algorithm with scoring
- Next piece preview system
- Progressive speed increase mechanics

## Development Commands

### Essential Commands

```bash
pnpm install        # Install all dependencies
pnpm dev           # Start all games in development mode
pnpm build         # Build all games for production
pnpm test          # Run unit tests
pnpm test:e2e      # Run end-to-end tests
pnpm lint          # Run ESLint across all packages
pnpm clean         # Clean build artifacts
```

### Individual Games

```bash
cd apps/asteroids && pnpm dev    # Run Asteroids only
cd apps/frogger && pnpm dev      # Run Frogger only
cd apps/tetris && pnpm dev       # Run Tetris only
cd apps/pong && pnpm dev         # Run Pong only
cd apps/snake && pnpm dev        # Run Snake only
cd apps/space-invaders && pnpm dev # Run Space Invaders only
```

### Build Commands

```bash
pnpm build         # Build all games
pnpm serve         # Serve production builds
```

### Development Tools

```bash
pnpm lint          # Lint all packages
pnpm format        # Format code with Prettier
pnpm clean         # Clean all build directories
```

## Package Architecture

### Game Applications (`apps/`)

**Individual Games**
- Each game has its own package.json and build configuration
- Shared scene structure: MenuScene, GameScene, GameOverScene
- Consistent controls and UI patterns across games
- Independent development and deployment

### Shared Packages (`packages/`)

**@js-games/game-logic**
- Physics utilities and collision detection
- Input handling and vector mathematics
- Common game mechanics and algorithms
- Performance optimization utilities

**@js-games/ui-components**
- Reusable UI components for menus and overlays
- Button, menu, and score display components
- Consistent styling and interaction patterns
- Game overlay and HUD elements

**@js-games/server-core**
- Fastify server setup and configuration
- Socket.IO integration for real-time features
- Database connection and utilities
- API endpoints for game data

**@js-games/eslint-config-custom**
- Shared ESLint configuration for JavaScript games
- Consistent code style across all packages
- Modern ES2020+ rule configurations

## Mobile Deployment

Each game can be deployed to iOS and Android using Capacitor:

### Setup Mobile Development

```bash
# Navigate to any game directory
cd apps/asteroids

# Add mobile platforms
npx cap add ios
npx cap add android

# Build and sync
pnpm build
npx cap sync
```

### Build for Mobile

```bash
# Copy web assets to native projects
npx cap copy

# Open in native IDE
npx cap open ios      # Opens Xcode
npx cap open android  # Opens Android Studio
```

### Capacitor Configuration

Each game includes a `capacitor.config.js` with:
- App ID and name configuration
- Splash screen settings
- Status bar styling
- Native plugin configurations

## Performance Benefits

- **Lightning-Fast Builds**: esbuild compiles games in milliseconds
- **Minimal Bundle Size**: Phaser 3 + game code optimized for web and mobile
- **Shared Code**: Common game logic reduces duplication
- **Hot Reload**: Instant feedback during development
- **Intelligent Caching**: Workspace-aware build optimization
- **Mobile Optimization**: Capacitor provides native performance
- **Physics Performance**: Arcade physics for smooth 60fps gameplay

## Testing Strategy

### Unit Testing with Vitest

```bash
pnpm test          # Run all unit tests
```

**Coverage Areas:**
- Game logic and physics calculations
- Collision detection algorithms
- Score calculation systems
- Input handling utilities

### End-to-End Testing with Playwright

```bash
pnpm test:e2e      # Run E2E tests
```

**Test Scenarios:**
- Game loading and initialization
- Core gameplay mechanics
- UI interactions and transitions
- Cross-browser compatibility

## Game Development Workflow

### Adding a New Game

1. **Create Game Directory**:
   ```bash
   mkdir apps/new-game
   cd apps/new-game
   ```

2. **Copy Template Structure**:
   ```bash
   cp -r ../pong/* .
   # Update package.json name and description
   ```

3. **Implement Game Scenes**:
   - `src/scenes/MenuScene.js` - Game menu and controls
   - `src/scenes/GameScene.js` - Core game logic
   - `src/scenes/GameOverScene.js` - End game state

4. **Configure Build**:
   - Update `build.js` for game-specific settings
   - Modify `index.html` title and styling
   - Set `capacitor.config.js` app details

### Game Development Best Practices

- **Scene Management**: Use Phaser's scene system for game states
- **Physics**: Leverage Arcade physics for simple, fast collision detection
- **Input Handling**: Consistent key mapping across games
- **Asset Loading**: Preload assets in scene preload() methods
- **Performance**: Use object pooling for bullets and particles
- **Mobile**: Touch-friendly controls and responsive design

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-game`
3. Implement your game following the established patterns
4. Add tests for game logic
5. Run linting: `pnpm lint`
6. Format code: `pnpm format`
7. Submit a pull request

## Troubleshooting

### Common Issues

**Build Problems:**
```bash
pnpm clean
pnpm install
pnpm build
```

**Game Not Loading:**
```bash
# Check console for errors
# Verify Phaser CDN is accessible
# Ensure game.js bundle is generated
```

**Mobile Deployment Issues:**
```bash
# Sync native projects
npx cap sync

# Clean and rebuild
pnpm build
npx cap copy
```

**Development Server Issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

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
  <img src="/images/js-games-showcase.jpg" alt="JavaScript Games" width="400" />
</p>

<p align="center">
  <strong>JavaScript 2D Game Development Stack</strong><br>
  <sub>Phaser 3 + esbuild + Fastify + MongoDB + Capacitor</sub>
</p>