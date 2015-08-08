'use strict';

var test = require('tape');
var barrier = require('..');

test('is a function', function(t) {
  t.plan(1);
  t.equal(typeof barrier, 'function');
});

test('invalid `num`', function(t) {
  t.plan(2);
  t.throws(function() {
    barrier();
  });
  t.throws(function() {
    barrier(0, function() {});
  });
});

test('invalid `cb`', function(t) {
  t.plan(2);
  t.throws(function() {
    barrier(2);
  });
  t.throws(function() {
    barrier(2, {});
  });
});

test('returns a function', function(t) {
  t.plan(1);
  t.equal(typeof barrier(2, function() {}), 'function');
});

test('calls `cb` when all functions have completed', function(t) {
  t.plan(1);
  var b = barrier(2, function(err) {
    t.false(err);
  });
  setTimeout(function() {
    b(0);
  }, 0);
  setTimeout(function() {
    b(1);
  }, 100);
});

test('calls `cb` with the result of all the functions', function(t) {
  t.plan(2);
  var b = barrier(2, function(err, results) {
    t.false(err);
    t.looseEqual(results, ['foo', 'bar']);
  });
  setTimeout(function() {
    b(0, null, 'foo');
  }, 0);
  setTimeout(function() {
    b(1, null, 'bar');
  }, 100);
});

test('calls `cb` with the error if one of the functions errored', function(t) {
  t.plan(1);
  var b = barrier(2, function(err) {
    t.equal(err, 'error');
  });
  setTimeout(function() {
    b(0, 'error');
  }, 0);
  setTimeout(function() {
    b(1, null);
  }, 100);
});

test('calls `cb` only once with the error if multiple functions errored', function(t) {
  t.plan(1);
  var b = barrier(2, function(err) {
    t.equal(err, 'foo');
  });
  setTimeout(function() {
    b(0, 'foo');
  }, 0);
  setTimeout(function() {
    b(1, 'bar');
  }, 100);
});

test('calls `cb` with an error if an `index` is invalid', function(t) {
  t.plan(1);
  var b = barrier(2, function(err) {
    t.true(err);
  });
  setTimeout(function() {
    b(0);
  }, 0);
  setTimeout(function() {
    b(2);
  }, 100);
});

test('calls `cb` with an error if a function is called multiple times', function(t) {
  t.plan(1);
  var b = barrier(2, function(err) {
    t.true(err);
  });
  setTimeout(function() {
    b(0, null, 'foo');
  }, 0);
  setTimeout(function() {
    b(0, null, 'bar');
  }, 100);
});
