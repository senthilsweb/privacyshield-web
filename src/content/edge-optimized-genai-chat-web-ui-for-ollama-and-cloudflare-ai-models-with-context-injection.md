---
title: "Edge-Optimized GenAI Chat Web-UI for Ollama & Cloudflare AI models with Context Injection"
slug: edge-optimized-genai-chat-web-ui-for-ollama-and-cloudflare-ai-models-with-context-injection
date: 2025-02-03T12:00:00.000Z
published: true
description: It is a simple GenAI chat web interface built with Next.js that connects to both local Ollama and Cloudflare AI models.
industries: ['GenAI','Cloudflare','Technology','Software Development','Web Design']
coverImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Edge-Optimized%20GenAI%20Chat%20Web-UI%20for%20Ollama%20%26%20Cloudflare%20AI%20models%20with%20Context%20Injection,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Edge-Optimized%20GenAI%20Chat%20Web-UI%20for%20Ollama%20%26%20Cloudflare%20AI%20models%20with%20Context%20Injection,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['React','Next.js','Open Source','Web Development','Low Code Platform']
---


![Edge Optimized GenAI Chat Web UI](/i/blog/Edge-Optimized-GenAI-Chat-Web-UI-bg.png)

## Introduction
It is a simple GenAI chat web interface built with Next.js that connects to both local Ollama and Cloudflare AI models. This application provides an intuitive interface for interacting with various AI models through a generic chat completions API, featuring customizable settings and real-time streaming responses. The default selected model is deepseek-r1-distill-qwen-32b

![Edge Optimized GenAI Chat Assist](/i/blog/Edge-Optimized-GenAI-Chat-Web-UI-Chat-Assist.png)

## Technology Stack
- **Frontend:** Next.js 14, React 18
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **AI Integration:** AI SDK (Vercel)
- **Markdown Rendering:** react-markdown with remark-gfm
- **Icons:** Lucide React

## Features
- Dual integration with Cloudflare AI and local Ollama models
- Real-time streaming responses
- Customizable chat parameters: - Temperature, Context window size and System prompt configuration
- Markdown support in chat messages


## Advanced Streaming Implementation
The application features a sophisticated streaming system with the following improvements:

1. **Unified Parser Function** Single parser handling both Cloudflare and Ollama streaming formats, Enhanced code maintainability and reduced duplication
2. **Robust Buffer Management** Smart buffer system for partial data chunks, Prevention of "Unterminated string in JSON" errors and Complete JSON object parsing guarantee
3. **Error Handling & Stability** Comprehensive try-catch implementation for JSON parsing, Non-breaking error logging during streaming, Enhanced streaming stability
4. **Advanced Content Handling** Multi-format content extraction support Compatible with both Cloudflare and Ollama responses
5. **SSE (Server-Sent Events) Support** Proper handling of "data: " prefixed lines, Accurate stream end detection ("[DONE]" message) and Reliable event stream processing
6. **Text Processing** Integrated TextEncoder and TextDecoder usage, Consistent streaming data interpretation and Reliable character encoding handling

## Live Demo
[https://templrjs-llm-chat-webui.vercel.app/](https://templrjs-llm-chat-webui.vercel.app/)


## Open Source Contribution

I invite **open-source contributors** and volunteers to fork this project and add new features. Collaboration and fresh ideas are always welcome to make this tool even better.

The full source code is available here: [ https://github.com/senthilsweb/templrjs-llm-chat-webui]( https://github.com/senthilsweb/templrjs-llm-chat-webui).
