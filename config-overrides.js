const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const { addLessLoader, useEslintRc, addBundleVisualizer } = require('customize-cra');

module.exports = function override(config, env) {
  const options = {
    localIdentName: '[local]-[hash:base64:5]',
    modifyVars: {
      'ant-theme-file': "~'ant-custom-theme.less'",
    },
    javascriptEnabled: true,
  };

  config = useEslintRc()(config);
  config = addLessLoader(options)(config);
  config = addBundleVisualizer(
    {
      analyzerMode: 'static',
      reportFilename: 'report.html',
    },
    true // --analyze
  )(config);

  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript', 'json'],
    })
  );

  return config;
};
