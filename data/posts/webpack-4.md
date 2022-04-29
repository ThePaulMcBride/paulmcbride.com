---
slug: "webpack-4"
date: "2018-03-04"
title: "Up and Running with Webpack 4"
description: "Webpack 4 has finally been released and it is pretty great! If you are looking for zero config JavaScript bundling, then Webpack 4 is the tool for you!"
banner: "/images/webpack-4.jpg"
tags: ["tools"]
published: true
---

After much anticipation, Webpack 4 has finally been released and it is pretty great! If you are looking for zero config JavaScript bundling, then Webpack 4 is the tool for you. In this article, we’ll talk about the changes made from version 3 and how to get up and running with Webpack 4.

Before we dive too deeply into what’s new in Webpack 4, let’s quickly recap what Webpack actually is. Webpack is a module bundler. It takes care of care of compiling and transpiring code and assets into production-ready bundles. This includes transpiling JavaScript that uses modern ESNext features into a bundle that works in today’s browsers. Webpack can bundle basically anything if you use the correct loader.

## What’s new in Webpack 4

So what has actually changed?

### Webpack 4 is fast

A lot of work has been done under the hood in Webpack 4 and this has resulted in it being much faster. In some cases, build times have been reduced by up to 98%.

### Mode Configuration

In an attempt to simplify Webpack config, a `mode` option has been introduced. This value can be set to `production` or `development`. In development mode Webpack does all the things you would expect; better tooling for debugging, useful error messaging and faster incremental builds. In production mode, the output bundle is minified and optimised for runtime performance. Development-only code is also omitted from the bundle to help reduce the overall size.

### CommonsChunkPlugin has been deprecated

The plugin used for splitting the output bundle into multiple smaller bundles has been deprecated. Instead, this functionality is baked in and is configurable using the `optimize.splitChunks` option.

### WebAssembly Support

As long as you have a loader which can handle the language the WebAssembly file is written in, you can now directly import WebAssembly files.

### Zero Config Setup

One of the most exciting changes in Webpack 4 is that it can now be used without any setup. This is down to some new sensible defaults.

## Getting started

Now that we know what has changed, let’s look at how we could use Webpack in a new project. By default, it will look for `./src/index.js` as the entry point. Webpack will then bundle it up and emit it to `./dist/main.js`. So, if you have an `index.js` in your `src` folder, all you need to do after installing Webpack is run `webpack –mode development` for development mode or `webpack –mode production` for production mode.

Simple, right? Obviously, there is a lot more to Webpack. It is super configurable and you can make it do pretty much anything you want. If you want to learn more about how you can configure it, check out the official documentation. https://webpack.js.org/

## Conclusion

Webpack 4 has been released and it has a lot of benefits over previous versions. You should upgrade if you can!
