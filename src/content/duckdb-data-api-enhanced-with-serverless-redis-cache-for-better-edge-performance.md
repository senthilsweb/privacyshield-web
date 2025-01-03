---
title: "DuckDB Data API Enhanced with Serverless Redis Cache for Better Edge Performance"
slug: "duckdb-data-api-serverless-redis-cache-edge-performance"
imageUrl: "/images/coding.jpeg"
coverImage: "/images/coding.jpeg"
description: The "Tickit" database typically contains tables related to a fictional ticket-selling company, including data about events, venues, ticket sales, and customer information. It's designed to showcase various SQL operations and query scenarios.
date: 2023-09-15T12:00:00.000Z
tags: ["DataEngineering", "DuckDB", "DataLineage", "Analytics", "DataLake", "Vue.js", "Nuxt.js"]
---

## This is a heading

I've noted concerns and personally observed that my <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://duckdb-studio.vercel.app/">duckdb-studio application</a>, hosted on Vercel using the hobby plan, frequently crashes due to function timeouts. Developing on <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://vercel.com/docs/accounts/plans/hobby">Vercel's hobby plan</a> poses significant challenges, such as a maximum function invocation time of 10 seconds and limited memory, which impact the performance of data-intensive applications. To mitigate these limitations, I introduced serverless Redis/Upstash cache into our <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://github.com/senthilsweb/duckdb_data_api">duckdb-data-api</a>, the backend engine powering the <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://github.com/senthilsweb/duckdb-studio">duckdb-studio</a>.

### Solution: Serverless Redis Caching with Upstash

To tackle these challenges, I integrated <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://upstash.com/">Upstash</a> Redis a.k.a. <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://vercel.com/docs/storage/vercel-kv">Vercel-kv</a>, to provide a robust caching solution. The caching strategy involves:


::list{type="success"}
- **Middleware Strategy:** Implemented caching logic through FastAPI middleware using the decorator design pattern. This centralizes cache management and enhances efficiency.
- **Cache Key Naming Convention:** Our cache keys follow a structured format to ensure clarity and prevent conflicts, incorporating the request type and endpoint. 
::  

### See the enhanced performance in action

::list{type="success"}
- My blog [www.senthilsweb.com](www.senthilsweb.com) is powered by Motherduck/DuckDB via the duckdb-data-api hosted on Vercel edge, demonstrating rapid content delivery and data processing capabilities.
- duckdb-studio: [https://duckdb-studio.vercel.app](https://duckdb-studio.vercel.app) This platform, leveraging our enhanced API, showcases the speed and efficiency of operations powered by our caching strategy, offering a real-time example of how data can be managed and presented swiftly.
::

### Github projects

[https://github.com/senthilsweb/duckdb_data_api](https://github.com/senthilsweb/duckdb_data_api)

[https://github.com/senthilsweb/duckdb-studio](https://github.com/senthilsweb/duckdb-studio)

------------------------------------------------------------------------------------
### Vercel Hobby Plan Limitations

The hobby plan on Vercel provides a developmental platform but includes restrictions that can hinder data-heavy applications:

::list{type="success"}
- Function Timeout: Functions are limited to a runtime of 10 seconds.
- Memory Limitation: Available RAM is often insufficient for processing large datasets.
- The KV Storage Cap: The plan offers a maximum of 256 MB for cache storage.
::  


