#!/usr/bin/env node

const meow = require("meow");
const activate = require("../lib/activateTheme");
const { getThemes, getConfig } = require("./index");

const cli = meow(
  `
	Changing your terminal color schemes should be easy.
	Also r/unixporn and Terminal.sexy, because relevant.

  Usage
		$  teems-cli [string] When called with one or more options, no theme will be activated and [string] will be ignored.

  Options
  	-l, --list List all available themes
		-d, --dump Dump teems configuration variables
	
	 Help
		Hit me up on twitter @AyanamiVey or write an issue on https://github.com/cideM/teems-cli
`,
  {
    alias: {
      l: "list",
      d: "dump"
    }
  }
);

if (Object.keys(cli.flags).length > 0) {
  if (cli.flags.list) {
    const themes = getThemes();
    themes.forEach(theme => {
      console.log(theme.name);
    });
  }

  if (cli.flags.dump) {
    console.log(getConfig());
  }
} else if (cli.input.length > 0) {
  const config = getConfig();
  const themes = getThemes();
  activate(cli.input[0], themes, config.backupDir).forEach(p => {
    p
      .then(result => console.log(`Modified config file for ${result.name}`))
      .catch(console.error);
  });
} else {
  cli.showHelp();
}
