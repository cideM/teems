const xdg = require("xdg-basedir");
const { postInstall } = require("./index");

postInstall(xdg.config);
