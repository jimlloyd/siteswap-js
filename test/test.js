// # test.js

'use strict';

require('./support/config');

/* jshint -W030 */

var Siteswap = require('../lib/siteswap').Siteswap;

describe('Siteswap', function() {

  it('should initialize', function() {
    new Siteswap('531');
  });

  it('should create valid throws array for vanilla siteswap', function() {
    var ss = new Siteswap('531');
    expect(ss.kind.vanilla).to.be.true;
    expect(ss.getThrows()).to.be.a('array');
    expect(ss.getThrows()).to.deep.equal([5,3,1]);
  });

  it('should not (yet) create throws array for multiplex', function() {
    var ss = new Siteswap('[43]333');
    expect(ss.getThrows()).to.be.undefined;
    expect(ss.kind).to.deep.equal({
      vanilla:false,
      multiplex:true,
      sync:false,
      syncMulti:false
    });
  });

  it('should not (yet) create throws array for sync', function() {
    var ss = new Siteswap('(4,2x)*');
    expect(ss.getThrows()).to.be.undefined;
    expect(ss.kind).to.deep.equal({
      vanilla:false,
      multiplex:false,
      sync:true,
      syncMulti:false
    });
  });

  it('should not (yet) create throws array for multisync', function() {
    var ss = new Siteswap('(4,[42x])*');
    expect(ss.getThrows()).to.be.undefined;
    expect(ss.kind).to.deep.equal({
      vanilla:false,
      multiplex:false,
      sync:false,
      syncMulti:true
    });
  });

  it('isSupported for multiplex should throw error', function() {
    function makeMultiplex() {
      var ss = new Siteswap('[43]333');
      return ss.isSupported();
    }
    expect(makeMultiplex).to.throw(Error, /Multiplex siteswap not yet supported/);
  });


});



