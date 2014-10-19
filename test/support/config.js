'use strict';

// This module configures the test environment by initializing
// the chai assertion modules. Also loads Q and lodash into global
// vairables.

global._ = require('lodash');

var chai = require('chai');

// Add .should method to all JavaScript Objects. Global should() makes
// it easier to talk about possibly undefined things like: should.not.exist(x)
global.should = chai.should();

// The expect(...) API is especially useful when asserting undefined objects
global.expect = chai.expect;

// Also enable C-like assert(foo == 'bar') api
global.assert = chai.assert;

global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
