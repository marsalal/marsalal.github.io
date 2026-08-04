---
title: "How & why I created this site?"
description: "The original motivation, tools, and deployment approach behind creating a personal space for technology and life."
date: 2021-01-19
tags: ["hugo"]
draft: false
featured: false
---

I've always thought that having a personal website will make you stand up above the rest of the people, lets admit it, having a site may add an extra hours in front of the desk and it will most likely will need a few pennys to maintain it. If you are not a developer or someone with the extra curiosity to learn by yourself; its highly probable that you either dont do it or dont want to hire someone to do it for you. But the days we are lucky to live, there are a lot of platforms that will give you a site almost built and ready to make it public, such as [wix](https://www.wix.com/), [Wordpress](https://wordpress.org/) or even [Shopify](https://www.shopify.com/) if you are looking something more robust that will include a shopping-cart; with those platforms a lot of people can save a lot of time and money to get they website up and running in minutes!

However, what about if I want just a static content website? Do I need something like wordpress? Do I need to sit down and start learning all the basics? While I was having my afternoon coffee and wondering those same questions, I started to look for alternatives that could meet what I had on my mind:

1. Minimal setup
2. Small learning curve
3. Easily adaptable

I bumped into [Victoria Drake's site](https://victoria.dev/site) where I read about Hugo and how easy could be for to start a site from scratch! I decided to give it a try and cross an item in my todo list: my own website! I started by installing a theme from the theme library that Hugo provides and use it as a Git submodule, that will also get out of my back the effort to come up with a design. Once I have that setup, it was a matter of defining what sections I wanted and what social accounts I wanted to expose. In less than 10 minutes I have a functional, responsive and customizable website, ready to be filled with new content.

Once I have it working I decided to explore Github actions and build a little pipeline by creating an action to build and deploy the site after each commit done against `master` branch. That way I could have a public repo where the action will deploy the application and a private repository where I could keep safe all the content for my website.

The main goal of this site is to post content related to technology, programming, sports or even cooking. Its a free space to share what I love the most, I hope to read you in the comments below!



#### Credits
I used [Hugo](https://gohugo.io/) as a content static generator and a [theme](https://themes.gohugo.io/minimal/) to create this site in less than 5 minutes. Also, kudos to [Victoria Drake](https://victoria.dev/site/) to inspire me to get this site up and running and for the [base](https://github.com/victoriadrake/hugo-remote) of my first Github action.
