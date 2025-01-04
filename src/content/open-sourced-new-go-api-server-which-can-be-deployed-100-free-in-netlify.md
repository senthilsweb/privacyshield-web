---
title: Open sourced new Go API Server which can be deployed 100% free in Netlify
slug: open-sourced-new-go-api-server-which-can-be-deployed-100-free-in-netlify
date: 2021-10-31T12:00:00.000Z
published: true
industries: []
rightStripColor: 'bg-gray-50'
coverImage: https://res.cloudinary.com/nathansweb/image/upload/v1635729312/senthilsweb.com/blog/9_e1zan5.svg
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
ogimage: https://res.cloudinary.com/nathansweb/image/upload/v1635729312/senthilsweb.com/blog/9_e1zan5.svg
type: Blog
tags:
  - Blog
  - CI/CD
  - Golang
  - api
  - Server
  - Cloud
  - Netlify
  - Maizzle
---

I started [notifier](https://github.com/senthilsweb/notifier) golang api project as multipurpose notification library to send mail, text, slack, push, telegram etc. but it is expanding as enterprise grade frictionless api server with low memory footprint. It is designed in such a manner that, it can be hosted as aws lambda function or any cloud provider or on-prem in bare metal. As of this writing, the size of the golang binary is just ~20 MB. 

<!--more-->

This is very well suited to host it in Netlify 100% free and yes, [Netlify](https://www.netlift.com) won't ask for your credit card details for registration. 

### Design Goals

<list :items="design-goals"></list>


### Pre-requisites

* Should have Go installed in your local development environment
* Optional [netlify](https://app.netlify.com/) account to deploy this golang api as serverless functions
* Optional [netlify](https://app.netlify.com/) CLI
* Optional if you want to send HTML formatted email using mailgun template. I used [Maizzle](https://maizzle.com/) to build HTML emails with
[Tailwind CSS](https://tailwindcss.com/)
https://maizzle.com/
* [mailgun](https://app.mailgun.com/) account as the `notify` (sendmail) api is built using `mailgun`
* VSCode Editor or [Gitpod](https://gitpod.io/) online VSCode editor 50 hours per month free plan

### Local Development

> Clone repository.

<code-group>
<code-block label="Bash" active>

  ```bash
  git clone https://github.com/senthilsweb/notifier.git
  ```
</code-block>
</code-group>

> Local build (Mac OS)

<code-group>
<code-block label="Bash" active>

```bash
go build
```
</code-block>
</code-group>



> Local Run

<code-group>
<code-block label="Bash" active>

```bash
./notifier -p "3000"
```
</code-block>
</code-group>



###  REST Endpoints

The following APIs implemented and readily available to use in your projects. For quick testing, you can try from the hosted version of mine in netlify. Please change the end-point relative url to yours. 

`https://zybes.netlify.app/api`

Request |       Endpoints                                                |       Functionality
--------|----------------------------------------------------------------|--------------------------------
POST    |  https://zybes.netlify.app/api/notify/mailgun                  |   Send email  
GET     |  https://zybes.netlify.app/api/ping                            |   Health check


Payload for `https://zybes.netlify.app/api/notify/mailgun`

<code-group>
<code-block label="Json" active>

```Json
{
    "message": {
        "subject": "This is subject",
        "body": "This is body",
        "template": "welcome_email",
        "recipient": "name <your email@gmail.com>",
        "payload": {"name":"John Smith"}
    },
    "MAILGUN_DOMAIN": "your domain",
    "MAILGUN_KEY": "your key",
    "EMAIL_SENDER": "Mailgun Sandbox <your sender>"
}
```
</code-block>

</code-group>


### Netlify Deployment

Refer the following documentaion and blog post to host the server (and optional Single Page Application) at [Netlify](https://docs.netlify.com/)

* [Netlify](https://docs.netlify.com/) documentaion 
* [blog post](https://blog.carlmjohnson.net/post/2020/how-to-host-golang-on-netlify-for-free/) by [Carl M. Johnson](https://carlmjohnson.net/)

### Key Frameworks and Libraries used

- [x] github.com/apex/gateway
- [x] github.com/gin-gonic/gin
- [x] github.com/mailgun/mailgun-go/v4
- [x] github.com/sirupsen/logrus
- [x] github.com/spf13/viper
- [x] github.com/tidwall/gjson
