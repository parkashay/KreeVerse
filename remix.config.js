/**
 * @type {import('@remix-run/dev').AppConfig}
 */

/**
 * @type {import('@remix-run/dev').AppConfig}
 */

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
const devConfig = {
  appDirectory: 'app',
  serverModuleFormat: 'cjs',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],

  // routes(defineRoutes) {
  //   // uses the v1 convention, works in v1.15+ and v2
  //   return createRoutesFromFolders(defineRoutes);
  // },
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

function selectConfig() {
  if (!['development', 'production'].includes(process.env.NODE_ENV))
    throw `Unknown NODE_ENV: ${process.env.NODE_ENV}`;
  if (process.env.NODE_ENV === 'development') return devConfig;
  if (process.env.NODE_ENV === 'production') return prodConfig;
  throw `Cannot select config`;
}

module.exports = selectConfig();
