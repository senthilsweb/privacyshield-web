# Data Pipeline Diagram

A modern web application for visualizing data pipeline architectures using YAML definitions. Create beautiful, interactive flow diagrams for your data pipelines with ease.

## Introduction

Data Pipeline Diagram is a React-based tool that allows users to define their data pipeline architecture in YAML format and visualize it as an interactive flow diagram. Perfect for documentation, presentations, and understanding complex data flows.

## Use Cases

- Visualize ETL/ELT processes
- Document data warehouse architectures
- Map out data lake ingestion patterns
- Illustrate data transformation workflows
- Create system architecture diagrams
- Design microservices data flows

## Technology Stack

- **Frontend Framework**: Next.js 14
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Flow Diagram**: React Flow
- **Icons**: Iconify
- **YAML Processing**: yaml
- **Image Export**: html-to-image

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/data-pipeline-diagram.git
```

2. Install dependencies:

```shellscript
cd data-pipeline-diagram
npm install
```


3. Run the development server:

```shellscript
npm run dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser


## Source Code Structure

```plaintext
data-pipeline-diagram/
├── app/
│   ├── components/
│   │   ├── Editor.tsx
│   │   ├── PipelineDiagram.tsx
│   │   └── Toolbar.tsx
│   └── page.tsx
├── components/
│   └── ui/
└── public/
```

## Demo

Try out the live demo: [Data Pipeline Diagram Demo](your-demo-url)

## Example YAML

### Example 1

Here's an example YAML definition that creates a data pipeline visualization:

```yaml
title: Data Flow Architecture
description: ETL pipeline from source databases to analytics
nodes:
  - id: pg01
    name: PostgreSQL
    description: OLTP app DB
    icon: logos:postgresql
    color: bg-blue-500
    show_annotation: false
  - id: sql01
    name: SQL Server
    description: Legacy data source
    icon: simple-icons:microsoftsqlserver
    color: bg-red-500
    show_annotation: false
  - id: s3l01
    name: S3 Landing
    description: Landing zone in Data lake with raw data
    icon: logos:aws-s3
    color: bg-orange-500
    show_annotation: false
  - id: s3c01
    name: S3 Curated
    description: Cleansed and active data
    icon: logos:aws-s3
    color: bg-green-500
    show_annotation: false
  - id: adb01
    name: Analytics DB
    description: Data warehouse for PowerBI and Table reports
    icon: carbon:analytics
    color: bg-purple-500
    show_annotation: false
edges:
  - source: pg01
    target: s3l01
    animated: true
  - source: sql01
    target: s3l01
    animated: true
  - source: s3l01
    target: s3c01
    animated: false
  - source: s3c01
    target: adb01
    animated: false
```

This YAML will generate a diagram showing data flow from PostgreSQL and SQL Server databases through S3 stages to an Analytics database.


### Example 2

```yaml
title: Customer 360 Data Flow
description: ETL pipeline for building a 360-degree customer view
nodes:
  - id: crm01
    name: CRM System
    description: Source of customer interactions
    icon: logos:salesforce
    color: bg-blue-400
    show_annotation: false
  - id: ecom01
    name: E-commerce DB
    description: Online transactions and orders database
    icon: logos:mysql
    color: bg-teal-400
    show_annotation: false
  - id: s3l02
    name: S3 Landing
    description: Landing zone for raw data
    icon: logos:aws-s3
    color: bg-orange-500
    show_annotation: false
  - id: s3c02
    name: S3 Curated
    description: Processed and normalized data
    icon: logos:aws-s3
    color: bg-green-500
    show_annotation: false
  - id: datalake01
    name: Data Lake
    description: Consolidated customer data for machine learning
    icon: carbon:data-lake
    color: bg-gray-500
    show_annotation: false
  - id: dashboard01
    name: Customer Dashboard
    description: Real-time insights and analytics
    icon: mdi:monitor-dashboard
    color: bg-purple-500
    show_annotation: false
edges:
  - source: crm01
    target: s3l02
    animated: true
  - source: ecom01
    target: s3l02
    animated: true
  - source: s3l02
    target: s3c02
    animated: false
  - source: s3c02
    target: datalake01
    animated: true
  - source: datalake01
    target: dashboard01
    animated: false

```

### Example 3

```yaml
title: Notification Workflow Pipeline
description: ETL pipeline for processing and routing notifications through EventBridge and AWS Lambda
nodes:
  - id: pg01
    name: PostgreSQL
    description: OLTP app DB
    icon: logos:postgresql
    color: bg-blue-500
    show_annotation: false
  - id: eventbridge01
    name: EventBridge
    description: AWS EventBridge for event orchestration
    icon: logos:aws-eventbridge
    color: bg-pink-500
    show_annotation: false
  - id: lambda_slack
    name: Lambda - Slack
    description: AWS Lambda function for Slack notifications
    icon: logos:aws-lambda
    color: bg-orange-500
    show_annotation: false
  - id: slack01
    name: Slack
    description: Slack messaging platform
    icon: logos:slack
    color: bg-teal-500
    show_annotation: false
  - id: lambda_teams
    name: Lambda - Teams
    description: AWS Lambda function for Microsoft Teams notifications
    icon: logos:aws-lambda
    color: bg-green-500
    show_annotation: false
  - id: teams01
    name: Microsoft Teams
    description: Teams collaboration platform
    icon: logos:microsoft-teams
    color: bg-blue-700
    show_annotation: false
  - id: lambda_jira
    name: Lambda - Jira
    description: AWS Lambda function for Jira ticket creation
    icon: logos:aws-lambda
    color: bg-blue-500
    show_annotation: false
  - id: jira01
    name: Jira
    description: Jira task management tool
    icon: logos:jira
    color: bg-blue-600
    show_annotation: false
  - id: lambda_email
    name: Lambda - Email
    description: AWS Lambda function for email notifications
    icon: logos:aws-lambda
    color: bg-gray-400
    show_annotation: false
  - id: email01
    name: Email
    description: Email notification service
    icon: mdi:email
    color: bg-gray-300
    show_annotation: false
edges:
  - source: pg01
    target: eventbridge01
    animated: true
  - source: eventbridge01
    target: lambda_slack
    animated: true
  - source: lambda_slack
    target: slack01
    animated: false
  - source: eventbridge01
    target: lambda_teams
    animated: true
  - source: lambda_teams
    target: teams01
    animated: false
  - source: eventbridge01
    target: lambda_jira
    animated: true
  - source: lambda_jira
    target: jira01
    animated: false
  - source: eventbridge01
    target: lambda_email
    animated: true
  - source: lambda_email
    target: email01
    animated: false
```

## Features

- 📝 YAML-based configuration
- 🎨 Customizable node colors and icons
- 🔄 Animated flow indicators
- 📸 Export diagrams as images
- 🎯 Interactive node positioning
- 🛠 Built-in YAML validation and formatting


## Available Icons

You can use any icon from the following icon sets:

- Material Design Icons (`mdi:icon-name`)
- Phosphor Icons (`ph:icon-name`)
- Simple Icons for brands (`simple-icons:name`)
- Logos for tech stack (`logos:name`)
- And many more from [Iconify](https://icon-sets.iconify.design/)


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
