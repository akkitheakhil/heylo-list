module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],

    plugins: [
      ['transform-inline-environment-variables'],
      [
        'module-resolver',
        {
          alias: {
            tests: ['./tests/'],
            "src": "./src",
            "@theme": "./src/theme",
            "@context": './src/context',
            "@shared": './src/shared',
            "@components": './src/shared/components',
          }
        }
      ],
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ]
  };
};
