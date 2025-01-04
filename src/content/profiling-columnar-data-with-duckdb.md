---
title: Profiling Columnar Data with DuckDB
slug: profiling-columnar-data-with-duckdb
date: 2023-12-07T12:00:00.000Z
published: true
description: Leveraging DuckDB for efficient data profiling offers a novel approach to understanding statistics and distributions within columnar files. This documentation outlines the simplicity with which DuckDB can be utilized to gather insightful statistics from your data without the overhead of complex data pipelines or heavyweight ETL processes.
industries: [Data Engineering, Big Data, Analytics]
coverImage: https://res.cloudinary.com/nathansweb/image/upload/v1702079385/senthilsweb.com/blog/duckdb/duckdb_as_profiler_01.png
ogImage: https://res.cloudinary.com/nathansweb/image/upload/v1702079385/senthilsweb.com/blog/duckdb/duckdb_as_profiler_01.png
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags: [Data Profiling, DuckDB, CSV]
---

## Introduction

DuckDB, an in-process SQL OLAP database management system, has risen as a potent tool for data analysts and engineers for profiling and analyzing large datasets. This guide walks you through the process of using DuckDB to profile columnar data files and extract meaningful statistics and distributions.

## Profiling Columnar Data with DuckDB

DuckDB simplifies data profiling by providing SQL-based tools that can directly work with CSV files. Here's how you can quickly profile your columnar data using DuckDB:

1. **Create a Table from a CSV File**:
   Start by creating a table in DuckDB that directly reads from your CSV file using the `read_csv_auto` function. This function automatically infers the schema from the CSV file:

   ```sql
   CREATE TABLE your_table_name AS SELECT * FROM read_csv_auto('path/to/your/data.csv');
   ```

   Replace `your_table_name` with the desired name for your table and `path/to/your/data.csv` with the path to your CSV file.

2. **Run the SUMMARIZE Command**:
   Once your table is created, use the `SUMMARIZE` command to generate a statistical profile of the columns in your table:

   ```sql
   SUMMARIZE your_table_name;
   ```

   This command provides a comprehensive summary that includes statistics like count, mean, median, unique values, quartiles, and histograms for distribution analysis.

    CREATE TABLE patients AS SELECT * FROM read_csv_auto('/Users/skaruppaiah1/demo-data/synthea/patients.csv');

## Understanding the Output

The output from the `SUMMARIZE` command includes various statistical measures that can help you understand the characteristics of your data. You'll receive information on data distribution, potential outliers, and other critical metrics that are essential for data quality assessment and further analytical processes.

To test the DuckDB data profiling commands with a sample dataset, download the `patients.csv` file using the link below:

[Download patients.csv](https://res.cloudinary.com/nathansweb/raw/upload/v1702079444/senthilsweb.com/blog/duckdb/patients.csv)

Output of `SUMMARIZE` from `patients`

![background](https://res.cloudinary.com/nathansweb/image/upload/v1702080066/senthilsweb.com/blog/duckdb/duckdb_summarize.png)


## Exploring Alternative Data Profiling Utilities

For those seeking diverse options in data profiling tools, the landscape offers several notable alternatives:

- **csvstat**: Part of the csvkit suite, csvstat is a command-line utility that provides quick statistical summaries of CSV files. Learn more about csvstat and how to use it on its [GitHub repository page](https://github.com/wireservice/csvkit).

- **YData Profiler**: Formerly known as Python Profiler, YData Profiler delivers profiling for datasets, enabling exploratory data analysis with minimal effort. You can find more information about YData Profiler on its [official documentation site](https://docs.ydata.ai/ydata-profiler/introduction).

- **DataHub**: An extensible metadata platform for the modern data stack, DataHub is adept at profiling and understanding datasets. Discover the capabilities of DataHub by visiting the [DataHub project on GitHub](https://github.com/linkedin/datahub).

- **Pandas DataFrame Profiling**: Within the Pandas library, the DataFrame `.describe()` method offers a convenient way to get a quick description of the data, including central tendency, dispersion, and shape of the dataset’s distribution. Check out the Pandas documentation on [DataFrame.describe()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.describe.html) for more details.

These tools provide a range of functionalities to suit various data profiling needs, from simple CSV summaries to comprehensive exploratory analysis.

## Conclusion


DuckDB's ability to handle data profiling tasks with such ease and efficiency makes it a valuable addition to any data engineer's toolkit. Whether you're working with big data or small, the precision and speed of DuckDB's profiling capabilities allow you to quickly gain insights and make informed decisions based on your data.


---
