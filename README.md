# vite-plugin-dev-hosts

> **A Vite plugin to customize and display your own list of dev server hosts!**
> 
> works with wildcard domains and allows to override port

---

## Features

- 📝 **Custom host display**: Show only the hosts you want in the Vite dev server output
- 🌐 **Wildcard & phrase matching**: Match and transform hostnames flexibly
- 🔒 **Port override**: Change the port for any displayed host
- 👈 **Emoji highlight**: Mark your main host with a finger emoji (or custom function)
- 🦾 **TypeScript-first**: Full type safety and modern codebase

---

## Installation

```sh
yarn add -D vite-plugin-dev-hosts
# or
npm install -D vite-plugin-dev-hosts
```

---

## Usage

Add the plugin to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { devHostsPlugin } from 'vite-plugin-dev-hosts';

export default defineConfig({
  plugins: [
    devHostsPlugin({
      hosts: [
        { phrase: 'mydomain.test', main: true },
        { phrase: 'short.test', portOverride: 3001 },
        // or just a string for simple matching
        'localhost'
      ],
      baseReplace: 'base', // replaces vite. with base.
    })
  ]
});
```

---

## Options

| Option        | Type                                   | Description                                                      |
| -------------| -------------------------------------- | ---------------------------------------------------------------- |
| `hosts`      | `DevHostOption[]`                      | List of hosts to display (see below for details)                 |
| `baseReplace`| `string`                               | Replace `vite.` prefix with this string in hostnames             |

---

### `DevHostOption` type

```ts
type DevHostOption = string | {
  phrase: string;
  portOverride?: number;
  main?: boolean | ((url: string) => string);
};
```

- `phrase`: Substring to match in the dev server URL
- `portOverride`: If set, replaces the port in the displayed URL
- `main`: If `true`, adds a pointing emoji; or provide a function for custom formatting

---

## How it works

- The plugin intercepts Vite's dev server URL display logic
- It filters and transforms the displayed URLs according to your `hosts` config
- Hostnames starting with `vite.` are replaced with your `baseReplace` value
- Ports are overridden if specified
- The main host is highlighted with an emoji

---

## Example Output

```
  > Local:    https://base.mydomain.test:5173/  👈
  > Network:  https://base.short.test:3001/
  > Network:  https://localhost:5173/
```

---

## Testing

This project uses [Vitest](https://vitest.dev/) for unit tests.

```sh
yarn test
# or
npm test
```

---

## License

[MIT](LICENSE)

