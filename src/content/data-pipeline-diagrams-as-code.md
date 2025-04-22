---
title: "Data Pipeline Diagrams as Code"
slug: data-pipeline-diagrams-as-code
date: 2025-01-06T12:00:00.000Z
published: true
description: Creating diagrams for data pipelines, workflows, and architectures is a routine task for many of us. Whether it's for internal presentations, client discussions, or technical documentation, the process can often feel repetitive and time-consuming.
industries: ['Technology','Software Development','Web Design']
coverImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Data%20Pipeline%20Diagrams%20as%20Code,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Data%20Pipeline%20Diagrams%20as%20Code,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['React','Next.js','Open Source','Web Development','Low Code Platform']
---


![Data Pipeline Diagrams as Code](/i/blog/data-pipeline-diagrams-as-code.png)

## Introduction
Creating diagrams for data pipelines, workflows, and architectures is a routine task for many of us. Whether it's for internal presentations, client discussions, or technical documentation, the process can often feel repetitive and time-consuming.

I just launched a new open source tool/utility designed to simplify the process of creating data pipeline diagrams—a YAML-based tool that generates diagrams as code. Inspired by a linkedin post I read last week by Metaplane’s founder about [https://www.datastackdiagram.com](https://www.datastackdiagram.com) (read his post [here](https://www.linkedin.com/feed/update/urn:li:activity:7280991260042006529/) I decided to build a similar tool but with a code-first approach. 


## Problem Definition
Like many of you, I’ve relied on tools like [Draw.io](https://app.diagrams.net/), Mermaid, and Excalidraw to create diagrams. While these tools are excellent, they often require manual effort to align, format, and customize elements.

I wanted something:

- **More versatile:** A tool that can handle not just data pipelines but any DAG-style workflows.
- **Code-first:** As a developer, I find writing YAML or JSON faster and more reusable than manual dragging and dropping.
- **Future-ready:** A solution that could eventually leverage **Generative AI** to create diagrams from plain language descriptions.

## Solution

To address these requirements, I built a **YAML-driven diagramming tool** that allows users to define diagrams in code. The tool instantly renders visually appealing, reusable, and customizable diagrams.


![Data Pipeline Visualizer](/i/blog/data-pipeline-diagrams-as-code_vis.png)
Here’s what makes it different:

1. **Efficiency:** Define your diagrams as code, making them faster to create and easier to update.
2. **Flexibility:** Generate diagrams for data flow pipelines and workflows.
3. **Reusability:** Save your YAML for version control, sharing, or repeating workflows.
4. **Color Customization:** Supports TailwindCSS-based dynamic color changes.
5. **Icons from Iconify:** Choose from a vast library of icons to visually represent your nodes and edges.
6. **Dark Theme:** Modern dark theme for enhanced user experience.
7. **Export to Image:** Allows exporting diagrams as png.
8. **AI-ready:** The YAML format makes it easy to integrate natural language generation in the future.


## Deploy to Vercel

This project is set up with Vercel GitHub integration for automatic deployment. Simply push changes to your GitHub repository, and Vercel will build and deploy the application automatically.

For manual deployment or debugging, you can use the Vercel CLI:

1. Install the Vercel CLI:
2. Deploy the project manually:
3. In the Vercel Dashboard, navigate to Settings > Functions and increase the memory allocation for the serverless function to 1024 MB or higher.

## Technology Stack
![Technology Stack](/i/blog/data-pipeline-diagrams-as-code-tech-st.png)


## Demo/App URL
You can try the tool here: [https://www.senthilsweb.com/data-pipeline-visulalizer](https://www.senthilsweb.com/data-pipeline-visulalizer). It’s free to use and runs seamlessly on the edge.

Here are some of the sample diagrams created using the tool

**Example:** Event Flow Architecture [download yaml file](https://gist.github.com/senthilsweb/d2779178aede974e3a2c148722f385cb)

![Event Flow Architecture](/i/blog/data-pipeline-diagrams-as-code-flow.png)

**Example:** Data Anonymizer Process Flow [download yaml file](https://gist.github.com/senthilsweb/2de9f56fc6d309d6434543f892b59808)

![Data Anonymizer](/i/blog/data-pipeline-diagrams-as-code-data-anon.png)

**Example:** Data Integration Pipeline (Default yaml comes with the editor)

![Data Integration Pipeline](/i/blog/data-pipeline-diagrams-as-code-data-int-pipe.png)


## Todos and Future Roadmap
- **GenAI Integration:** Enable natural language prompts to generate YAML diagrams, e.g., "Create a pipeline with Kafka, Snowflake, and Power BI."
- **Callout Text Support:** Add support for text-based annotations on nodes for better context.
- **Edge Annotations:** Allow additional information or labels to be added directly on edges.
- **Enhanced Shapes:** Include more shape options like small and large circles, as well as customizable rectangles.
- **Customizable Line Types:** Provide options for line styles, such as dashed, dotted, or solid.
- **Flow Directions:** Add support for controlling diagram flow directions (e.g., left-to-right, top-to-bottom).

## Open Source Contribution

I invite **open-source contributors** and volunteers to fork this project and add new features. Collaboration and fresh ideas are always welcome to make this tool even better.

The full source code is available here: [https://github.com/senthilsweb/privacyshield-web.git.](https://github.com/senthilsweb/privacyshield-web.git).

Feel free to explore, contribute, and create something amazing! 🚀