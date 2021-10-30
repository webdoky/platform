# WebDoky platform

[![uk](https://img.shields.io/badge/lang-uk-green.svg)](https://github.com/webdoky/platform/blob/master/README.md)
[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/webdoky/platform/blob/master/README.en.md)

## What

This is a static website generator, built upon [Gridsome](https://gridsome.org/), which is responsible for the functionality, as well as look and feel of the [WebDoky](https://webdoky.org) project.

The content lies inside [this](https://github.com/webdoky/content) repository, also in order to generate correct navigation we use original [MDN content repo](https://github.com/mdn/content).

## How to run it

1. Clone this repo:
    ```sh
    git clone git@github.com:webdoky/platform.git webdoky-platform
    ```
    Or use this command, if you want to pull submodules with the text content too
    ```sh
    git clone --recurse-submodules git@github.com:webdoky/platform.git webdoky-platform
    ```
2. Navigate into it and install the necessary dependencies:
    ```sh
    cd webdoky-platform & yarn
    ```
    > If this command throws an error, make sure you have NodeJs, NPM and Yarn installed
3. Update submodules with text content (if you haven't done this in the first step):
    ```sh
    git submodule update --init --recursive
    ```
4. Now we set up the configuration so it points to proper content repositories. There is a configuration preset already, just rename it from `example-uk.env` to `.env`
    ```sh
    cp ./example-uk.env ./.env
    ```
5. Run this command to start building the project
    ```sh
    yarn develop
    ```
    If you want production version, use
    ```sh
    yarn build
    ```
6. That's it. After building develop version Gridsome should report the result and offer the [http://localhost:8080/](http://localhost:8080/) link, which then may be used to open the project in the browser