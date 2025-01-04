---
title: How to expose apps running in your home lab server securely to public internet thru cloudflare tunnel?
slug: how-to-expose-apps-running-in-your-home-lab-server-securely-to-public-internet-thru-cloudflare-tunnel
date: 2021-11-07T12:00:00.000Z
published: true
coverImage: https://res.cloudinary.com/nathansweb/image/upload/v1636292289/senthilsweb.com/blog/Multiple-proxy-services-in-one-cloudflared-1_royp2j.png
ogImage: https://res.cloudinary.com/nathansweb/image/upload/v1636292289/senthilsweb.com/blog/Multiple-proxy-services-in-one-cloudflared-1_royp2j.png
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags:
  - tunnel
  - cloudflared
  - ngrok
  - Free tunnel
  - Cloud
  - cookbook
---

This post will guide you to expose your local development websites and webhooks or any http applications running in your home servers to public internet in a safe and secure manner using free Cloudflare (cloudflared) tunnel client also known as Argo Tunnel. It is 100% free and doesn't requre any registrations or Credit card details.

<!--more-->

## Use cases

Common usecases where tunneling softwares will be handy

<list :items="usecases"></list>

## Architecture

`cloudflared` is command-line client for Cloudflare Tunnel, a tunneling daemon that proxies traffic from the Cloudflare network to your origins. This daemon sits between Cloudflare network and your origin (e.g. a webserver) as shown in the network architecture diagram.

![background](https://res.cloudinary.com/nathansweb/image/upload/v1636289611/senthilsweb.com/blog/cloudflared-argo-tunnel-arch_jy4vx9.jpg)


## Getting Started

[Download](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation#macos) cloudfalred tunnel client

## Installation

cd into the folder where your downloaded cloudflared

<code-group>
<code-block label="Bash" active>

  ```bash
  cd [path where your downloaded cloudflared]/
  ```
</code-block>
</code-group>


Run the tunnel pointing to your local website url. In my case, I am running grafana in a docker container at port 3000

<code-group>
<code-block label="Bash" active>

  ```bash
  ./cloudflared tunnel --url http://localhost:3000
  ```
</code-block>
</code-group>

## Cloudflared Features

<list :items="features"></list>

## Cloudflared shortcomings

The cloudflared tunneling client doesn't support non http protocols (i.e. `tcp`). E.g. expose MS SQL Server or PostgreSQL dabases running your local. 

## Alternate softwares

[ngrok](https://ngrok.com/download) supports both http and tcp however the free version supports just one instance of `ngrok`. 

Expose MS SQL server running in your local machine at port #. 1433

<code-group>
<code-block label="Bash" active>

  ```bash
  ./ngrok tcp 1433
  ```
</code-block>
</code-group>

## References:

  - [Cloudfalred](https://github.com/cloudflare/cloudflared)
  - [Many services, one cloudflared](https://blog.cloudflare.com/many-services-one-cloudflared/)
  - [How to set up argo tunnels](https://servebolt.com/help/how-to-set-up-argo-tunnels-for-remote-access-to-local-development-sites/)
  - [How we used Cloudflare Argo Tunnels + Access to replace a VPN](https://www.obytes.com/blog/how-we-used-cloudflare-argo-tunnels-access-to-replace-a-vpn)