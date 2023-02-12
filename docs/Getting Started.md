# Getting Started

This page provides information you can use to run ArcOS yourself. You will set up the frontend and an ArcAPI instance for running your files

## Running the frontend

The Frontend is the interactive part of ArcOS. You'll be accessing the Frontend whenever you run ArcOS. There are many different ways you can use to host it. After all, it is just a Svelte project. But, the method I'm going to demonstrate here is the one you should use if you just want to try it out. You can build and deploy it anywhere no problem.

Follow the instructions for your operating system:

<details>

<summary>Windows</summary>

Prerequisites:

- NPM and NodeJS ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

Execute the following commands in order to run the frontend:

```batch
> git clone https://github.com/IzK-ArcOS/ArcOS-Frontend

> cd ArcOS-Frontend

> npm install
> npm run dev
```

</details>

<details>

<summary>Linux - Debian based systems</summary>

Install the prerequisites and update NodeJS using [n](https://www.npmjs.com/package/n):

```bash
$ sudo apt install -y git nodejs npm
$ sudo npm i -g n
$ sudo n latest
```

Execute the following commands in order to run the frontend:

```bash
$ git clone https://github.com/IzK-ArcOS/ArcOS-Frontend

$ cd ArcOS-Frontend

$ npm install
$ npm run dev
```

</details>

---

Once those commands have been executed the frontend should be running on port `5173`. Open this port in your browser, and you'll be presented with the First Time Setup. Of course, in order to get the most out of your instance, you may want to get an ArcAPI running as well.

## Running an ArcAPI locally

The ArcAPI is where the magic happens. It's the backend API of ArcOS, housing the file system integration, user system, and much more. To get started, you'll need to open up a terminal or command prompt and follow the instructions for your operating system:

<details>

<summary>Windows</summary>

First, install the prerequisites:

- NPM and NodeJS ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

Next, we'll clone the repository and start it for the first time:

```bat
> git clone https://github.com/IzK-ArcOS/ArcOS-API-v1

> cd ArcOS-API-v1
> npm install
> npm start
```

This will create the following items:

- `./fs`: This is where the user ArcFS instances are stored;
- `./db`: This is the database directory which houses everything from preferences to the Argon2 hashes;
- `./template`: This is the user template
- `./config.json`: This is the configuration file in which you can customize things like directory locations and the ArcAPI port.

</details>

<details>

<summary>Linux - Debian based systems</summary>

Install the prerequisites and update NodeJS using [n](https://www.npmjs.com/package/n):

```bash
$ sudo apt install -y git nodejs npm
$ sudo npm i -g n
$ sudo n latest
```

Next, we'll clone the repository and start it for the first time:

```bat
$ git clone https://github.com/IzK-ArcOS/ArcOS-API-v1

$ cd ArcOS-API-v1
$ npm install
$ npm start
```

This will create the following items:

- `./fs`: This is where the user ArcFS instances are stored;
- `./db`: This is the database directory which houses everything from preferences to the Argon2 hashes;
- `./template`: This is the user template
- `./config.json`: This is the configuration file in which you can customize things like directory locations and the ArcAPI port.

> ⚠️ **ArcAPI is developed on Windows.** Initial testing shows that it runs fine on Linux but we can't get guarantee that it will for you as well.

</details>
