# Numbers Go Up

The idle game where "big numbers good"

## Local development

This project uses [pnpm](https://pnpm.io/). We recommend installing pnpm using [corepack](https://pnpm.io/installation#using-corepack):

```sh
corepack enable pnpm
```

### Packages

This project is structured as a monorepo. You can install all packages using pnpm:

```sh
pnpm install
```

then build and run the game as follows:

#### Game

```sh
pnpm build:game
```

#### Site

After building the Game library:

```sh
pnpm dev
```

The game/site will be running on http://localhost:3000 by default.
