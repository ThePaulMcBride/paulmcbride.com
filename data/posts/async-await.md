---
date: "2017-09-07"
title: "Async/Await – Wait, What?"
description: "JavaScript and promises go hand in hand. Find out how async/await can help make your asynchronous code easier to read and understand."
banner: "/images/async-await.jpg"
tags: ["code", "javascript"]
---

With the release of the Async/Await syntax in JavaScript we now have a succinct and highly legible way of writing asynchronous code. In this article, I'll cover how to use Async/Await functions and why they are better than promises.

Let's start by using the [Fetch API](/javascript-fetch-api/) to make a request to an imaginary end point which returns a response, then we'll then log the response to the console.

```javascript
const getData = () => {
  fetch("http://example.com/data").then((response) => {
    console.log(response);
  });
};

getData();
```

That's not so bad. Let's take a look at how we would write the same code using Async/Await.

```javascript
const getData = async () => {
  console.log(await fetch("http://example.com/data"));
};

getData();
```

So much better, right? Notice the `async` keyword in the function declaration and the `await` keyword used before `fetch` and `response.json()`?

When we use the `async` keyword in a function declaration it gives us access to the `await` keyword in the function body. `Await` when used before a promise pauses the code execution until the promise resolves. If `await` is placed before a value which is not a Promise, it converts the value to a resolved Promise and waits for it.

Okay, so Async/Await allows us to write asynchronous code in a way that looks synchronous, but are there any other benefits? You bet there are.

## Why Async/Await functions are better than promises

### 1. Code is easier to read

With async/await, your asynchronous code reads just like synchronous code. It allows you to avoid nesting callbacks or chaining promises together and this leads to code that is easier to follow and debug.

### 2. Nested Requests

Imagine a function which makes three network requests, `requestA`, `requestB` and `requestC`. The value returned from `requestA` is used and `requestB` and then both return values are used in `requestC`.

With a promise based approach this would look something like the code below.

```javascript
const myFunction = async () => {
  return requestA().then((valueA) => {
    return requestB(valueA).then((valueB) => {
      return requestC(valueA, valueB);
    });
  });
};
```

When we rewrite this using async/await it becomes beautifully simple.

```javascript
const myFunction = async () => {
  const valueA = await requestA();
  const valueB = await requestB(valueA);
  return requestC(valueA, valueB);
};
```

### 3. Error Handling

With async/await functions, we can now use try catch blocks to handle errors. With promises, this is not possible. Error handling is now a little easier and more consistent.

## Conclusion

Async/await is a great way to make your JavaScript easier to read and maintain. Support is baked into the latest LTS version of Node and with Babel, async/await can be used in the browser too. If you write asynchronous code in JavaScript, check out Async/Await now.
