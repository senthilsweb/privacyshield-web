---

title: "Smoothing ERPNext Deployment on Apple's M1 via Docker-Compose"
slug: smoothing-erpnext-deployment-on-apple-s-m1-via-docker-compose
pageTitle: "Tackling Docker-Compose Challenges with ERPNext on Apple M1"
date: 2023-10-22T08:30:00.000Z
published: true
industries: [Technology, Development, Docker, ERP]
description: Addressing the overlooked detail in ERPNext's Docker setup for the Apple M1 architecture and providing a simple solution.
coverImage: https://res.cloudinary.com/nathansweb/image/upload/v1697886847/senthilsweb.com/blog/docker-applem1_nawx2w.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/v1697886847/senthilsweb.com/blog/docker-applem1_nawx2w.webp
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags:
  - Docker
  - Apple M1
  - ERPNext
  - Docker-Compose

---

## Introduction

The ARM-based Apple M1 chip has revolutionized Mac's performance capabilities. Yet, when diving into Docker-based setups, particularly with applications like ERPNext, I encountered a compatibility hiccup. This post unveils that journey and the quick fix I discovered.

## Problem Statement

The goal was simple: Install ERPNext using Docker-Compose on my Apple M1 Macbook Pro. However, this seemingly straightforward task became challenging due to the absence of specific instructions in the ERPNext documentation about M1 compatibility.

## Discovering the Solution

### 1. Uncovering the Compatibility Issue

During the initial ERPNext installation, I faced issues arising from the architectural differences between the M1 and traditional x86_64 systems.

### 2. The Quick Fix

Identifying the root of the problem, I realized the solution was quite simple. By adding `platform: linux/amd64` to every service in the `docker-compose.yml` file, the compatibility issues were resolved. This tweak ensured the containers would be spun up using the desired architecture, making the software run as intended.

### Updated docker-compose.yml

```yaml 
version: "3"

services:
  backend:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: on-failure
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs

  configurator:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: none
    entrypoint:
      - bash
      - -c
    command:
      - >
        ls -1 apps > sites/apps.txt;
        bench set-config -g db_host $$DB_HOST;
        bench set-config -gp db_port $$DB_PORT;
        bench set-config -g redis_cache "redis://$$REDIS_CACHE";
        bench set-config -g redis_queue "redis://$$REDIS_QUEUE";
        bench set-config -g redis_socketio "redis://$$REDIS_SOCKETIO";
        bench set-config -gp socketio_port $$SOCKETIO_PORT;
    environment:
      DB_HOST: db
      DB_PORT: "3306"
      REDIS_CACHE: redis-cache:6379
      REDIS_QUEUE: redis-queue:6379
      REDIS_SOCKETIO: redis-socketio:6379
      SOCKETIO_PORT: "9000"
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs

  create-site:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: none
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs
    entrypoint:
      - bash
      - -c
    command:
      - >
        wait-for-it -t 120 db:3306;
        wait-for-it -t 120 redis-cache:6379;
        wait-for-it -t 120 redis-queue:6379;
        wait-for-it -t 120 redis-socketio:6379;
        export start=`date +%s`;
        until [[ -n `grep -hs ^ sites/common_site_config.json | jq -r ".db_host // empty"` ]] && \
          [[ -n `grep -hs ^ sites/common_site_config.json | jq -r ".redis_cache // empty"` ]] && \
          [[ -n `grep -hs ^ sites/common_site_config.json | jq -r ".redis_queue // empty"` ]];
        do
          echo "Waiting for sites/common_site_config.json to be created";
          sleep 5;
          if (( `date +%s`-start > 120 )); then
            echo "could not find sites/common_site_config.json with required keys";
            exit 1
          fi
        done;
        echo "sites/common_site_config.json found";
        bench new-site frontend --no-mariadb-socket --admin-password=admin --db-root-password=admin --install-app erpnext --set-default;

  db:
    image: mariadb:10.6
    healthcheck:
      test: mysqladmin ping -h localhost --password=admin
      interval: 1s
      retries: 15
    deploy:
      restart_policy:
        condition: on-failure
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
      - --skip-character-set-client-handshake
      - --skip-innodb-read-only-compressed # Temporary fix for MariaDB 10.6
    environment:
      MYSQL_ROOT_PASSWORD: admin
    ports:
      - "3306:3306"
    volumes:
      - db-data:/var/lib/mysql

  frontend:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: on-failure
    command:
      - nginx-entrypoint.sh
    environment:
      BACKEND: backend:8000
      FRAPPE_SITE_NAME_HEADER: frontend
      SOCKETIO: websocket:9000
      UPSTREAM_REAL_IP_ADDRESS: 127.0.0.1
      UPSTREAM_REAL_IP_HEADER: X-Forwarded-For
      UPSTREAM_REAL_IP_RECURSIVE: "off"
      PROXY_READ_TIMEOUT: 120
      CLIENT_MAX_BODY_SIZE: 50m
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs
    ports:
      - "8080:8080"

  queue-default:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: on-failure
    command:
      - bench
      - worker
      - --queue
      - default
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs

  queue-long:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: on-failure
    command:
      - bench
      - worker
      - --queue
      - long
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs

  queue-short:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: on-failure
    command:
      - bench
      - worker
      - --queue
      - short
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs

  redis-queue:
    image: redis:6.2-alpine
    deploy:
      restart_policy:
        condition: on-failure
    volumes:
      - redis-queue-data:/data

  redis-cache:
    image: redis:6.2-alpine
    deploy:
      restart_policy:
        condition: on-failure
    volumes:
      - redis-cache-data:/data

  redis-socketio:
    image: redis:6.2-alpine
    deploy:
      restart_policy:
        condition: on-failure
    volumes:
      - redis-socketio-data:/data

  scheduler:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: on-failure
    command:
      - bench
      - schedule
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs

  websocket:
    image: frappe/erpnext:v14.44.0
    platform: linux/amd64
    deploy:
      restart_policy:
        condition: on-failure
    command:
      - node
      - /home/frappe/frappe-bench/apps/frappe/socketio.js
    volumes:
      - sites:/home/frappe/frappe-bench/sites
      - logs:/home/frappe/frappe-bench/logs

volumes:
  db-data:
  redis-queue-data:
  redis-cache-data:
  redis-socketio-data:
  sites:
  logs:
```
