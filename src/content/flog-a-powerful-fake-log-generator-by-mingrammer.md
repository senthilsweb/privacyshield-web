---
title: "Flog: A Powerful Fake Log Generator by @mingrammer 🚀📊"
slug: flog-a-powerful-fake-log-generator-by-mingrammer
date: 2024-09-09T12:00:00.000Z
published: true
description: Looking for a simple way to generate fake log data for testing or simulating real-world scenarios?. Look no further than Flog by @mingrammer
industries: ['Technology','Software Development','Web Design']
coverImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Flog:%20A%20Powerful%20Fake%20Log%20Generator%20by%20@mingrammer,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Flog:%20A%20Powerful%20Fake%20Log%20Generator%20by%20@mingrammer,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['DataObservability','DataEngineering','dbt','DuckDB','DataLineage','Analytics','DataLake','BusinessMetadataManagement','Vue.js','Nuxt.js','Open Source','Web Development','Low Code Platform']
---
![Flog](/i/blog/Flog_A_Powerful_Fake_Log_Generator_banner.PNG)


Looking for a simple way to generate fake log data for testing or simulating real-world scenarios? Look no further than Flog by <a href="https://github.com/mingrammer/flog" class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400">@mingrammer!</a>

Flog supports multiple common log formats like Apache, JSON, and Common Log Format, making it versatile for various use cases. Whether you're testing log management systems, benchmarking, or generating synthetic data, Flog has you covered.

**Best of all**, it's available as a single Golang binary or can be run directly from Docker, giving you flexibility based on your setup. Personally, I like to use it inside a simple shell script to append logs to the local disk:


## Log generator in a shell script

```javascript
# flog.sh
while true; do docker run --rm mingrammer/flog -s 10s -n 20 -f json >> flog.log; sleep 10; done
```

## Generate logs:

Explore Flog on GitHub: Flog - <a href="https://github.com/mingrammer/flog" class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400"> Fake Log Generator</a>

```javascript
sh flog.sh
```