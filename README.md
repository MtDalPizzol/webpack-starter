# Webpack Starter

This is a Webpack boilerplate to write web pages and apps using ES6 and SASS.

The goal is to provide a Webpack configuration that can be used in any good old "php/jQuery" project, if you know what I mean. Some people end up not taking the time to learn Webpack because they go to search engines and find a bunch of articles talking about how to use Webpack with React, Angular, Angular2 and other complex stuff. They end up thinking that Webpack is made to work only with these kinds of tools. This project shows how you can take advantage of Webpack in that old legacy project that only needs a new theme, or, of course, in your next project.

## Features

* **[ES6](http://www.ecma-international.org/ecma-262/6.0/)** and modular JavaScript support with **[Babel](https://babeljs.io/)**.
* **[SASS/SCSS](http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html)** compile.
* Embed `.html` files through JavaScript with **[RAW Loader for Webpack](https://github.com/webpack/raw-loader)**.
* Development server with browser auto refresh with **[webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)**.
* Auto prefix of CSS rules with **[PostCSS](https://github.com/postcss/postcss)** and **[autoprefixer](https://github.com/postcss/autoprefixer)**.
* Production ready minified builds with **[UglifyJS](https://github.com/mishoo/UglifyJS)** and **[nanocss](http://cssnano.co/)**.
* No Gulp, no Grunt. Just **[npm scripts](https://docs.npmjs.com/misc/scripts)**

## Quick start

```bash
# clone this repo
$ git clone https://github.com/MtDalPizzol/webpack-starter.git my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install

# start the development server
$ npm start

# Browse to http://localhost:8081
```

## How it works

### Loading assets during development
During development, Webpack Starter uses [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html), which you can think of as a "CDN". It is responsible for serving your assets during development. This means your `<link>` and `<script>` tags will load the resources from this server - which runs on [http://localhost:8080](http://localhost:8080) and has the `./dist` folder as its root -, in order to get automatic builds and browser auto refresh on file changes. So, the only changes you need to do in your existing project is to load the bundle files from this host, as follows:

    <link rel="stylesheet" href="http://localhost:8080/css/bundle.css" media="screen">

    <script type="text/javascript" src="http://localhost:8080/js/bundle.js"></script>

Yes. It's that simple.

### Loading assets in production

To serve the bundle files in production, you only need to serve your dist folder normally.

    <link rel="stylesheet" href="http://www.my-awesome-domain.com/dist/css/bundle.css" media="screen">

    <script type="text/javascript" src="http://www.my-awesome-domain.com/dist/js/bundle.js"></script>

## Usage

### Lifting the dev server
This will put the `webpack-dev-server` listening on [http://localhost:8080](http://localhost:8080) and serving the assets directly from the RAM.
```bash
npm run dev:server
```

### Building files
This will build your files for production and write them to the disk.
```bash
npm run build
```

## Helper servers
Webpack Starter comes with a very simple Express.js server implementation that you can use to test if your assets are being correctly generated.

### [http://localhost:8081](http://localhost:8081)
This serves the `./app/index.html` file loading the assets from the dev server ([http://localhost:8080](http://localhost:8080)) and, therefore, auto reloading the page on file changes.
```bash
npm run dev
```

### [http://localhost:8082](http://localhost:8082)
This serves the `./app/index.html` file loading the assets from the the same server ([http://localhost:8082](http://localhost:8082)), emulating a production setup.
```bash
npm run deploy
```

**NOTE:** Before using this command, don't forget to run `npm run build` first, because [http://localhost:8082](http://localhost:8082) will request the built assets from the disk.

### A shortcut
This will start the `webpack-dev-server` at [http://localhost:8080](http://localhost:8080) and lift the [helper server](#helper-servers) at [http://localhost:8081](http://localhost:8081). This is the same as running `npm run dev:server` and `npm run dev` in parallel.
```bash
npm start
```

## A note on Materialize

If you're planning to use [Materialize](http://materializecss.com/), you need to know that some of its dependencies aren't designed to work with Webpack. To get this working, you'll need to hack your jQuery incorporation as follows:

**Add jQuery directly into your page:**

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

**Change the `webpack.config.js` file, adding the following code to make materialize.js aware of the external jQuery object.**

```
config.externals = {
  jquery: 'jQuery'
};
```

**Normally import materialize in your application:**

```
import 'materialize-css';
```

You can read more about this issue [here](https://github.com/InfomediaLtd/angular2-materialize/issues/20#issuecomment-253523617).

## License

This software is provided free of charge and without restriction under the [MIT License](/LICENSE)
