---
title: "Lightweight HTML to PDF with Puppeteer: Simple PDF Export for Edge Deployments"
slug: lightweight-html-to-pdf-with-puppeteer-simple-pdf-export-for-edge-deployments
date: 2024-12-27T12:00:00.000Z
published: true
description: This microservice is designed to address simple PDF export needs, making it ideal for generating blog articles, profile cards, and other lightweight use cases.
industries: ['Technology','Software Development','Web Design']
coverImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Lightweight%20HTML%20to%20PDF%20with%20puppeteer:%20Simple%20PDF%20Export%20for%20Edge%20Deployments,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Lightweight%20HTML%20to%20PDF%20with%20puppeteer:%20Simple%20PDF%20Export%20for%20Edge%20Deployments,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['Vue.js','Nuxt.js','Open Source','Web Development','Low Code Platform']
---


![htmlpdf](/i/blog/lightweight-html-to-pdf.png)

This microservice is designed to address simple PDF export needs, making it ideal for generating blog articles, profile cards, and other lightweight use cases. It prioritizes efficiency and edge platform compatibility, avoiding the overhead of heavy PDF reporting tools. While it's a valuable addition to my open-source  [TemplrJS Nuxt Fullstack Framework](https://github.com/senthilsweb/templrjs.git), it is equally useful for standalone applications.

## Motivation

::list{type="success"}
- **Edge-Optimized:** Runs seamlessly on serverless platforms like Vercel.
- **Lightweight Design:** Ideal for straightforward requirements like exporting blog articles or profile cards.
- **Cost-Effective:** Tailored for small-scale use cases without relying on resource-heavy reporting tools.
- **Integration-Ready:** Easily integrates with [TemplrJS](https://github.com/senthilsweb/templrjs.git) and other frameworks for rapid deployment.
::

## Getting Started
Setup

Clone the repository and navigate to the project directory:

```cmd
git clone https://github.com/senthilsweb/web2pdf.git
cd web-to-pdf
```

Install dependencies for production:
```cmd
npm install puppeteer-core @sparticuz/chromium
```

## Local Development
For local testing, install the full Puppeteer package to use its bundled Chromium binary:
```cmd
npm install puppeteer
npm run dev
```
Ensure the code dynamically switches between puppeteer (for local testing) and puppeteer-core with @sparticuz/chromium (for production).


## Deploy to Vercel

This project is set up with Vercel GitHub integration for automatic deployment. Simply push changes to your GitHub repository, and Vercel will build and deploy the application automatically.

For manual deployment or debugging, you can use the Vercel CLI:

1. Install the Vercel CLI:
2. Deploy the project manually:
3. In the Vercel Dashboard, navigate to Settings > Functions and increase the memory allocation for the serverless function to 1024 MB or higher.

## API Endpoints
Generate PDF

**Route:** /api/pdf

![htmlpdf](/i/blog/Lightweight_1.png)


## Examples
Try the API with the following example:

### Example: 1

```cmd
https://export2pdf.vercel.app/api/pdf?url=https://www.senthilsweb.com/cms/senthilnathan-karuppaiah?print=true&pageNumbers=true
```

### Example: 2
```cmd 
https://export2pdf.vercel.app/api/pdf?url=https://www.senthilsweb.com/blog/using-makefiles-to-bundle-a-full-stack-app-into-a-go-binary?print=true&pageNumbers=true
```
#### Note: If you encounter a function timeout error, simply refresh the page or retry the API call.


## Features

::list{type="success"}
- **Edge-Optimized:** Runs seamlessly on serverless platforms like Vercel.
- **Dynamic Customization:** Add headers, footers, and page numbers on the fly.
- **Edge-Compatible:** Optimized for serverless environments like Vercel.
- **Lightweight Performance:** Minimal resource usage for cost-effective deployments.
::

## Limitations
::list{type="success"}
- **Memory Requirements:** Puppeteer can be resource-intensive; allocate sufficient memory for larger PDFs.
- **Cold Starts:** Slight delays may occur for infrequently used endpoints.
::

## Acknowledgment
This implementation leverages insights from the article ["Use Puppeteer on AWS Lambdas"](https://www.thebiltheory.com/blog/use-puppeteer-on-aws-lambdas) by **The Bilt Theory**, which provides excellent guidance on optimizing Puppeteer for serverless environments. Many thanks to the author for the detailed explanations and strategies!