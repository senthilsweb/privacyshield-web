---
title: "Building and Running AMD64 Docker Containers on Apple M1"
slug: building-and-running-amd64-docker-containers-on-apple-m1
pageTitle: "Overcoming Architecture Challenges: AMD64 on Apple M1"
date: 2023-10-21T12:00:00.000Z
published: true
industries: [Technology, Development, Docker]
description: Navigating through the challenge of running AMD64 Docker images on the ARM-based Apple M1 chip, and finding a solution that ensures seamless development across different architectures.
coverImage: https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
ogImage: https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags:
  - Docker
  - Apple M1
  - Development
---

## Introduction

The introduction of Apple's M1 chip, operating on the ARM64 architecture, presented developers with unique challenges. The primary obstacle was the compatibility between standard Docker images (built for x86_64 or AMD64 architecture) and the ARM-based M1 chip. Here, we dive into my personal journey of containerizing a Go application and ensuring it runs smoothly on an Apple M1 MacBook Pro.


## Problem Statement

Building and running Docker containers for applications is a daily task for many developers. Yet, architectural differences can throw a wrench in these processes. My challenge was to run a Go application in a Docker container, primarily built for the AMD64 architecture, on an Apple M1 chip. Adding to the complexity, the application relied on a configuration file residing in the same directory as the binary.



## The Journey to a Solution

### 1. Initial Hiccups

My initial attempt to use the `ubuntu:latest` image yielded compatibility error messages like:

```
qemu-x86_64: Could not open '/lib64/ld-linux-x86-64.so.2': No such file or directory
```

### 2. Cross-Platform Docker Builds

I leveraged Docker's `--platform` flag, setting it to `linux/amd64`, to build images compatible with the QEMU emulator on Docker Desktop for Mac on M1 machines.

### 3. Viper & Configuration

Using the Viper library in Go, I ensured seamless configuration management. Setting the Dockerfile's working directory and using relative paths allowed Viper to identify and utilize the configuration file effectively.

### 4. Docker-Compose for Ease of Use

Docker Compose simplified building, running, and managing the application within a Docker container. Through a `docker-compose.yml` file, I was able to establish a consistent execution environment for the application.

### Source Codes

#### Dockerfile

```dockerfile
# Use a valid Go version
FROM golang:1.17 AS builder

# Install dependencies if any
RUN apt-get update && apt-get install -y gcc

# Set your working directory inside the container
WORKDIR /go/src/github.com/org/repo

# Copy your code into the container
COPY . .

# List the contents (for debugging)
RUN ls -al

# Build the Go application
# If you're building for a different architecture, you'd set GOARCH accordingly.
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -o templrgo .

# The command to run when the container starts
CMD ["/go/src/github.com/org/repo/templrgo", "-p", "8182"]
```

#### Github action for cross-platform builds

```yaml
name: Build and Push Docker Image

on:
  push:
    branches:
      - main # or whichever branch you'd like

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Go
      uses: actions/setup-go@v2
      with:
        go-version: 1.17 # specify the desired version

    - name: Compile Go for linux/amd64
      run: |
        GOOS=linux GOARCH=amd64 go build -o templrjs_server-linux-amd64

    - name: Set up Docker Buildx
      id: buildx
      uses: docker/setup-buildx-action@v1

    - name: Login to DockerHub
      uses: docker/login-action@v1 
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}

    - name: Build and push
      id: docker_build
      uses: docker/build-push-action@v2
      with:
        context: .
        file: ./Dockerfile
        platforms: linux/amd64
        push: true
        tags: |
          ${{ secrets.DOCKERHUB_USERNAME }}/templrjs:latest
          ${{ secrets.DOCKERHUB_USERNAME }}/templrjs:${{ github.sha }}
          ${{ secrets.DOCKERHUB_USERNAME }}/templrjs:build-${{ github.run_id }}
```

#### Docker compose file

```yaml
version: '3'

services:
  templrjs_server:
    build:
      context: .
      dockerfile: Dockerfile
    image: templrjs
    ports:
      - "5000:8080"
    volumes:
      - ./:/app/
```