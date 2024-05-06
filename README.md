<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/CPNV-ES/Zonta-Gaufres">
    <img src="./storage/app/zonta/zonta-red-big.png" alt="Zonta Logo" width="80" height="80">
  </a>

<h3 align="center">Zonta Gaufres</h3>

  <p align="center">
    An awesome management system for Zonta waffles sells!
    <br />
    <a href="https://github.com/CPNV-ES/Zonta-Gaufres"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CPNV-ES/Zonta-Gaufres/issues">Request Feature</a>
    ·
    <a href="https://github.com/CPNV-ES/Zonta-Gaufres/issues">Report Bug</a>
  </p>
</div>

# About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

[![Laravel][Laravel.com]][Laravel-url]
[![React][React.js]][React-url]
[![Shadcn][ShadCn.com]][ShadCn-url]
[![Docker][Docker.com]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Environment

<!-- TODO -->

# Getting Started

## Development

### Prerequisites

[![Docker][Docker.com]][Docker-url]
[![npm][npm]][npm-url]
[![composer][composer]][composer-url]
[![php][php]][php-url]

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/CPNV-ES/Zonta-Gaufres.git
   ```

2. Install npm and composer dependencies (`not required` if you're planning to use `devcontainer`)

    ```sh
    npm install
    composer install
    #or
    npm run dep
    ```

> The `dep` script is a custom script that will install both npm and composer dependencies at once.

3. Create the `.env` file based on the `.env.example` file

    ```sh
     cp .env.example .env
     ```

4. Build docker containers (optional)

    ```sh
    docker compose build
    ```

### Runnning the project

#### Using Docker and devcontainer

As the project is using Docker container with a devcontainer, you can simply run the dev container using the `vscode` extension `ms-vscode-remote.remote-containers`.

Open the project in vscode. It should ask you to reopen in the container. If it doesn't, you can click on `ctrl + shit + p` and type `reopen in container` then press enter.

The devcontainer contains extensions to allow any dev to work with the same formatting and have a better collaboration.

##### Not using VSCode ?

If you are using another IDE which has a `limited support for devcontainers`, you might no be able to run the devcontainer at its current state. Therefore, you can still run the container with the following command.

```sh
docker compose up -d
```

> `-d` stands for detached mode, meaning that the container will run in the background.

#### Install dependencies

Now that you are in the container, you can run the following command to install all the dependencies at once.

```sh
# If it's the first time you're installing dependencies run:
npm i
# Then:
npm run dep
```

> It's due to a package used in the script "dep" which runs all dependencies install concurrently in the same terminal. You can still do each step manually.

#### Run the servers

There are two servers that must be started. One which serves the frontend and one which serves the backend.

```sh
npm run dev-all
# or
npm run dev
php artisan serve
```

> Same as before the `dev-all` script is a custom script that will run both servers concurrently in the same terminal. You can still do each step manually.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Collaborate

### Convention

#### Commit

The project uses [Conventional Commits][Commit-url]. The keywords used are: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`. The commits are named with the following pattern: `type: description` eg.(feat: add awsome feature).

#### Workflow

The project uses [Gitflow][GitFlow-url]. The branches used are: `main`, `develop`, `feature`, `release`, `hotfix`. The branches are named with the following pattern: `type/short-description` eg.(feature/awsome-feature).

#### file naming

The project uses the following file naming convention.

| Type                | Naming convention | Example           |
| ------------------- | ----------------- | ----------------- |
| Class               | PascalCase        | `LoginPage`       |
| JS                  | camelCase         | `loginPage.js`    |
| JSX Component       | PascalCase        | `Button.jsx`      |
| Shadcn/ui Component | camleCase         | `button.jsx`      |
| CSS                 | kebab-case        | `main.css`        |
| HTML                | kebab-case        | `login-page.html` |

### Versioning

The project uses [SemVer][SemVer-url]. The versioning is done with the following pattern: `major.minor.patch` eg.(1.0.0).

### Development server

The project uses [Vite][Vite-url] as a development server.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

| Developer        | Email                         |
| ---------------- | ----------------------------- |
| Noé Zwissig      | <noe.zwissig@eduvaud.ch>      |
| Cyprien Jaquier  | <cyprien.jaquier@eduvaud.ch>  |
| Noah Delgado     | <noah.delgado@eduvaud.ch>     |
| Benjamin Fontana | <benjamin.fontana@eduvaud.ch> |

Project Link: [https://github.com/CPNV-ES/Zonta-Gaufres](https://github.com/CPNV-ES/Zonta-Gaufres)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/CPNV-ES/Zonta-Gaufres.svg?style=for-the-badge
[contributors-url]: https://github.com/CPNV-ES/Zonta-Gaufres/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/CPNV-ES/Zonta-Gaufres.svg?style=for-the-badge
[issues-url]: https://github.com/CPNV-ES/Zonta-Gaufres/issues
[license-shield]: https://img.shields.io/github/license/CPNV-ES/Zonta-Gaufres.svg?style=for-the-badge
[license-url]: https://github.com/CPNV-ES/Zonta-Gaufres/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=react
[React-url]: https://reactjs.org/
[Laravel.com]: https://img.shields.io/badge/Laravel%2010-20232A?style=for-the-badge&logo=laravel&logoColor=laravel
[Laravel-url]: https://laravel.com
[ShadCn.com]: https://img.shields.io/badge/shadcn/ui-20232A?style=for-the-badge&logo=shadcnui&logoColor=shadcnui
[ShadCn-url]: https://shadcn.com
[Docker.com]: https://img.shields.io/badge/Docker-20232A?style=for-the-badge&logo=docker&logoColor=docker
[Docker-url]: https://www.docker.com/
[npm]: https://img.shields.io/badge/npm-20232A?style=for-the-badge&logo=npm&logoColor=npm
[npm-url]: https://www.npmjs.com/
[composer]: https://img.shields.io/badge/composer-20232A?style=for-the-badge&logo=composer&logoColor=composer
[composer-url]: https://getcomposer.org/
[Vite-url]: https://vitejs.dev/
[GitFlow-url]: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
[SemVer-url]: https://semver.org/
[Commit-url]: https://www.conventionalcommits.org/
[php]: https://img.shields.io/badge/php%208.2-20232A?style=for-the-badge&logo=php&logoColor=php
[php-url]: https://www.php.net/
