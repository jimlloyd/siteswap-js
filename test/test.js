// # test.js

'use strict';

require('./support/config');

var Siteswap = require('../lib/siteswap').Siteswap;

describe('Siteswap', function() {

  it('should initialize', function() {
    var ss531 = new Siteswap('531');
  });

  it('should create valid throws array for vanilla siteswap', function() {
    var ss531 = new Siteswap('531');
    expect(ss531.getThrows()).to.be.a('array');
    expect(ss531.getThrows()).to.deep.equal([5,3,1]);
  });
});
