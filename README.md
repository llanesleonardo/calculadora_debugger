# debu-0

Empty project.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

## Running

```sh
node dist/bundle.js
```

## Testing

To run unit tests:

```sh
npm test
```

## Chrome Developer Tools

add config in your .vscode/launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:1234",
      "webRoot": "${workspaceFolder}",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "../*": "${webRoot}/*"
      }
    }
  ]
}
```

and change the main prop in your package.json :

```json
{
  "name": "debugger-0",
  "version": "1.0.0",
  "description": "debugger example vanilla javascript",
  "main": "index.html",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "scripts": {
    "clean": "rm dist/bundle.js",
    "start": "parcel src/index.html",
    "build-prod": "parcel build src/index.html",
    "test": "jest"
  },
  "dependencies": {},
  "devDependencies": {
    "parcel-bundler": "^1.12.5",
    "jest": "^27.3.1",
    "babel-jest": "^27.3.1",
    "@babel/core": "^7.16.0",
    "@babel/preset-env": "^7.16.0",
    "prettier": "^2.4.1"
  }
}
```

Refs: [parcel](https://parceljs.org/recipes/debugging/)

# JEST

[cheat sheet](https://devhints.io/jest)

## Credits

Made with [createapp.dev](https://createapp.dev/)
