---
title: "Simplify Decision Logic with GoRules: An Embeddable Rules Engine for Python, Go, Rust, and NodeJS"
slug: simplify-decision-logic-with-gorules-an-embeddable-rules-engine-for-python-go-rust-and-nodejs
date: 2024-09-22T12:00:00.000Z
published: true
description: If you've worked with JBOSS Drools or other rule engines, you're probably all too familiar with the complexity that comes with them.
industries: ['Technology','Software Development','Web Design']
coverImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Simplify%20Decision%20Logic%20with%20GoRules,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Simplify%20Decision%20Logic%20with%20GoRules,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['DataObservability','DataEngineering','dbt','DuckDB','DataLineage','Analytics','DataLake','BusinessMetadataManagement','Vue.js','Nuxt.js','Open Source','Web Development','Low Code Platform']
---

![GoRules](/i/blog/simplify_decision_logic_with_go_rules_banner.png)

## Use Case

If you've worked with JBOSS Drools or other rule engines, you're probably all too familiar with the complexity that comes with them. Managing decision-making logic often turns into a chore, with intricate configurations and steep learning curves.

That's why I'm excited to introduce <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://gorules.io/">GoRules Zen BRE</a>—an open-source Business Rules Engine (BRE) built in **Rust**, designed to support **Python, Go, Rust, and NodeJS**. Unlike other engines like <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://www.drools.org/">JBOSS Drools</a>, <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://github.com/cachecontrol/json-rules-engine">JSON Rules Engine</a>, or <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://github.com/hyperjumptech/grule-rule-engine">Grule</a>, GoRules stands out for its **simplicity** and **multi-language support**, making it accessible to both developers and non-developers alike.

![GoRulesTable](/i/blog/simplify_decision_logic_with_go_rules_1.png)

## Why GoRules?

::list{type="success"}
- **Multi-language Embeddability:** Whether you're working in **Python, Rust, Go, or NodeJS**, you can seamlessly integrate GoRules into your projects with minimal effort.
- **Rich Rules Editor:** GoRules features an intuitive, **graph-based decision table editor**, allowing you to visualize and modify rules effortlessly. This is a significant improvement compared to the text-based editors commonly found in other engines.
- **Performance:** GoRules is optimized for speed, built in **Rust**, making it a perfect solution for large-scale applications that demand high performance.
- **Ease of Use:** With a much lower learning curve than other engines, GoRules is ideal for both beginners and experienced developers, making rule management more accessible than ever.
::

For more details, visit <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://gorules.io/">GoRules</a> and explore the **Zen Business Rules** engine on <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://github.com/gorules/zen">GitHub</a>.

I've also included a **fully working example** in a Python/Google Colab notebook. You can try it out here: <a class="dark:text-teal-400 relative transition hover:text-teal-500 dark:hover:text-teal-400" href="https://colab.research.google.com/drive/115S-TkYrkcbBt7UazTTK1MIlOTy33JJS?usp=sharing">Google Colab Demo</a>. or use the below code in your favorite python editor.

```javascript
!pip install zen-engine
```

### gorules-example-ecommerce.ipynb

```javascript
# Import the necessary modules
import re
import json
import zen  # 'zen' is the GoRules Zen engine module for processing rules

# Load the JDM (JSON Decision Model) file
# This file contains the rules or decision logic in JSON format.
# Replace the file path with the correct one for your environment.
jdm_filename = './ecommenrce-shipping-fees.json'

# Open the JDM file in 'read' mode and load the content
with open(jdm_filename, 'r') as file:
    jdm_content = file.read()

# Create a ZenEngine instance
# ZenEngine is the core engine responsible for processing your decision model.
engine = zen.ZenEngine()

# Load the decision model into the engine
decision = engine.create_decision(jdm_content)

# Define the input payload that will be processed by the decision model
# In this example, the input consists of a cart total and customer information.
input_payload = {
    "cart": {
        "total": 1200
    },
    "customer": {
        "country": "US",
        "tier": "gold"
    }
}

# Evaluate the decision model using the provided input payload

result = decision.evaluate(input_payload)

# Output the result of the evaluation
print(result)
```

The decision table JSON file used in my example https://gist.github.com/senthilsweb/ec607fd16af439e76666fc77c5ecc794

## Why BREs Matter

A **Business Rules Engine (BRE)** simplifies complex decision-making logic, which would otherwise be handled through countless if-else statements. BREs provide scalability by allowing rules to be added, modified, or removed without impacting the underlying application code. This makes them invaluable for maintaining clean, scalable, and maintainable codebases as business logic evolves over time.