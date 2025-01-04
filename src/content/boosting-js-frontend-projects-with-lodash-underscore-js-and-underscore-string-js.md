---
title: Boosting JS Frontend Projects with Lodash, Underscore.js, and Underscore.string.js  
slug: boosting-js-frontend-projects-with-lodash-underscore-js-and-underscore-string-js
pageTitle: Boosting JS Frontend Projects with Lodash, Underscore.js, and Underscore.string.js  
date: 2023-09-25T12:00:00.000Z  
published: true  
industries: []  
description: In TemplrJS projects, leveraging utility libraries like Lodash, Underscore.js, and Underscore.string.js can make your code more efficient, readable, and maintainable. This guide demonstrates the power of these libraries with real-world examples.  
coverImage: https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80
ogImage: https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80
author: Senthilnathan Karuppaiah  
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg  
type: Blog  
tags:  
  - TemplrJS
  - Lodash
  - Underscore.js
  - Utility Libraries
---

## Introduction

In any development process, utility functions for manipulating arrays, objects, and strings often become necessary. Writing these functions from scratch can be not only time-consuming but also prone to errors. TemplrJS, an open-source project, significantly benefits from utility libraries like Lodash, Underscore.js, and Underscore.string.js for such tasks. In this guide, we will delve into real-world examples that demonstrate the power of these utility libraries.

## Prerequisites

- Basic understanding of JavaScript.
- Familiarity with TemplrJS.
- Node.js and npm installed on your system.

## Sorting Articles by Date with Lodash

Consider you have an array of articles that you need to sort by date in descending order. Here’s how you can accomplish that with Lodash.

```javascript
// Using Lodash to sort articles by date
filteredArticles.value = _.orderBy(filteredArticles.value, (article) => new Date(_.get(article, 'data.date')), 'desc');
```

The `_.orderBy` function sorts the articles array. Inside it, the `_.get` function fetches the date from the nested 'data.date' property. Finally, the date is converted to a JavaScript `Date` object for accurate sorting.

## Creating URL-friendly Slugs with Underscore.string.js and Nuxt.js

For those working with Nuxt.js, converting a title into a URL-friendly slug becomes a piece of cake with Underscore.string.js.

```javascript
// Creating a slug in a Nuxt.js project
${useNuxtApp().$s.slugify(title)}
```

Here, `useNuxtApp().$s.slugify(title)` slugifies the `title`, making it URL-friendly. This is particularly helpful for generating dynamic URLs based on textual data like article titles.

## Filtering and Sorting Menu Items with Lodash

Using Lodash, you can easily filter and sort menu items based on various conditions.

```javascript
// Filtering and sorting menu items
_.filter(useSortBy(menu.children, ['sort_order']), (o) => o.is_active == true)
```

In this snippet, `useSortBy(menu.children, ['sort_order'])` sorts the menu items by the 'sort_order' property. The `_.filter` function then filters these sorted items to only include those that are active (`is_active == true`).

## Limiting Article Display with Lodash

When you need to limit the number of articles displayed on a page, Lodash’s `_.take` function can be incredibly helpful.

```javascript
// Limiting the number of articles displayed
_.take(filteredArticles.value, 6);
```

The `_.take` function here creates a new array containing only the first 6 items from `filteredArticles.value`.

## Conclusion

By incorporating Lodash, Underscore.js, and Underscore.string.js into your TemplrJS projects, you gain access to a wide range of utility functions that can make your development process more efficient, readable, and error-free. Feel free to dive into these libraries and explore their vast functionalities to enhance your TemplrJS experience.

---