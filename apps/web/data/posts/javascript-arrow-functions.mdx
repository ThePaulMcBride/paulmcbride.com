---
date: "2017-07-24"
title: "JavaScript Arrow Functions"
description: "Do you want to write beautiful JavaScript? Learn about JavaScript Arrow functions and how to use them."
banner: "/images/javascript-arrow-functions.png"
tags: ["javascript", "code"]
---

With the release of EcmaScript2015/ES6, JavaScript has undergone [major changes](/javascript-spread-operator/). Amongst these major changes is the addition of javascript arrow functions. In this article , am going to explain what an arrow function is and how to use it.

## What is an arrow function?

Before ES6, when we had a function that required another function passed in as a parameter (a callback), it would look like this.

```javascript
$(".button").click(function () {
  console.log("Hello World");
});
```

In this example, the jQuery function `click` requires one argument, a callback function. This callback function takes no arguments and logs "Hello World" to the console.

With arrow functions that same example would look like this.

```javascript
$(".button").click(() => console.log("hello"));
```

That's much nicer, right? The whole expression is on one line and is still easy to read. We've also gotten rid of the `function` keyword along with a handful for parentheses and curly braces.

So what is so good about arrow functions? Other than slightly shorter functions, what benefits are there to using them?

## Advantages of Using Arrow Functions

There are two very good reasons for using arrow functions they as follows:

1. Shorter, more succinct syntax
2. Lexical binding of the `this` keyword.

First, we'll look at the great new syntax.

### JavaScript Arrow Function Syntax

As you saw in the above example, the syntax is a little shorter, but there is more to it than that. Let's look at another example. Here is a simple function declaration using some pre ES6 Javascript.

```javascript
var sum = function (num1, num2) {
  return num1 + num2;
};
```

Now let's look at how we'd do this an arrow function.

```javascript
var sum = (num1, num2) => num1 + num2;
```

With arrow functions, the `return` keyword is unnecessary. In a single line arrow function, the return is implicit. It is important to note that the `return` key word is only implicit when the expression is a single line. It is also not implicit if `{}` are used to declare the function.

### Lexical Binding of `this` keyword

One of the most confusing parts of JavaScript is the `this` keyword. Before ES6 and arrow functions, every function defined its own value for `this`. When using arrow functions, it is greatly simplified. Arrow functions inherit `this` from their containing context. Let's look at an example using a regular function first.

```javascript
function Timer() {
  // The Timer() constructor defines `this` as an instance of itself.
  this.seconds = 0;

  setInterval(function tick() {
    // In non-strict mode, the tick() function defines `this`
    // as the global object, which is different from the `this`
    // defined by the Timer() constructor.
    this.seconds++;
  }, 1000);
}

var timer = new Timer();
```

We could work around this by binding the value `this` to a variable.

```javascript
function Timer() {
  var self = this;
  self.seconds = 0;

  setInterval(function tick() {
    // The callback refers to the `that` variable of which
    // the value is the expected object.
    self.seconds++;
  }, 1000);
}
```

In the above example, when we execute `self.seconds++`, the tick function will check its parent's scope to find out what `self` is.

As I mentioned, arrow functions inherit the value of `this` from their parent/containing scope. Let see how the above Timer would work with arrow functions.

```javascript
function Timer() {
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the timer object
  }, 1000);
}

var timer = new Timer();
```

## In Conclusion

Arrow functions may appear confusing at first and their syntax may not be very beginner friendly, but once you know how to use them they are very powerful. The succinct syntax coupled with the way the `this` keyword works means it's hard to find a reason not to start using them right away.
