import { build } from 'esbuild';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const isWatchMode = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/index.js'],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  outfile: 'dist/index.js',
  sourcemap: true,
  external: ['phaser'],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  minify: !isWatchMode,
};

async function buildPackage() {
  try {
    if (isWatchMode) {
      const ctx = await build({
        ...buildOptions,
        watch: {
          onRebuild(error, result) {
            if (error) console.error('Build failed:', error);
            else console.log('Build succeeded:', result);
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

buildPackage();
