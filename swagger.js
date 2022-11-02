const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "My Api",
    description: "Temple Api",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endPointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endPointsFiles, doc);
