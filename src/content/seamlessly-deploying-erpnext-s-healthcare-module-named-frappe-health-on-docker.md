---
title: "Seamlessly Deploying ERPNext's Healthcare Module named Frappe Health on Docker"
slug: "deploying-erpnext-healthcare-module-on-docker"
date: 2023-10-22T14:00:00.000Z
published: true
industries: [Technology, Development, ERP, Healthcare]
description: A walkthrough of deploying the Healthcare module of ERPNext using Docker-Compose, shedding light on some challenges and their solutions.
coverImage: https://res.cloudinary.com/nathansweb/image/upload/v1697889426/senthilsweb.com/blog/frappe-health_ruiadz.png
ogImage: https://res.cloudinary.com/nathansweb/image/upload/v1697889426/senthilsweb.com/blog/frappe-health_ruiadz.png
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags:
  - ERPNext
  - Docker
  - Healthcare
  - Open Source

---

## Introduction

ERPNext stands as a testament to the power of open-source solutions. Particularly captivating is its Healthcare module, which, interestingly, isn't immediately activated in the out-of-the-box setup. For my part, I utilized the docker-compose method for my ERPNext installation.

Navigating to the core of ERPNext's Healthcare feature, I discovered that it thrives under community management. It has its dedicated website at [Frappe Health](https://frappehealth.com/). However, a minor hiccup arose when I tried accessing the documentation through their main site – a 404 error. Such instances, while seemingly trivial, can be stumbling blocks for users. I remain hopeful that the diligent ERPNext team will address this shortly.

On my quest for a clear installation procedure for the Healthcare module, I drew a blank from the conventional online documentation. However, persistence paid off when I chanced upon the necessary details in their GitHub repository at [Frappe Health GitHub](https://github.com/frappe/health).

Transitioning to a docker-based setup presented its own set of challenges, primarily revolving around pinpointing the location of the `bench` CLI. Through a combination of deduction and experience, I discerned that it resides within the service labeled "backend".

## Noteworthy Observations

- The docker-compose file I used was curiously named "pwd.yml", and the rationale behind this naming remains elusive.
- Essential to the setup process is the restart of specific services post-installation. Surprisingly, there's no direct mention of this step or a list of the requisite services in the official documentation.

## Installation Process

1. SSH into the backend service and execute the commands:
   ```bash
   bench get-app healthcare
   bench --site demo.com install-app healthcare
   ```
   Replace `demo.com` with `frontend`, the default site name if you're using docker-compose in its standard configuration.
   
2. Restart services in the following order:

   - Backend:
     ```bash
     docker stop [your back-end-container-id]
     docker start [your back-end-container-id]
     ```
   - Database:
     ```bash
     docker stop [your db-container-id]
     docker start [your db-container-id]
     ```
   - Frontend:
     ```bash
     docker stop [your frontend-container-id]
     docker start [your frontend-container-id]
     ```

## Conclusion

ERPNext is a remarkable platform, and all accolades to the developers who have generously offered it as a wholly open-source tool. There's always room for refining and enhancing the user experience, and I believe that the community will continue to rally in support. Here's hoping my insights aid others on similar journeys, and I'm elated to make this modest contribution back to the ERPNext community.

---