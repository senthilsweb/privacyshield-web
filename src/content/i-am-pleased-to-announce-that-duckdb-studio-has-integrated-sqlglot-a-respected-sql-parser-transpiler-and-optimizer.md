---
title: I am pleased to announce that DuckDB Studio has integrated SQLGlot, a respected SQL parser, transpiler, and optimizer
slug: i-am-pleased-to-announce-that-duckdb-studio-has-integrated-sqlglot-a-respected-sql-parser-transpiler-and-optimizer
description: DuckDB Studio has integrated SQLGlot, a widely recognized SQL parser, transpiler, and optimizer, enhancing its SQL processing capabilities.

date: 2024-04-12T12:00:00.000Z
status: published
industries: []
coverImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:I%20am%20pleased%20to%20announce%20that%20DuckDB%20Studio%20has%20integrated%20SQLGlot%20a%20respected%20SQL%20parser%20transpiler%20and%20optimizer,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogimage: https://media.licdn.com/dms/image/v2/D4E12AQGqzZqJtsHE-Q/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1712889028795?e=1732752000&v=beta&t=xPRQ1E0UJzVUgFTm_bSH9jYf-emcJ8mpeJSAo_glKaQ
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1623612257/profile/sk_profile_sq.png
type: Blog
tags:
  - Blog
  - Article
  - Technology
  - Static Website
  - SPA
  - Single Page Webapplication
  - SQLGlot
---


### What is SQLGlot?

 
<a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://sqlglot.com/sqlglot.html">SQLGlot</a> is a no-dependency SQL parser, transpiler, optimizer, and engine. It can be used to format SQL or translate between <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://github.com/tobymao/sqlglot/blob/main/sqlglot/dialects/__init__.py">21 different dialects</a> like <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://duckdb.org/" >DuckDB</a>, <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://prestodb.io/">Presto</a> / <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://trino.io/">Trino</a>, <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://spark.apache.org/" >Spark</a> / <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://www.databricks.com/" >Databricks</a>, Snowflake, and BigQuery. It aims to read a wide variety of SQL inputs and output syntactically and semantically correct SQL in the targeted dialects.

![TickitDB](/i/blog/Iam-pleased-to-announceDuckDB-Studio-has-integrated-SQLGlot-banner.GIF)

## So, what’s new?

Seamless SQL Parsing: Extract tables, columns, and select fields effortlessly.

Cross-Dialect Translation: Speak SQL in 21 dialects! Whether it’s DuckDB, Presto/Trino, or Snowflake, switch dialects like you switch tabs.

Smart Optimization: Fine-tune SQL queries for peak performance.

Code Beautification: Write SQL that's not just functional but also aesthetically pleasing, making maintenance and collaboration a breeze.

SQL parsing goes beyond just being clever; it’s an indispensable instrument in DataOps, crucial for revealing insights about table and field usage, data lineage, and analytics of data flow.

It's been rewarding to incorporate SQLGlot's capabilities into DuckDB Studio, all the credits goes to Toby Mao, the creative mind behind SQLGlot and Tobiko Data, the DataOps Platform. Their significant contributions are instrumental in driving the data engineering field toward a more interconnected and productive future.

See the integration in action at DuckDB Studio, now live on Vercel
