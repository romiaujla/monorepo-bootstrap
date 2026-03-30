import nextPlugin from "@next/eslint-plugin-next";
import browserConfig from "@repo/eslint-config/browser";

const uiConfig = [
  ...browserConfig,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];

export default uiConfig;
