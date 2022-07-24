module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@containers': './src/containers',
            '@helpers': './src/helpers',
            '@screens': './src/screens',
            '@services': './src/services',
            '@store': './src/store',
            '@modals': './src/modals',
            '@themes': './src/themes',
            '@assets': './src/assets',
            '@config': './src/config',
            '@dataMock': './src/mock',
            '@interfaces': './src/interfaces',
            '@utils': './src/utils',
            '@navigator': './src/navigators',
            '@shimmers': './src/shimmers',
            '@hooks': './src/hooks',
            '@dto': './src/dto',
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
