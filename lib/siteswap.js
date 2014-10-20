// siteswap.js

'use strict';

function Siteswap(ss) {
  if (!(this instanceof Siteswap)) {
    return new Siteswap();
  }
	var self = this;
	self.ss = ss = ss.toLowerCase();

  // Multiplex uses []
  // Sync uses ()
  // An x in an async pattern might be a throw or it might be an annotation indicating
  // the throw is a crossing throw.

  var isVanillaPat = new RegExp('^[0-9a-z]+$');
  var isSyncPat = new RegExp('^[0-9a-z()\\*,]+$');
  var isMultiPat = new RegExp('^[0-9a-z\\[\\]]+$');
  var isMultiSyncPat = new RegExp('^[0-9a-z()\\*,\\[\\]]+$');

  var isVanilla = isVanillaPat.test(ss);
  var isSync = isSyncPat.test(ss);
  var isMulti = isMultiPat.test(ss);
  var isMultiSync = isMultiSyncPat.test(ss);

  self.kind = {
    vanilla: isVanilla,
    sync: isSync && !isVanilla,
    multiplex:  isMulti && !isVanilla,
    syncMulti:  isMultiSync && !isVanilla && !isMulti && !isSync
  };

  if (self.kind.vanilla) {
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
}

Siteswap.prototype.getThrows = function() {
  return this._throws;
};


Siteswap.prototype.isSupported = function() {
	if (this.kind.syncMulti) {
	  throw new Error('Sync-multiplex siteswap not yet supported.');
	}
	if (this.kind.multiplex) {
	  throw new Error('Multiplex siteswap not yet supported.');
	}
	if (this.kind.sync) {
	  throw new Error('Sync siteswap not yet supported.');
	}
	if (!this.kind.vanilla) {
	  throw new Error('Vanilla siteswap only at this time.');
	}
	return true;
};

exports.Siteswap = Siteswap;
