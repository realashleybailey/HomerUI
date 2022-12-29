<h1 align="center">
 <img width="180" alt="HomerUI's donut" src="https://raw.githubusercontent.com/bastienwirtz/homer/main/public/logo.png">
    <br/>
    HomerUI
</h1>

<h4 align="center">
 A not so dead simple take on <a href="https://github.com/bastienwirtz/homer">Homer</a> by <a href="https://github.com/bastienwirtz">bastienwirtz</a>.
</h4>

<p align="center"> 
  <a href="https://www.buymeacoffee.com/ashleybailey" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>
<p>

<p align="center">
 <strong>
   <a href="https://homer-demo.netlify.app">Demo</a>
  •
  <a href="#getting-started">Getting started</a>
 </strong>
</p>

<p align="center">
 <a href="https://opensource.org/licenses/Apache-2.0"><img
  alt="License: Apache 2"
  src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"></a>
  <a href="https://github.com/realashlbailey/HomerUI/releases/latest/download/homer.zip"><img
  alt="Download homer static build"
  src="https://img.shields.io/badge/Download-homer.zip-orange"></a>
 <a href="https://github.com/awesome-selfhosted/awesome-selfhosted"><img
  alt="Awesome"
  src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"></a>
</p>

<hr>
<h3 align="center">
Please read before usage
</h3>
<h4 align="center">
This is a fork of <a href="https://github.com/bastienwirtz/homer">Homer</a> by <a href="https://github.com/bastienwirtz">bastienwirtz</a>, this project aims to allow users to configure and manage there Homer Dashboard from the browser and also bring Live Stats to the Service cards, if you want something more simple then please go over to the original <a href="https://github.com/bastienwirtz/homer">Homer</a> and give them some love, there work is great, however if you are looking for something with a more advanced feature set then continue below.
</h4>
<hr>

## Table of Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Configuration](docs/configuration.md)
- [Custom services](docs/customservices.md)
- [Tips & tricks](docs/tips-and-tricks.md)
- [Development](docs/development.md)
- [Troubleshooting](docs/troubleshooting.md)

## Features

- Full GUI for configuration using the browser
- Grouping Services
- Theme customization
- Offline health check
- API intergration
- Live Statistics
- Dark Mode
- Authentication
and more...

## Getting started

HomerUI is a dashboard for all your services and websites, as mentioned above HomerUI is based on the original Homer and carries over the interface styles, so if you previously used Homer you won't loose that lovely CSS.

See [documentation](docs/configuration.md) for information about the configuration options.

Unlike Homer, HomerUI must be served by the included Express server, **it will not work if you simply host the dist folder**, this is because HomerUI relies on a SQlite database to store all the configuration and services and will communicate with the backend using the REST API.

### Using docker

```sh
docker run -d \
  -p 8080:8080 \
  --restart=always \
  realashleybailey/homerui:latest
```

**Environment variables:**

* **`PORT`** (default: `8080`)
  If you would like to change internal port of HomerUI from default `8080` to your port choice.

#### With docker-compose

A [`docker-compose.yml`](docker-compose.yml) file is available as an example. It must be edited to match your needs. You probably want to adjust the port mapping (equivalent to `-p` argument).

Then launch the container:

```sh
cd /path/to/docker-compose.yml/
docker-compose up -d
```

### Build manually

```sh
# Using yarn (recommended)
yarn install
yarn build

# **OR** Using npm
npm install
npm run build
```

Then your dashboard is ready to use in the `/dist` directory.
