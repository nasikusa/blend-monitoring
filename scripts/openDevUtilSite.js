const inquirer = require('inquirer');
const opn = require('opn');

inquirer
  .prompt([
    {
      name: 'playgroundShortName',
      message:
        'cs: CodeSandBox | cp: CodePen | t: TypeScript Playground | dts: TypeScript d.ts search | g: Github Repo | \n y: Youtube | uuid: UUID Generator | bm: BlendMonitoring | ciu: CanIUse | gls: glslSandBox',
      default: 'cs',
    },
  ])
  .then((answers) => {
    switch (answers.playgroundShortName) {
      case 'cs':
        opn('https://codesandbox.io/');
        break;
      case 'cp':
        opn('https://codepen.io/');
        break;
      case 't':
        opn('https://www.typescriptlang.org/play');
        break;
      case 'dts':
        opn('https://www.typescriptlang.org/dt/search?search=');
        break;
      case 'g':
        opn('https://github.com/nasikusa/blend-monitoring');
        break;
      case 'y':
        opn('https://www.youtube.com/');
        break;
      case 'uuid':
        opn('https://www.uuidgenerator.net/');
        break;
      case 'bm':
        opn('https://blend.nasikusa.net/');
        break;
      case 'ciu':
        opn('https://caniuse.com/');
        break;
      case 'gls':
        opn('http://glslsandbox.com/');
        break;
    }
  });
