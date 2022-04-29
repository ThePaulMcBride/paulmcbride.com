---
slug: "var-let-const"
date: "2017-07-25"
title: "Var, Let and Const - The Differences"
description: "With the release of ES2015, we now have three ways of defining variables in JavaScript. `var`, `let` and `const`. Let me explain the difference."
banner: "/images/var-let-const.jpg"
tags: ["javascript", "code"]
published: true
---

With the release of ES2015, we now have three ways of defining variables in JavaScript. `var`, `let` and `const`. Let me explain the difference. Pun fully intended.

There are some important differences between them and in this article, we'll discuss the differences and when you would use one of the others. First, we'll look at `var`.

## The var keyword

With `var` the variables you create are globally scoped.

This means that the variable is available inside the function where it is defined, and all functions nested within.

Let's look at an example.

```javascript
var myVariable = 10;

function mutateVariable() {
  myVariable = 20;
}

mutateVariable();
console.log(myVariable); // 20;
```

As you can see, `myVariable` is available inside the `mutateVariable` function. `myVariable` can also be mutated/changed because that's how `var` works.

Globally scoped variables might seem harmless but if you're not careful, they can lead to bugs that are very difficult to track down.

Another interesting quirk that can be quite confusing is hoisting.

Hoisting is hard to explain, so let's look at an example.

```javascript
console.log(typeof myFunction); // "function"

function myFunction() {
  for (var i = 0; i < 3; i++) {
    var myVariable = 123;
  }
}
```

This is fairly normal looking code except for one thing. Notice on the first line, the typeof `myFunction` is actually function before it is ever defined.

This happens due to hoisting. When the JavaScript interpreter parses the above code, it looks more like this...

```javascript
function myFunction() {
  var i;
  var myFunctionScopedVariable;

  for (i = 0; i < 3; i++) {
    myVariable = 123;
  }
}

console.log(typeof test); // "function"
```

As you can imagine, this can be pretty unpleasant to debug.

## The let keyword

The `let` keyword works in the say way as the `var` keyword with a few exceptions.

The main difference between `var` and `let` is that `let` is block scoped. This means a variable created with `let` is only available inside the block it was created.

That means the madness seen with the `var` keyword is not longer a problem.

Let's take a look at the another example.

```javascript
function myFunction() {
  let myVariable = 10;

  myVariable = 20;
}

myFunction();
console.log(myVariable); // undefined;
```

As you can see, `myVariable` is only accessible from within `myFunction`. It is block scoped.

The other major difference is that `let` acts as though it is not hoisted.

```javascript
letVariable = "hello"; // Error
varVariable = "world"; // This works

let letVariable;
var varVariable;
```

## The const keyword

The `const` keyword is almost exactly the same as the `let` keyword. It is block scoped and acts as though it is not hoisted. The one major difference is that variables defined with `const` are... you guessed it, constants.

This means that the value has to be assigned when the `const` is initialized and cannot be changed later.

One thing to be aware of is that objects defined using the `const` keyword are not immutable. This means you can add, remove or change any of the key value pairs on the object.

For example...

```javascript
const pet = {
  type: "Dog",
  age: 5,
};

pet.age = 6;
console.log(pet.age); // 6
```

## Conclusion

Now that we have a better understanding of how to define variables it is important to understand when we would use one keyword over the other.

### When to use var

Almost never. In fact, if you are writing some code where you have to use var instead of `let` or `const` it's a good indicator that you've written some bad code that could be refactored.

### When you use let and const

Now that we have access to `let` and `const`, we should use them instead of `var`. If you know the variable isn't going to change, use `const`, otherwise, use `let`. This will help keep your code bug free and easy to understand.
