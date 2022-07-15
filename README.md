# WebDoky platform

[![uk](https://img.shields.io/badge/lang-uk-green.svg)](https://github.com/webdoky/platform/blob/master/README.md)
[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/webdoky/platform/blob/master/README.en.md)

> ## Зауваження
> 
> Цей репозиторій виведений з ужитку, і не використовується. Gridsome як фреймворк застарів і припинив розвиватися. Враховуючи масу проблем, притаманних саме йому, було прийнято рішення мігрувати проект на [NextJS](https://nextjs.org/). Актуальна версія платформи тепер живе у [цьому репозиторії](https://github.com/webdoky/platform-next). Всі зауваження і побажання залишайте, будь ласка, [там](https://github.com/webdoky/platform-next/issues/).

> ## Remark
> 
> This repository has been decommisioned, and put out of use. Gridsome framework grown quite old and stopped developing. Taking into account all his problems, we've decided to migrate the project to [NextJS](https://nextjs.org/). Relevant version of our platform lives [in this repository](https://github.com/webdoky/platform-next) now. You're welcome to leave any suggestions [in the issues there](https://github.com/webdoky/platform-next/issues/).

## Що це

Це генератор статичного вебстайту, побудований на базі [Gridsome](https://gridsome.org/), який відповідальний за функціонал, і зовнішній вигляд проєкту WebDoky.

За його вміст відповідає [ось цей](https://github.com/webdoky/content) репозиторій, а для коректної навігації ми користуємося оригінальним [репозиторієм MDN](https://github.com/mdn/content).

## Як це запустити

1. Склонуйте цей репозиторій в будь-яке зручне місце:
    ```sh
    git clone git@github.com:webdoky/platform.git webdoky-platform
    ```
    Або так, якщо ви хочете одразу підтягнути вміст репозиторіїв з текстом
    ```sh
    git clone --recurse-submodules git@github.com:webdoky/platform.git webdoky-platform
    ```
2. Перейдіть всередину і встановіть необхідні залежності:
    ```sh
    cd webdoky-platform & yarn
    ```
    > Якщо ця команда викинула помилку &mdash; впевніться, що у вас встановлено NodeJs, NPM та Yarn
3. Підтягніть вміст репозиторіїв з текстами (якщо ви іще не зробили цього раніше):
    ```sh
    git submodule update --init --recursive --remote
    ```
4. Налаштуйте конфігурацію так, щоб вона вказувала на потрібні репозиторії з текстами. Тут уже робочий файл конфігурації, для початку роботи достатньо перейменувати його з `example-uk.env` у `.env`
    ```sh
    cp ./example-uk.env ./.env
    ```
5. Для збирання проєкту і початку роботи запустіть таку команду
    ```sh
    yarn develop
    ```
    На випадок, якщо вам потрібна продуктова версія, скористайтеся командою
    ```sh
    yarn build
    ```
6. Все. Gridsome має відрепортувати результат і запропонувати перейти за адресою [http://localhost:8080/](http://localhost:8080/), щоб побачити робочий проєкт
