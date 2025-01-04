---
title: Building a No-Code MicroORM with RESTful API for DuckDB
slug: building-a-no-code-microorm-with-restful-api-for-duckdb
date: 2023-08-27T12:00:00.000Z
published: true
industries: []
coverImage: https://res.cloudinary.com/nathansweb/image/upload/v1693595703/senthilsweb.com/blog/senthilsweb-image-card_4_thm4gh.png
ogImage: https://res.cloudinary.com/nathansweb/image/upload/v1693592651/senthilsweb.com/blog/goduck.png
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags: [Data Engineering, DuckDB, Golang]
---

Goduck, a dynamic REST API project implemented in Golang, draws inspiration from the innovative approaches of RillData and the robust reliability of MotherDuck. Goduck offers REST API capabilities for tables and models, following a Micro ORM design pattern akin to PostgREST. This documentation provides an in-depth overview of the project's unique features, technical design, and practical examples for harnessing its powerful capabilities.

<!--more-->

## Introduction

Goduck, an open-source project I've created, simplifies your interaction with DuckDB by providing a RESTful API, which can dynamically handle CRUD (Create, Read, Update, Delete) operations on your database tables. This project is available on [Github](https://github.com/senthilsweb/goduck). Taking inspiration from `Postgrest`, `RillData` and `MotherDuck`, it offers a user-friendly experience for interacting with your DuckDB database through straightforward HTTP requests.

## Technical Design Features

Goduck boasts the following key technical design features:

- **Dynamic Entity Handling:** Goduck supports interaction with multiple entities (tables) within the DuckDB database without needing manual configuration for each entity.

- **Flexible Filtering and Sorting:** Utilize query parameters to dynamically filter and sort data, enabling complex queries without explicitly writing SQL statements.

- **Pagination Support:** Control the number of returned records and their starting point using the `limit` and `offset` query parameters.

- **ActiveRecord Pattern:** Goduck encourages the use of the ActiveRecord pattern, providing a seamless way to perform database operations using struct-like objects.

## Environment Setup

Before you run Goduck and interact with your DuckDB database, follow these steps:

1. **Install DuckDB:** Install DuckDB on your system. You can download it from the official DuckDB repository.

2. **Create DuckDB Database:** Use the provided Makefile to create a DuckDB database named `data.db`. This database will store your project data.

   ```
   make create-db
   ```

3. **Create Sequence Table:** Run the following SQL query to create a sequence table that will manage IDs for different entities.

   ```
   CREATE TABLE id_sequence (entity_name TEXT PRIMARY KEY, next_id INT);
   ```

4. **Run the Application:** Once the environment is set up, run the Goduck application using `go run app.go`. The REST API will be accessible at `http://localhost:8080`.

## Example: Bugs Entity

For demonstration purposes, let's consider a table named "bugs" with the following columns:

- `id`: ID of the bug (auto-generated)
- `created_at`: Timestamp of bug creation
- `modified_at`: Timestamp of last modification
- `update_count`: Count of updates
- `title`: Title of the bug
- `description`: Description of the bug
- `status`: Current status of the bug

### Demo Data

Here's an example of synthetic data for a bug:

```json
{
    "created_at": "2023-08-29T21:03:23.545206Z",
    "description": "This is a sample bug description.",
    "id": 1,
    "modified_at": "2023-08-29T21:18:31.477748Z",
    "status": "Closed",
    "title": "Sample Bug Title",
    "update_count": 2
}
```

### Example Endpoints

1. **Create Bug:**

   ```http
   POST http://localhost:8080/bugs
   ```

   Send a JSON payload to create a new bug.

2. **Get Bugs:**

   ```http
   GET http://localhost:8080/bugs?limit=10&offset=0&select=title,description&status.eq=Open&title.like=Sample%&order=created_at.desc
   ```

   Retrieve bugs based on filters, sorting, and pagination. In this example, bugs are sorted by `created_at` in descending order.

3. **Update Bug:**

   ```http
   PUT http://localhost:8080/bugs/1
   ```

   Send a JSON payload to update a bug by ID.

4. **Delete Bug:**

   ```http
   DELETE http://localhost:8080/bugs/1
   ```

   Delete a bug by ID.

## ActiveRecord Pattern

Goduck encourages the use of the ActiveRecord pattern, where entities are represented as struct-like objects. This pattern simplifies database interactions by allowing you to create, update, and query entities in a more intuitive way. Check the Goduck codebase and examples for guidance on utilizing the ActiveRecord pattern effectively.

## Acknowledgment

This project and its documentation have been developed through a collaborative effort. The majority of the code and documentation were generated by OpenAI's ChatGPT, an AI language model. The user has played a crucial role in reviewing, guiding, and enhancing the code and documentation provided by ChatGPT. This partnership has resulted in a comprehensive and functional REST API project.

## Full Source Code

The full source code for this project is available on [Github](https://github.com/senthilsweb/goduck)

