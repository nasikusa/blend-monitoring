const inquirer = require('inquirer');
const opn = require('opn');

inquirer
  .prompt([
    {
      name: 'playgroundShortName',
      message:
        'react(ra) | redux(rd) | reduxToolkit(rt) | reactRedux(rr) | create react app(cra) | typeScript(t) | immer(i) | glReact(gr) | materialUI(m) | chroma(c) | emotion(e)',
      default: 'ra',
    },
  ])
  .then((answers) => {
    switch (answers.playgroundShortName) {
      case 'react':
      case 'ra':
        opn('https://ja.reactjs.org/docs/hello-world.html');
        break;
      case 'redux':
      case 'rd':
        opn('https://redux.js.org/introduction/getting-started');
        break;
      case 'reduxToolkit':
      case 'rt':
        opn('https://redux-toolkit.js.org/introduction/quick-start');
        break;
      case 'reactRedux':
      case 'rr':
        opn('https://react-redux.js.org/introduction/quick-start');
        break;
      case 'createReactApp':
      case 'cra':
        opn('https://create-react-app.dev/docs/getting-started');
        break;
      case 'typeScript':
      case 't':
        opn('https://www.typescriptlang.org/docs/');
        break;
      case 'immer':
      case 'i':
        opn('https://immerjs.github.io/immer/docs/introduction');
        break;
      case 'glReact':
      case 'gl-react':
      case 'gr':
        opn('https://gl-react-cookbook.surge.sh/hellogl');
        break;
      case 'materialUI':
      case 'MaterialUI':
      case 'm':
        opn('https://material-ui.com/');
        break;
      case 'chroma':
      case 'c':
        opn('https://gka.github.io/chroma.js/');
        break;
      case 'emotion':
      case 'e':
        opn('https://emotion.sh/docs/introduction');
        break;
    }
  });
