---
title: "Introducing Semantic Data Modeling with Malloy and DuckDB | MotherDuck | PostgreSQL | BigQuery"
slug: introducing-semantic-data-modeling-with-malloy-and-duckdb-motherduck-postgresql-bigquery
date: 2024-07-11T12:00:00.000Z
published: true
description: If you work in Data Engineering, Data Science, or AI/ML, you have likely encountered terms such as DataOps, DataFabric, Data Governance, Business Metadata Management, ETL & Reverse ETL, Data Quality, Knowledge Graph, Semantic Layer/Data Modeling, and Self-Service Analytics..
industries: ['Technology','Software Development','Web Design']
coverImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Key%20Concepts%20in%20Data%20Engineering%20Data%20Science%20and%20AI%20ML,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Key%20Concepts%20in%20Data%20Engineering%20Data%20Science%20and%20AI%20ML,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['DataObservability','DataEngineering','dbt','DuckDB','DataLineage','Analytics','DataLake','BusinessMetadataManagement','Vue.js','Nuxt.js','Open Source','Web Development','Low Code Platform']
---

If you work in Data Engineering, Data Science, or AI/ML, you have likely encountered terms such as DataOps, DataFabric, Data Governance, Business Metadata Management, ETL & Reverse ETL, Data Quality, Knowledge Graph, **Semantic Layer/Data Modeling**, and Self-Service Analytics.

Let us explore what semantic data modeling is and why it is generating so much hype.


## What is a Semantic Layer?

Malloy is an experimental language designed for describing data relationships and transformations. It is an analytical language that runs on SQL databases, allowing users to define a semantic data model and query it. Malloy currently supports SQL databases like BigQuery, PostgreSQL, and can query Parquet and CSV files via DuckDB.


### Introducing the Semantic Layer using Malloy

Malloy is an experimental language designed for describing data relationships and transformations. It is an analytical language that runs on SQL databases, allowing users to define a semantic data model and query it. Malloy currently supports SQL databases like BigQuery, PostgreSQL, and can query Parquet and CSV files via DuckDB.

**Lloyd Tabb, the creator of Malloy, is also the co-founder of Looker and the lead inventor of both LookML and Malloy Check out this video where Tabb discusses Malloy**

## Why is it important?

The semantic model simplifies data retrieval by using natural language style syntax, allowing for the composition of complex queries with maximum reusability. This makes it accessible to all types of data users without requiring advanced SQL knowledge. 

In an enterprise environment with multiple technology/data stacks, unifying them into a single stack is often impractical. This often leads to the creation of multiple semantic data models for each stack, resulting in duplicated efforts. Platforms like **Malloy**, **LookerML**, **Cube**, **DBT**, and **ATScale** help create a unified and technology-agnostic interface to the Semantic Model, thereby contributing to technology consolidation and abstraction. This approach avoids duplicated effort, ensures scalability, and makes the solution future-proof.

![Image Courtesy: AtScale ](/i/blog/Introducing-Semantic-Data-Modeling-with-Malloy-and-DuckDB-1.PNG)
<div class="relative flex items-center">Image Courtesy: AtScale </div>


### Demo: See Malloy in Action

I have provided an example semantic model called “**defects**” that you can explore online in VS Code via GitHub Codespaces. The example uses a synthetic software “defects” dataset in CSV format, where Malloy uses DuckDB wasm. However, you can use any Malloy-supported data sources like PostgreSQL, BigQuery, etc.

GitHub Link [https://github.com/senthilsweb/malloydata](https://github.com/senthilsweb/malloydata)

Github codespace: [https://github.dev/senthilsweb/malloydata](https://github.dev/senthilsweb/malloydata)
  
## How Malloy can be useful for Application Developers?

Developers building bespoke business applications often use SQL databases such as PostgreSQL, Oracle, MSSQL Server, SQLite, DB2, etc., to persist their data. Writing medium to complex analytical SQL queries for reporting and visualizations can be challenging. Malloy can help build these complex SQL queries involving CTEs, Joins, Pivots, Hierarchical data representations, Transpose, etc., using simple natural language style syntax. 

Developers can use Malloy through CLI, JavaScript, TypeScript, or Python, which can then be integrated into mainstream code.

### Further reading
::list{type="success"}
- <a href="https://youtu.be/zmmJgwc3oPI" class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400">Malloy - An Experimental Language for Data</a>
- <a href="https://www.youtube.com/watch?v=bUJAw28607Q" class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400">The modern data stack with semantic layer from DBT</a>
- <a href="https://www.youtube.com/watch?v=bUJAw28607Q" class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400">Where does a semantic layer fit in the Data Stack?</a>
:: 

