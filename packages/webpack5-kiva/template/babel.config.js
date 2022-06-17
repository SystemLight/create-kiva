module.exports = function (api) {
  api.assertVersion('^7.15')
  api.cache(true)

  let corejs = {
    version: 3,
    proposals: true
  }

  // 配置项：https://babel.docschina.org/docs/en/options/
  return {
    comments: true,
    presets: [
      [
        '@babel/env',
        {
          debug: false,
          modules: false,
          useBuiltIns: 'usage',
          ignoreBrowserslistConfig: false,
          corejs: corejs
        }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: corejs
        }
      ]
    ]
  }
}
