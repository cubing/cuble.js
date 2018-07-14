# `libTemplate`

Lots of boilerplate for a library maintained using Typescript + Webpack.

## Usage
    
    git clone https://github.com/cubing/libTemplate.js libTemplate
    cd libTemplate

    # Make sure you have `node` and `yarn` installed before running this:
    yarn install

    # Run tests
    # (This runs `make dist` under the hood.)
    make test

    # Use the built library in the browser directly
    make dist
    open test/html/index.html

To build the output file continuously while working on input files, run `make dev`.

# Layout

Source files are in `src`. They are compiled into `dist/libTemplate.js` using [Webpack](https://webpack.js.org/).

`dist` will also contain an additional `.d.ts` TypeScript definition file for each source file, as well as a `libTemplate.js.map` [source map](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) for debugging.

Tests are written in `test/test.ts`. Run `make test` to run them.

Some notes:

- It should be possible to decipher the meaning of every part of this project using comments, code search, and Google. Feel free to ask a question by [filing an issue](https://github.com/cubing/libTemplate.js/issues) if you are wondering why something is/isn't structured in a particular way.
- For a larger project based on this template, see [`alg.js`](https://github.com/cubing/alg.js).
- `dist/libTemplate.js` is a [UMD module](https://github.com/umdjs/umd). That roughly means it can be used in the browser directly as well as in `node`.
- This module is set up for building a library, but can be adapted for commandline tools. You can also run `node dist/libTemplate.js` directly.
- The output file name (`libTemplate.js`) is taken from `package.json` → `name`, but can be configured directly in `webpack-config.json` if needed.
- This library can be used in other projects like this project itself uses `alg`. You can either:
  - Publish to `npm`.
  - Include this project as a `node_modules` folder in another project.
  - Run `yarn link` in this checkout and then `yarn link libTemplate` to automatically symlink this project into another project's `node_modules` folder.
- TypeScript has some nice autocompletion support in many editors. Make sure to install it!
- This project has a `.travis.yml` file you can use to automatically test every commit you push to GitHub (with `make test`), using [Travis CI](https://travis-ci.org/). If you want this, you'll need to log into Travis CI and set it up for the repo. See [this page](https://travis-ci.org/lgarron/libTemplate) for an example.
- Yes, `node_modules` is expected to contain over 10,000 files. That's apparently how modern JS development is done these days. 🤷‍♀️
