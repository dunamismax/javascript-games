import { build } from 'esbuild';

const isDev = process.argv.includes('--dev');

const buildOptions = {
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  outfile: 'dist/game.js',
  sourcemap: isDev,
  minify: !isDev,
  define: {
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
  },
};

async function buildGame() {
  try {
    if (isDev) {
      const ctx = await build({
        ...buildOptions,
        watch: {
          onRebuild(error, result) {
            if (error) console.error('Build failed:', error);
            else console.log('Build succeeded');
          },
        },
      });
      console.log('Watching for changes...');
    } else {
      await build(buildOptions);
      console.log('Build completed successfully');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildGame();
