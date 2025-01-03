---
title: "Flog: A Powerful Fake Log Generator by @mingrammer 🚀📊"
slug: "flog-powerful-fake-log-generator-mingrammer"
imageUrl: "/images/coding.jpeg"
coverImage: "/images/coding.jpeg"
description: The "Tickit" database typically contains tables related to a fictional ticket-selling company, including data about events, venues, ticket sales, and customer information. It's designed to showcase various SQL operations and query scenarios.
date: 2023-09-15T12:00:00.000Z
tags: ["Vue.js", "Nuxt.js"]
---
![Flog](https://media.licdn.com/dms/image/v2/D4E12AQHabPMwXr23fg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1725834454734?e=1733961600&v=beta&t=k-xXjS7OfoG6QtrHE61n3VyyrhwDOduLLb2nnugM7TI)


Looking for a simple way to generate fake log data for testing or simulating real-world scenarios? Look no further than Flog by <a href="https://github.com/mingrammer/flog" class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400">@mingrammer!</a>


Flog supports multiple common log formats like Apache, JSON, and Common Log Format, making it versatile for various use cases. Whether you're testing log management systems, benchmarking, or generating synthetic data, Flog has you covered.

## This is a heading

**Best of all**, it's available as a single Golang binary or can be run directly from Docker, giving you flexibility based on your setup. Personally, I like to use it inside a simple shell script to append logs to the local disk:


### Log generator in a shell script

```javascript
# flog.sh
while true; do docker run --rm mingrammer/flog -s 10s -n 20 -f json >> flog.log; sleep 10; done
```

### Generate logs:

Explore Flog on GitHub: Flog - <a href="https://github.com/mingrammer/flog" class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400"> Fake Log Generator</a>

```javascript
sh flog.sh
```