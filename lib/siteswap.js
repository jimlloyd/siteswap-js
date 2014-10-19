// siteswap.js

'use strict';

function Siteswap(ss) {
  if (!(this instanceof Siteswap)) {
    return new Siteswap();
  }
	var self = this;
	self.ss = ss = ss.toLowerCase();

  // Multiplex uses []
  // Async uses ()
  // An x in an async pattern might be a throw or it might be an annotation indicating
  // the throw is a crossing throw.

	var isVanilla = /^([0-9a-z])+$/.test(ss);
	var isSync = /^([0-9a-z\(\)],\*)+$/.test(ss) && /\((0-9a-z)+,(0-9a-z)+\)/.test(ss);
	var isMultiplex = /^([0-9a-z\[\]])+$/.test(ss) && /\[(0-9a-z)+\]/.test(ss);

	if (isMultiplex) {
	  throw new Error('Multiplex siteswap not yet supported.');
	}
	if (isSync) {
	  throw new Error('Sync siteswap not yet supported.');
	}
	if (!isVanilla) {
	  throw new Error('Vanilla siteswap only at this time.');
	}

	// plain vanilla siteswap for now
	self._throws = [];
	for (var i=0; i<ss.length; ++i) {
	  var throwHeight;
	  if (ss[i]>='0' && ss[i]<='9')
	    throwHeight = ss[i].charCodeAt() - '0'.charCodeAt();
	  else if (ss[i]>='a' && ss[i]<='z')
	    throwHeight = ss[i].charCodeAt() - 'a'.charCodeAt() + 10;
	  else
	    throw new Error('Coding error, vanilla siteswap with unrecognized character');
	  self._throws.push(throwHeight);
	}
}

Siteswap.prototype.getThrows = function() {
  return this._throws;
};

exports.Siteswap = Siteswap;
