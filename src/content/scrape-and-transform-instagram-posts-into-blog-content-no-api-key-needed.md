---
title: "Scrape and Transform Instagram Posts into Blog Content—No API Key Needed"
slug: scrape-and-transform-instagram-posts-into-blog-content-no-api-key-needed
date: 2024-09-01T12:00:00.000Z
published: true
description: A simple, serverless tool that effortlessly fetches Instagram posts, complete with images, without the need for an API key! Whether you're a content creator, marketer, or small business owner, this tool can help you seamlessly repurpose your Instagram content for your blog or website.
industries: ['Technology','Software Development','Web Design']
coverImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Scrape%20and%20Transform%20Instagram%20Posts%20into%20Blog%20Content-No%20API%20Key%20Needed,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Scrape%20and%20Transform%20Instagram%20Posts%20into%20Blog%20Content-No%20API%20Key%20Needed,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['DataObservability','DataEngineering','dbt','DuckDB','DataLineage','Analytics','DataLake','BusinessMetadataManagement','Vue.js','Nuxt.js','Open Source','Web Development','Low Code Platform']
---
![Instagram Scraper Bot built as V8 Isolate](/i/blog/Scrape_and_Transform_Instagram_Posts_into_Blog_banner.jpg)
<div class="relative flex items-center">Instagram Scraper Bot built as V8 Isolate</div>

A simple, serverless tool that effortlessly fetches Instagram posts, complete with images, without the need for an API key! Whether you're a content creator, marketer, or small business owner, this tool can help you seamlessly repurpose your Instagram content for your blog or website.

## Highlights:
::list{type="success"}
- Extracts your latest Instagram posts exposed as REST api.
- No API key or complex authentication required.
- Cross-origin issues? No problem! Convert images to base64 for easy embedding.
- Designed for edge deployment on platforms like Vercel, but can be run on-premises too!
:: 

## Tech Details:
::list{type="success"}
- Built with 100% edge deployment in mind using V8 isolates.
- Built on Next.JS Server actions
- Simple microservice architecture following the Single Responsibility Principle (SRP).
::

**Disclaimer:** Use it responsibly in compliance with Instagram’s terms and conditions.

## Source Code

Check it out on GitHub: https://github.com/senthilsweb/instagram-scraper.git


## API Endpoint

**POST /api/instagram/scrape**

Retrieves Instagram posts for a given profile and size limit.
::list{type="success"}
- **URL:** /api/instagram/scrape
- **Method:** POST
- **Content-Type:** application/json
::

### Request Payload

```javascript
{
 "profile_id": "your-instagram-profile-id",
 "first": 10
}
```