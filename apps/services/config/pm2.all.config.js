const path = require("path");
import { readdir } from "fs/promises";

const getDirectories = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

module.exports = {
  apps: getDirectories(path.resolve(__dirname, "../servers")).map((name) => {
    console.log("coming in >>>>>>>>>", name);
    return {
      name,
      cwd: path.resolve(__dirname, `../servers/${name}`),
      script: "./index.ts",
      watch: [".", "../shared", "../../node_modules"],
      instance_var: "INSTANCE_ID",
      env: {
        NODE_ENV: "development",
        NODE_PATH: path.resolve(__dirname, "./node_modules"),
      },
    };
  }),
};
