<h1 align="center">
 <img width="180" alt="Homer's donut" src="https://raw.githubusercontent.com/bastienwirtz/homer/main/public/logo.png">
    <br/>
    Homer V2
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
  <a href="https://github.com/realashlbailey/homerV2/releases/latest/download/homer.zip"><img
  alt="Download homer static build"
  src="https://img.shields.io/badge/Download-homer.zip-orange"></a>
 <a href="https://github.com/awesome-selfhosted/awesome-selfhosted"><img
  alt="Awesome"
  src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"></a>
</p>

<p align="center">
 <img src="https://raw.githubusercontent.com/realashleybailey/HomerV2/main/docs/imgs/mobile/Dashboard.png?token=GHSAT0AAAAAABW45DINWCRB4S3N4D5QGUQMY5I2VGQ" width="15%">
 <img src="https://raw.githubusercontent.com/realashleybailey/HomerV2/main/docs/imgs/mobile/AddService-Step1.png?token=GHSAT0AAAAAABW45DINYRL674GCAAVAWPAGY5I2WLA" width="15%">
 <img src="https://raw.githubusercontent.com/realashleybailey/HomerV2/main/docs/imgs/mobile/AddService-Step2.png?token=GHSAT0AAAAAABW45DIMZ7KFEPRVUB4AYCESY5I2W4A" width="15%">
 <img src="https://raw.githubusercontent.com/realashleybailey/HomerV2/main/docs/imgs/mobile/AddService-Step3-Small.png?token=GHSAT0AAAAAABW45DINGEGWYVJF47IT4YJWY5I2YPA" width="15%">
 <img src="https://raw.githubusercontent.com/realashleybailey/HomerV2/main/docs/imgs/mobile/Settings-Small.png?token=GHSAT0AAAAAABW45DINL77JXYEV7DUM75AIY5I2ZQQ" width="15%">
 <img src="https://raw.githubusercontent.com/realashleybailey/HomerV2/main/docs/imgs/mobile/LoginPage.png?token=GHSAT0AAAAAABW45DINU3ADWB627GNNO7IGY5I22PQ" width="15%">
</p>

## Table of Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Configuration](docs/configuration.md)
- [Custom services](docs/customservices.md)
- [Tips & tricks](docs/tips-and-tricks.md)
- [Development](docs/development.md)
- [Troubleshooting](docs/troubleshooting.md)

## Features

- [yaml](http://yaml.org/) file configuration
- Installable (pwa)
- Search
- Grouping
- Theme customization
- Offline health check
- keyboard shortcuts:
  - `/` Start searching.
  - `Escape` Stop searching.
  - `Enter` Open the first matching result (respects the bookmark's `_target` property).
  - `Alt`/`Option` + `Enter` Open the first matching result in a new tab.

## Getting started

Homer is a full static html/js dashboard, based on a simple yaml configuration file. See [documentation](docs/configuration.md) for information about the configuration (`assets/config.yml`) options.

It's meant to be served by an HTTP server, **it will not work if you open the index.html directly over file:// protocol**.

### Using docker

```sh
docker run -d \
  -p 8080:8080 \
  -v </your/local/assets/>:/www/assets \
  --restart=always \
  b4bz/homer:latest
```

The container will run using a user uid and gid 1000. Add `--user <your-UID>:<your-GID>` to the docker command to adjust it. Make sure this match the ownership of your assets directory.

**Environment variables:**

* **`INIT_ASSETS`** (default: `1`)
  Install example configuration file & assets (favicons, ...) to help you get started.
* **`SUBFOLDER`** (default: `null`)
  If you would like to host Homer in a subfolder, (ex: *http://my-domain/**homer***), set this to the subfolder path (ex `/homer`).
* **`PORT`** (default: `8080`)
  If you would like to change internal port of Homer from default `8080` to your port choice.

#### With docker-compose

A [`docker-compose.yml`](docker-compose.yml) file is available as an example. It must be edited to match your needs. You probably want to adjust the port mapping and volume binding (equivalent to `-p` and `-v` arguments).

Then launch the container:

```sh
cd /path/to/docker-compose.yml/
docker-compose up -d
```

### Using the release tarball (prebuilt, ready to use)

Download and extract the latest release (`homer.zip`) from the [release page](https://github.com/bastienwirtz/homer/releases), rename the `assets/config.yml.dist` file to `assets/config.yml`, and put it behind a web server.

```sh
wget https://github.com/bastienwirtz/homer/releases/latest/download/homer.zip
unzip homer.zip
cd homer
cp assets/config.yml.dist assets/config.yml
npx serve # or python -m http.server 8010 or apache, nginx ...
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
