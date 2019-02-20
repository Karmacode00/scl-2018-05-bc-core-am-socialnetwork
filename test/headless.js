global.window = global;
global.assert = require('chai').assert;
require('../src/main');
require('./main.spec.js');
