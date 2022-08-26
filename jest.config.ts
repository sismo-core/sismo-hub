export default {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  collectCoverageFrom: ["src/**/*.ts", "attesters/base/hydra-s1/**/*.ts"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@attestations-collections/(.*)": "<rootDir>/attestations-collections/$1",
    "@flows/(.*)": "<rootDir>/flows/$1",
    "@group-generators/(.*)": "<rootDir>/group-generators/$1",
  },
  testEnvironment: "jest-environment-node-single-context",
};
