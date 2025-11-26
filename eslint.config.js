import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const nextEslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: ["backend/.adminjs"],
  },
];

export default nextEslintConfig;
