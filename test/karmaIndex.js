var testsContext = require.context('../app/game-wrappers/', true, /.*-Test\.js$/);
testsContext.keys().forEach(testsContext);