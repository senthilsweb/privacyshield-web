---
title: Deploy Zypress (or Static Website) in a standalone Golang binary
slug: deploy-zypress-or-static-website-in-a-standalone-golang-binary
date: 2021-07-17T12:00:00.000Z
published: true
industries: []
coverImage: 'https://res.cloudinary.com/nathansweb/image/upload/v1626527779/gophers/docker_whale-transparent-bg.png'
ogImage: 'https://res.cloudinary.com/nathansweb/image/upload/v1626527779/gophers/docker_whale-transparent-bg.png'
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags:
  - Blog
  - Zypress
  - Website
  - JAMSTACK
  - CI/CD
---

Starting with Golang 1.16, file embedding is supported in Go without the need for an external package. I leveraged this feature and added the support to build and deploy Zypress (or any SPA / Static Web Sites) in standalone binary for all operating systems i.e. Linux, Mac OS, Windows built using Golang’s latest file embedding feature. 

<!--more-->

The [zypress code repo](https://github.com/senthilsweb/zypress) now contains the following code files at the root of the project to build the binary in your local system and run anywhere. 

* `main.go`
* `build.sh`
* `systemd`

This requires `Go` to be installed in your machine and configured in your `PATH` variable. No worries, if you don't know `Golang` or don't want to build it in your system!.. I added support for cloud build using `github action` to generate the binary named *zypress-server* and upload the artifacts for [download] (http://)

Running the website directlly by executing a single binary will be super helpful to deploy the website (any static web site) on-prem or to share your work privately with anyone or your client privately as email attachment or upload in a dropbox / google drive. The size of the binary is `< 10mb`.

## Build zypress binaries

### Simple

```
go build main.go -o zypress-server
```

or

### Advanced 

A utility bash script provided to create the following artifacts:

* Build and generate the binaries for Linux, Mac and Windows for both 32 bit and 64 bit operating system
* Linux systemd service file to run `zypress-server` as service with auto-restart during server reboot
* `install.sh` utility shell script
* `readme.md` file
* release bundle as `tar' file.

```
sh server.build.sh
```



## How to run zypress server?

```
./zypress-server [-p] [-e] [-s] [-i] [-d] 
```

* [-p] port. Default value is `8080`
* [-e] environment. Default value is `dev`
* [-s] Website source type. Default value is `embed` meaning the website source is embedded inside the binary.
* [-i] index document to serve. Default value is `index.html`
* [-d] Directory where the website source is located. Default value is `./dist` relative to the `zypress` server. 


<alert type="info">
[-d] is considered when the source type is file-system
</alert>


Run with default configurations

```
./zypress-server
```

Overriden port to `5000`

```
./zypress-server -p 5000
```

Run with file-system mode. 

```
./zypress-server -p 5000 -e 'prod' -s 'fs' -f 'index.html' -d '/opt/www/zypresse'
```


## References

* [Nuxt.js](https://nuxtjs.org/)
* [Nuxt/Content](https://content.nuxtjs.org/)
* [Tailwind.css](https://tailwindcss.com/)