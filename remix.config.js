/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const cloudflarePagesConfig = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server-cloudflare-pages.js',
  ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const netlifyConfig = {
  serverBuildTarget: 'netlify',
  server: './server-netlify.js',
  ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const devConfig = {
  appDirectory: 'app',
  serverModuleFormat: 'cjs',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
  future: {
    v2_dev: true,
  },
};

const prodConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
};

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const buildConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  ignoredRouteFiles: ['.*'],
};

function selectConfig() {
  if (!['development', 'production'].includes(process.env.NODE_ENV))
    throw `Unknown NODE_ENV: ${process.env.NODE_ENV}`;
  if (process.env.NODE_ENV === 'development') return devConfig;
  if (!process.env.CF_PAGES && !process.env.NETLIFY) return buildConfig;
  if (process.env.CF_PAGES) return cloudflarePagesConfig;
  if (process.env.NETLIFY) return netlifyConfig;
  if (process.env.NODE_ENV === 'production') return prodConfig;
  throw `Cannot select config`;
}

module.exports = selectConfig();
