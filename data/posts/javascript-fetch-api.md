---
slug: "javascript-fetch-api"
date: "2017-09-14"
title: "JavaScript Fetch API"
description: "The fetch API is used for making network requests in the browser. In this article we'll learn how it works"
banner: "/images/fetch-api.jpg"
tags: ["code", "javascript"]
published: true
---

The Javascript Fetch API replaces XMLHttpRequest for making network requests from client side apps. One of the main differences is that XMLHttpRequest uses callback functions to handle the response where as Fetch uses promises.

Let's look at an example of each. We'll make a request to an API and parse the JSON response.

## XMLHttpRequest

```javascript
const myRequest = new XMLHttpRequest();
myRequest.onload = () => {
  const response = JSON.parse(myRequest.response);
  console.log(response);
};
myRequest.onerror = function (err) {
  console.log("Fetch Error:", err);
};
myRequest.open("get", "https://jsonplaceholder.typicode.com/posts/1");
myRequest.send();
```

As you can see we have to define a callback for both the error and success responses. Let's make the same request with fetch.

## Fetch

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Whoops!");
    }
    return res;
  })
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((e) => console.log("Fetch Error:", err));
```

Isn't that better? Fetch returns a promise that when resolves containes the response. From here we can access the headers of the response etc.

To get access to the JSON in the body though, we have to call `.json` on the body. This again returns a promise which will resolve the parsed data.

At the end of the promise chain, we call catch, which will handle any errors.

### Response Data

As I mentioned, fetch resolves to a response which contains the response headers. Let's see what other useful information we can get.

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) => {
  res.ok; // Returns true if response status code is 200 - 299
  res.headers.get("Content-Type"); // Returns the content type header
  res.status; // Response status code
  response.statusText; // Returns the status text - eg. "Not Found"
  response.type; // Response type - eg "cors"
  response.url; // The url the request was made to
});
```

### Request Configuration

The fetch function takes an options second parameter, a configuration object. Let's take a look at how we might use this.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1' {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
  }
})
```

This is a post request with will be sent with the 'Accept' header. There are a lot more configuration options. You can read about them all on the [MDN fetch documents](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

### Concerns

One of the major drawbacks with the fetch API is that once a request is initiated, it cannot be cancelled. For a lot of people, this is a deal breaker. However, there are discussions happening in the JavaScript community around making this happen.

Another possible issue with the fetch API is that is reasonably new, so although it is supported by all modern browsers, if you have to support older browsers, it won't work without a [polyfill](https://github.com/github/fetch).

## Conclusion

Fetch is a welcome new API for making requests. It is easier to read and serves the purpose that XMLHttpRequest always tried to. If you are not using it yet, you are missing out on a simple, concise way of making HTTP requests from the browser. If you are interested in learning about how to use the fetch with Async/Await, check out my previous article. - [Asycn/Await Javascript Functions](/async-await/).
