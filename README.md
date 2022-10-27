# MaglevCMS Command Line Interface

## Installation

```
yarn add maglevcms-cli -D
```

## Commands

<!-- commands -->

- [`maglevcms init PATH`](#maglevcms-init-path)
- [`maglevcms codegen`](#maglevcms-codegen)
- [`maglevcms sync`](#maglevcms-sync)

### `maglevcms init PATH`

Prepare your javascript application (only Nuxt for now) for the Maglev page builder.

```
USAGE
  $ maglevcms init PATH

ARGUMENTS
  PATH  The path of the javascript application

EXAMPLES
  $ maglevcms init .
```

### `maglevcms codegen`

Generate the Typescript types for all the section definitions.

```
USAGE
  $ maglevcms codegen

FLAGS
  -p, --path     Path to the Javascript application (Nuxt, ...etc). Default to the current.

EXAMPLES
  $ maglevcms codegen
  $ maglevcms codegen --path=~/sites/my-awesome-site
```

### `maglevcms sync`

Synchronize the theme and its section definitions to the Maglev server.

```
USAGE
  $ maglevcms sync

FLAGS
  -p, --path          Path to the Javascript application (Nuxt, ...etc). Default to the current.
  -h, --host          Host of the Maglev server. Default to the MAGLEV_HOST env variable.
  -r, --apiRootPath   Path to the API (/api by default). Default to the MAGLEV_API_ROOT_PATH env variable.
  -a, --apiKey        API key given by the Maglev server. Default to the MAGLEV_API_KEY variable.

EXAMPLES
  $ maglevcms sync
  $ maglevcms sync --path=~/sites/my-awesome-site --host=http://localhost --apiRootPath=/api --apiKey=easyone
```

### category

```
npx maglecms category call_to_action
```

## Development

TODO
