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
  // routes(defineRoutes) {
  //   // uses the v1 convention, works in v1.15+ and v2
  //   return createRoutesFromFolders(defineRoutes);
  // },
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
  future: {
    v2_dev: true,
  },
};

// function selectConfig() {
//   if (!['development', 'production'].includes(process.env.NODE_ENV))
//     throw `Unknown NODE_ENV: ${process.env.NODE_ENV}`;
//   if (process.env.NODE_ENV === 'development') return devConfig;
//   if (!process.env.CF_PAGES && !process.env.NETLIFY) return buildConfig;
//   if (process.env.CF_PAGES) return cloudflarePagesConfig;
//   if (process.env.NETLIFY) return netlifyConfig;
//   throw `Cannot select config`;
// }

function selectConfig() {
  const ENV = process.env?.NODE_ENV || process.env?.VERCEL_ENV;
  if (!['preview', 'development', 'production'].includes(ENV))
    throw new Error(`Unknown ENV: ${ENV}`);
  if (ENV === 'development') return devConfig;
  return buildConfig;
}

module.exports = selectConfig();
