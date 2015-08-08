'use strict';

var barrier = require('..');

var b = barrier(2, function(err, result) {
  if (err) {
    throw err;
  }
  console.log(result); //=> ['foo', 'bar']
});

setTimeout(function() {
  b(0, null, 'foo');
}, 0);

setTimeout(function() {
  b(1, null, 'bar');
}, 100);
