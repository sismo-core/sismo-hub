export default {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  collectCoverageFrom: ["src/**/*.ts", "hydra-s1/**/*.ts"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@attesters/(.*)": "<rootDir>/attesters/$1",
    "@group-generators/(.*)": "<rootDir>/group-generators/$1",
  },
};
