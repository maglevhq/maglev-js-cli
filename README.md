# MaglevCMS Command Line Interface

## Installation

```
yarn add maglevcms-cli -D
```

## Commands

<!-- commands -->

- [`maglevcms init PATH`](#maglevcms-init-path)
- [`maglevcms generate:category`](#maglevcms-generatecategory)
- [`maglevcms generate:code`](#maglevcms-generatecode)
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

### `maglevcms generate:category`

Append a new category to the Maglev theme.

```
USAGE
  $ maglevcms generate:category [ID] [NAME]

FLAGS
  -p, --path     Path to the Javascript application (Nuxt, ...etc). Default to the current.

EXAMPLES
  $ maglevcms generate:category call_to_action "Call to action"
  $ maglevcms generate:category call_to_action "Call to action" --path=~/sites/my-awesome-site
```

### `maglevcms generate:code`

Generate the Typescript types for all the section definitions and the mapping for the settings.

```
USAGE
  $ maglevcms generate:code

FLAGS
  -p, --path     Path to the Javascript application (Nuxt, ...etc). Default to the current.

EXAMPLES
  $ maglevcms generate:code
  $ maglevcms generate:code --path=~/sites/my-awesome-site
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

## Development

TODO
