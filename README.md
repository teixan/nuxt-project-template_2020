# NUXT PROJECT TEMPLATE v202011.001 by teixan

Firebase based NUXT Web APP project template.

## Firebase

Requirement

- Hosting
- Firestore
- Authentication (Google)

### Minimum firebase setup

[Firebase console](https://console.firebase.google.com/)

- Make project
- Initialize Firestore
- Google Auth setting

## Build Setup

```bash
# set env
copy `.env_sample` as `.env`
and change values as from your Firebase project

# install dependencies
$ yarn install
or
$ npm i


# serve with hot reload at localhost:3000
$ yarn dev
or
$ npm run dev


# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# deploy (after Firebase setting)
$ npm run generat
$ firebase deploy
```
