---
title: Using Makefiles to Bundle a Full-Stack App into a Go Binary
slug: using-makefiles-to-bundle-a-full-stack-app-into-a-go-binary
pageTitle: Using Makefiles to Bundle a Full-Stack App into a Go Binary
date: 2023-09-30T12:00:00.000Z
published: true
industries: []
description: Creating a seamless deployment process can be a challenge when building full-stack applications. This blog will walk you through packaging a web frontend and a Go backend into a single binary, making deployment easier and more efficient.
coverImage: https://plus.unsplash.com/premium_photo-1681488229881-d733064c22cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3446&q=80
ogImage: https://plus.unsplash.com/premium_photo-1681488229881-d733064c22cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3446&q=80
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags:
  - Go
  - Web Development
  - Deployment
---

## Introduction

In modern software development, it's not uncommon for projects to involve both a backend API, often written in languages like Go, and a frontend web application, typically using frameworks like Vue.js or React. While each part can be developed and tested independently, deploying them together in a seamless manner can be a challenge. In this post, we'll delve into how to package a web frontend and a Go backend into a single binary, simplifying the deployment process.

## A Brief Overview of Our TemplrJS Project

Our project, `TemplrJS`, is a rapid web application development framework. It's built using the Vue.js framework on the frontend and Go on the backend, targeting the edge computing paradigm. The entire application, including its frontend assets, is packaged inside a single binary. This binary not only serves the backend logic but also delivers the frontend assets to the browser. Moreover, we've integrated DuckDB to provide embedded database functionality.

Key Features:
- **Single Binary Deployment:** No need to manage separate servers for frontend and backend. Just deploy the binary and you're good to go!
- **Embedded Database with DuckDB:** If no database configuration is provided, `TemplrJS` defaults to an in-memory database. If a database filename is specified and exists, the system will use it; otherwise, a new file will be created.
- **Optimized Web Application:** The default web application is client-only, meaning no server-side rendering (SSR). Designed with a mobile-first approach, all pages are optimized for both mobile and web viewing.

## Packaging with Makefile

To package everything into a single binary, we use a `Makefile`. This allows us to automate the entire build process with a single command. Let's break down the steps:

```makefile
# Variables
WEB_DIR=./web
DIST_DIR=./dist
OS=$(shell uname)

# Phony targets ensure that Make doesn't look for files named like the target
.PHONY: clean generate copy build package

all: clean generate copy build package

clean:
	@echo "Deleting previous web build artifacts..."
	@rm -rf $(WEB_DIR)/dist
	@echo "Deleted..."

generate:
	@echo "Installing web dependencies..."
	@cd $(WEB_DIR) && npm i
	@echo "Dependencies installed..."
	@echo "Generating build..."
	@cd $(WEB_DIR) && npm run generate || (echo "Error generating build. Exiting..." && exit 1)
	@echo "Generated..."

copy:
	@echo "Copying to root $(DIST_DIR) for embedding..."
	@rm -rf $(DIST_DIR)
	@cp -r $(WEB_DIR)/dist $(DIST_DIR)
	@echo "Copied..."

build:
	@echo "Building Go binary for $(OS)..."
ifeq ($(OS),Linux)
	@go build -o templrjs_server-linux-aarch64 -v .
else ifeq ($(OS),Darwin)
	@go build -o templrjs_server-macos -v .
else
	@echo "Unsupported OS: $(OS). Exiting..."
	@exit 1
endif
	@echo "Binary built..."

package:
	@echo "Packaging files..."
	@ZIP_NAME="templrjs_bundle_`date +%s`.zip"; \
	zip $$ZIP_NAME templrjs_server-* templrjs.duckdb templrjs.duckdb.wal config.yml docker-compose.yml rules.yml .env.sample
	@echo "Packaged into $$ZIP_NAME..."
```

### Step 1: Setting Up the Frontend

Navigate to the web project directory:

```bash
cd ./web
```

Before generating the build, clean up any previous build artifacts:

```bash
rm -rf ./dist
```

Then, install the necessary npm packages:

```bash
npm i
```

And generate the build:

```bash
npm run generate
```

### Step 2: Embedding the Frontend with the Go Backend

Once the web frontend is built, we'll move its assets to the Go project's root directory:

```bash
cp -r ./web/dist ./dist
```

### Step 3: Building the Go Binary

With the frontend assets in place, we can now build our Go binary:

```bash
go build -o templrjs_server -v .
```

This command compiles the Go code, embedding the `dist` folder, resulting in a single binary named `templrjs_server`.

### Step 4: Packaging for Deployment

Lastly, we'll package essential files into a ZIP for easy deployment:

```bash
ZIP_NAME="templrjs_bundle_`date +%s`.zip"
zip $$ZIP_NAME templrjs_server templrjs.duckdb templrjs.duckdb.wal config.yml .env.sample
```

## Conclusion

Packaging a full-stack application into a single binary simplifies deployment, reduces potential points of failure, and streamlines the development process. With the combination of a powerful frontend framework and Go's efficiency and performance, you can create robust and easily deployable web applications.

--- 