---
slug: "dev-ops-introduction-aws-lambda"
date: "2017-10-26"
title: "Dev Ops - An Introduction to AWS Lambda"
description: "Deploying code to the cloud has never been easier. Let's learn how AWS Lambda can help you run fast scalable app around the globe."
banner: "/images/cloud-computing-aws-lambda.jpg"
tags: ["devops"]
published: true
---

If you've ever looked into AWS (Amazon Web Services), you'll know how overwhelming it can be. There are close to 100 different products and services with countless possible applications. If AWS wasn't confusing enough, the services have cryptic names making near impossible to guess what they do.

However, when you look past this you'll find the biggest cloud provider in the world. A cloud provider who has all the tools you could ever need host your application.

Today we are going to look at AWS Lambda.

## Cloud Computing

Before we look at AWS Lambda, it's important to understand what AWS is. Amazon Web Services is described as a cloud computing platform which delivers on-demand compute power, database storage and other IT resources.

What does that actually mean though? Amazon owns data centres all over the world. They sell you access to this computing power on a pay as you go basis. On a very basic level, it can be likened to any other web hosting service. The main differences being, it can be scaled globally and has a bunch of extra features.

## AWS Lambda, Functions as a Service

Now we're up to speed on what AWS actually is, let's have a look at AWS Lambda. So what is Lambda? According to Amazon, Lambda can be described as follows.

> AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you.

In layman's terms, Lamda is a service that will execute a function in response to an event. This can be described as Functions As A Service (FAAS).

The interesting thing about using AWS Lambda is that you don't need to manage the server yourself. AWS handles all the scaling issues. You provide a function, tell it when it should run and you're finished.

## Why should you use AWS Lambda?

As we've already discussed, a Lambda function is triggered by an event. These triggers can be pretty much anything from an HTTP request to a new row being added to a database table. It can even watch Amazon S3, their file store service, for an image being uploaded. This could trigger a function which crops and resizes the image as required.

As a lambda can be triggered by an HTTP request, it is possible to run an application using only Lambda functions. This means you never have to worry about managing or scaling servers. This is made even easier by frameworks like Serverless

You don't have to completely rewrite your app to take advantage of the service though. A great way to use AWS Lambda is to offload computationally expensive pieces of code. That way, your server can focus on handling requests and putting pages in front of your users. An example of this would be converting a video from one format to another. The video would be converted by a function running on AWS Lambda, triggered by an HTTP request from your server.

### Cost

One of the most compelling reasons to move to AWS Lambda is the cost. Amazon has a very generous free allowance. In fact, if you execute less than 1,000,000 functions per month it could cost your nothing at all.

This free allowance doesn't expire. Beyond the free tier, extra functions and more compute time is inexpensive.

## Conclusion

Serverless infrastructure is becoming very popular right now. It's inexpensive, and simple to set up when compared to a VM or similar and it has scalability built in. AWS Lambda is definitely worth checking out and with the free tier, you have no excuses.
