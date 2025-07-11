## Quick Overview

The demonstrative online & anonymous chat used to upgrade my skills in Vue.

## Tech Stack

**Front-end:** Vue + Vite, Pinia.
</br>
**Back-end:** Express.js.

## Dependencies

- Install [Git](https://git-scm.com/) on your machine to clone the Github repository.
- Install [Node.js](https://nodejs.org/) on your machine to build and run the application locally.

## Clone Repository

Create a new directory where you want to deploy the application, then clone the Github repository into it:

```bash
git clone https://github.com/artndev/chatto.git .
```

Navigate to the project directory:

```bash
cd root
```

Change the working branch from _master_ (production branch) to _dev-public_ (public development branch) due to the specialties of the production and development environments:

```bash
git checkout dev-public
```

## Run Application with Node.js

Use the command below to run the server with Node.js:

```bash
npm run start --prefix server
```

Another command to run the client:

```bash
npm run start --prefix client
```

## Access Application

Once the application is started successfully, it will be available at http://localhost:5173.
