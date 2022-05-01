---
date: "2017-10-12"
title: "Module Caching in Node"
description: "In Node.js we use the CommonJS module pattern for sharing code between files. In this article, I'll explain what module caching is and how it works."
banner: "/images/module-caching-in-node.jpg"
tags: ["javascript", "tools"]
---

In Node.js we use the CommonJS module pattern for sharing code between files. In this article, I'll explain how to use the `require` keyword and how it's related to module caching in Node.

## CommonJS

CommonJS is the pattern used in Node.js to share functionality from on file to others. A typical Node module might look something like this.

```javascript
// maths-helpers.js

exports.add = (x, y) => x + y;

exports.subtract = (x, y) => x - y;
```

To use the code defined in `maths-helpers.js` we would use the `require` keyword.

```javascript
const helpers = require("./maths-helpers.js");

const total = helpers.add(5, 10);

console.log(total); // 15
```

Simple enough, right?

## Module Caching in Node.js

Let's look at another example which isn't as simple.

```javascript
// counter.js

let count = 0;

exports.increment = () => {
  count++;
};

exports.total = () => {
  return count;
};
```

Here we have another simple module that counts the number of times the increment method has been called. Let's use it.

```javascript
const counter1 = require('./counter.js');
const counter2 = require('./counter.js');

const counter1.imcrement();
const counter1.increment();

console.log(counter1.total()); // 2
console.log(counter2.total()); // 2
```

Pretty weird right? We create two counters and increment `counter1` twice. This gives it a total of 2. When we check the value of `counter2` it's also 2! So what's happening here?

In Node.js, the first time you require a module it gets cached. Each subsequent time the module is required you are actually accessing the cached instance.

## Exceptions

There are a few exceptions to this caching rule. The first exception is if import path used for each module is different. This may seem obvious, but it can catch you out if you are using a case-insensitive operating system (MacOS or Windows).

The second main exception can only occur when using npm version 2 or below. Let's say your project requires `moduleA` and `moduleB` from your node packages. If `moduleA` and `moduleB` both require `moduleC` they will both end up with different instances of `moduleC`. This is due to the way older versions of npm work. Each module would get its own copy of its dependencies. In more recent versions, dependencies are flattened.

## Conclusion

Now you know a little more about how `require` works in Node.js. There are a few quirks that you need to be aware of but they are simple enough to understand. Module caching can be very useful if used correctly, and now you know more about it, you can use it to your advantage. Go build something cool!
