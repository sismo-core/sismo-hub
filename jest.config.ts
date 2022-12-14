export default {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  collectCoverageFrom: ["src/**/*.ts", "attesters/base/hydra-s1/**/*.ts"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@badges-metadata/(.*)": "<rootDir>/badges-metadata/$1",
    "@flows/(.*)": "<rootDir>/flows/$1",
    "@group-generators/(.*)": "<rootDir>/group-generators/$1",
  },
  testEnvironment: "jest-environment-node-single-context",
};
process.env = {
  ...process.env,
  // These env vars needs to be defined for the aws sdk to work
  AWS_REGION: "eu-west-1",
  AWS_ACCESS_KEY_ID: "minioadmin",
  AWS_SECRET_ACCESS_KEY: "minioadmin",
};
