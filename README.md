# barrier.js [![npm Version](http://img.shields.io/npm/v/barrier.svg?style=flat)](https://www.npmjs.org/package/@yuanqing/barrier) [![Build Status](https://img.shields.io/travis/yuanqing/barrier.svg?style=flat)](https://travis-ci.org/yuanqing/barrier) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/barrier.svg?style=flat)](https://coveralls.io/r/yuanqing/barrier)

> An implementation of the [Barrier](https://en.wikipedia.org/wiki/Barrier_(computer_science)) pattern in JavaScript.

## Usage

```js
'use strict';

var barrier = require('@yuanqing/barrier');

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
```

## API

```js
var barrier = require('@yuanqing/barrier');
```

### var b = barrier(num, cb)

- `num` &mdash; The number of functions we want to wait for at the barrier.
- `cb` &mdash; A function that is called when all the functions have reached the barrier. Its signature is `(err, results)`.
  - If any one of the functions we were waiting for had errored, `cb` is immediately called with the `err`. If multiple functions had errored, `cb` will only be called exactly once.
  - If no error had occurred, `results` is the result of all the functions.

### b(index [, err, result])

`b` is a function that is invoked to signal that a particular function has reached the barrier.

- `index` &mdash; An index associated with the function.
- `err` &mdash; Set this to a truthy value to indicate that an error had occurred.
- `result` &mdash; The result of the function; optional.

`b` must be invoked *exactly once* for every `index` in the range `[0, num)`. So, in our example, given that `num` is `2`, we invoke `b` with `index` set to `0` and `1`.

## Installation

Install via [npm](https://www.npmjs.com):

```
$ npm i --save @yuanqing/barrier
```

## License

[MIT](LICENSE.md)
