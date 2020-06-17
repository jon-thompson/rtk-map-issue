module.exports = {
  setupFiles: ["./__test__/setupTests.js"],
  reporters: ["default", "jest-junit"],
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
}
