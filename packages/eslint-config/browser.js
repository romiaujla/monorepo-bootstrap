import globals from "globals";

import baseConfig from "./base.js";

const browserConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];

export default browserConfig;
