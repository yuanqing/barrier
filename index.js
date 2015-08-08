'use strict';

var barrier = function(num, cb) {

  if (num < 1) {
    throw new Error('invalid n: ' + num);
  }
  if (typeof cb !== 'function') {
    throw new Error('cb must be a function');
  }

  var results = new Array(num);
  var completed = new Array(num);
  var numCompleted = 0;
  var hasErrored = false;

  return function(index, err, result) {
    if (hasErrored) {
      return;
    }
    hasErrored = true;
    if (err) {
      return cb(err);
    }
    if (index < 0 || index >= num) {
      return cb('invalid index: ' + index);
    }
    if (completed[index]) {
      return cb('called more than once: ' + index);
    }
    hasErrored = false;
    completed[index] = true;
    numCompleted++;
    results[index] = result;
    if (numCompleted === num) {
      cb(null, results);
    }
  };

};

module.exports = barrier;
