const config = {
    verbose: true,
    transform: {
        "\\.ts?$": "ts-jest",
    },
    globals: {
        "ts-jest": {
          "tsConfig": '<rootDir>/tsconfig.json'
        }
      },
  };
  
  module.exports = config;