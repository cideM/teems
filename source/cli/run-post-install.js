const xdg = require("xdg-basedir");
const postInstall = require("./postinstall");

postInstall(xdg.config);
