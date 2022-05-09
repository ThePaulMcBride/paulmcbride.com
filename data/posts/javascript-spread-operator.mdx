---
date: "2017-08-10"
title: "JavaScript Spread Operator"
description: "The keywords let and const are now part of Javascript. Let's explore what they do and how they differ from the var keyword."
banner: "/images/spread-operator.png"
tags: ["javascript", "code"]
---

The Javascript spread operator is something I use on a daily basis. If you use Redux, or need to write any kind of functional JavaScript then you need to know how to use the spread operator.

So what is the spread operator and how is it used? Lets see what the [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator) has to say.

> Spread syntax allows an iterable such as an array expression to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

Let's take a look at an example of how it's used.

```javascript
const numbers = [1, 2, 3];

const myNewArray = [...numbers]; // [1, 2, 3]
```

You see those three dots (`...`)? They have taken a copy of the values in the `numbers` array and placed them into `myNewArray`. This is a simple example, but those three dots allow us to do some very powerful things with very little code. Take a look at a few of these real-world use cases.

## Concatenating Arrays

```javascript
const a = [1, 2, 3];
const b = [7, 8, 9];

const c = [...a, 4, 5, 6, ...b];
```

As you can see, not only can we concatenate arrays, but we also get a really nice way to decide the order of the elements.

## Copying Objects and Arrays

This is a very powerful use case for the spread operator. First, we need to understand a little bit more about how JavaScript works. Let's take a look at some code.

```javascript
let apartmentA = {
  available: true,
  bedrooms: 1,
};

let apartmentB = apartmentA;

apartmentB["bedrooms"] = 3;

console.log(apartmentA["bedrooms"]); // 3
```

When we create `apartmentB` and set its value to `apartmentA`, we aren't really copying its values, we're creating a reference. Any thing we do to `apartmentB` will also affect `apartmentA`. This could easily lead to hard to find bugs in your code.

Using the spread operator, we can avoid this problem entirely.

```javascript
let apartmentA = {
  available: true,
  bedrooms: 1,
};

let apartmentB = { ...apartmentA };

apartmentB["bedrooms"] = 3;

console.log(apartmentA["bedrooms"]); // 1
```

As you can see, instead of creating a new object reference, we take a full copy of `apartmentA` and assign it to `apartmentB`.

## Passing arguments to a function

In order to pass an array as arguments to a function, we have to use `Function.prototype.apply`.

```javascript
function myAwesomeFunction(a, b, c) {
  // do awesome JavaScript stuff
}

const args = [0, 1, 2];

// Call the function, passing args
myAwesomeFunction.apply(null, args);
```

With the spread syntax, this can be written as follows...

```javascript
myAwesomeFunction(...args);
```

## Can I use it in modern browsers yet?

At the time of writing, the spread operator is supported by the newest version of all major browsers with a few caveats. Check current support at https://kangax.github.io/compat-table/es6/

## Conclusion

The spread operator is a powerful tool with wide support among browsers. It can help you write better code and less code. Start using it today!
