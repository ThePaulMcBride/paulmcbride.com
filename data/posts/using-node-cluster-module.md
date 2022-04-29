---
slug: 'using-node-cluster-module'
date: '2017-09-28'
title: 'Using the Node.js Cluster Module'
description: 'Using the Node.js Cluster module is an easy way to achieve significant performance gains for your app. Find out how to use it in this article.'
banner: '/images/node-cluster-module.jpg'
tags: ['javascript', 'code']
published: true
---

As we know, Node.js is a single threaded JavaScript runtime. A node process can only use a maximum of 1 CPU core and around 1.5GB of RAM. In this article, I will show you how we can use the Node.js cluster module to node processes to allow your app to take full advantage of the resources available.

## What is the Node.js cluster module?

The cluster module is a Node.js core module that, among other things, allows you to create child processes (workers). These child processes run on separate CPU cores allowing you to distribute the work across available resources.

Let's look at an example of how to use it. In this example, assume that `app` is an express.js app.

```javascript
const cluster = require('cluster')
const os = require('os')
const app = require('./app')

const cpuCount = os.cpus().length

if (cluster.isMaster) {
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork()
  }
}
if (cluster.isWorker) {
  app.listen(8000, () => {
    console.log('Server listening on port 8000')
  })
}
```

In the above example, when our app is started, we use the `os` module to determine the number of CPU cores available to us. Next, we check if the current process is the master process. In this case, it is as the first process started is always the master process.

The master process then calls `cluster.fork()` once for each CPU core. This, in turn, starts several more node processes in "worker mode". This means `cluser.isMaster` is `false` and `cluster.isWorker` is true.

Each worker process then spins up an instance of our app. Requests coming into out app are handled by the master process which immediately hands them off to an available worker process.

## Advantages of Using a Clustered App

Running an app like this has several advantages. Let's talk about the main reasons to use clustering.

### 1. Better use of system resources

With just a few extra lines of code, we can greatly increase the performance of a Node.js application.

### 2. Fault tolerance

As there are now several instances of the app running, if for whatever reason one of them crashes, the others are still available to handle requests.

### 3. Zero downtime deployments

One of the cool things about using clustering is that during a deployment, you can upgrade your code without interrupting your service. This is achieved by stopping and upgrading one process at a time.

The example above does not handle this case, but it's not hard to implement.

### 4. Increased performance

This is obvious. Several instances of your app should be able to handle more requests than a single app. I tested this on an app I was working on recently. I hit my app with 100 requests per second for one minute. Here are the results.

Running on a single CPU:

- 72 req/sec
- 1.12 secs average response time
- 4313 responses handled
- 0.4 MB/sec data throughput

Running on 8 CPU cores

- 261 req/sec
- 0.13 secs average response time
- 15654 responses handled
- 1.5 MB/sec data throughput

As you can see, the results are pretty crazy. With the cluster module, the app was able to handle requests over 8 times faster. Your results will differ depending on what your app does. In this case, it was rendering an HTML template.

## Conclusion

The Node.js Cluster module is a simple way to add a massive performance boost to your app. With less than 20 lines of code, you can run your app on multiple CPU cores, reduce the chances of an error bringing your app down and with a little more work, set up zero downtime deployments. Try running your app using the cluster module and let me know what kind of performance gains you achieve.
