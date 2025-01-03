# trakt-lite

[![CI](https://github.com/trakt/trakt-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/trakt/trakt-lite/actions/workflows/ci.yml)

[![CD](https://github.com/trakt/trakt-lite/actions/workflows/cd.yml/badge.svg)](https://github.com/trakt/trakt-lite/actions/workflows/cd.yml)

## Project Structure

This [workspace](https://docs.deno.com/runtime/fundamentals/workspaces/) is
composed of multiple interconnected projects:

- **`api`:** The beating heart of our operation. This project defines the Trakt
  API interactions using `ts-rest` and `zod` for type-safe communication and
  validation. Think of it as our precinct's meticulously organized evidence
  board.
- **`playground`:** Our detective's sandbox. This CLI project allows for
  effortless exploration and experimentation with the Trakt API. It's where we
  test our hunches and follow the leads.
- **`swagger`:** The public notice board. A simple `hono` server that exposes
  the API contract as an OpenAPI/Swagger definition, providing clear
  documentation for those who wish to understand our methods.
- **`client`:** The gleaming chrome of our pursuit. This project houses the
  Trakt Lite client, a sleek and efficient machine built with Deno and
  SvelteKit. It's the polished facade, the fast car we use to chase down those
  elusive media insights. (Just try not to crash it into a dumpster fire like
  last time.)

## Environment Variables

The following environment variables are required for the workspace to function
properly:

### Development

- **`TRAKT_CLIENT_ID`:** The client ID for the Trakt API.
- **`TRAKT_CLIENT_SECRET`:** The client secret for the Trakt API.
  - Required for the `playground` project.

## Getting Started

This is a Deno project, so you need to have Deno installed on your machine
please refer to the
[Deno installation guide](https://docs.deno.com/runtime/getting_started/installation/).

1. **Clone the repository**
1. **Install dependencies:** `deno task install`
1. **Run tasks:**

- Workspace:
  - Format & Lint: `deno task format`

- Playground:
  - Development: `deno task playground:dev`

- Swagger:
  - Serve: `deno task swagger`
  - Development: `deno task swagger:dev`

- Client:
  - Development: `deno task client:dev`

## Build Trakt Lite

To build the Trakt Lite client, run the following command:

```sh
cd projects/client/
[deno|npm|bun] run build
```

## Summoning a Production Preview: A How-To Guide

### Vite

Simply run the following command:

```sh
[deno|npm|bun] run build:preview && [deno|npm|bun] run preview
```

## Update Minor Dependencies

### Install `npm-check-updates`

```bash
deno install -g --allow-all -n ncu npm:npm-check-updates
```

NOTE: For the client project add the `-p npm` since we're using a `package.json`
definition for the svelte project.

### Production

- **Check:** `ncu --dep prod -t minor`
- **Update:** `ncu --dep prod -t minor -u`

### Development

- **Check:** `ncu --dep dev -t minor`
- **Update:** `ncu --dep dev -t minor -u`

Verify that the above steps run smoothly and revert any changes that break the
build (this should generally not be the case).

## Update Major Dependencies

- **Production:** `ncu --dep prod -t latest`
- **Development:** `ncu --dep dev -t latest`

For each entry listed as a result:

1. `ncu <ENTRY> -u -t latest`
1. Build
1. Update any breaks
1. Test
1. Commit

## Resolving the Multilingual Mayhem

### A Guide to i18n Conflict Resolution

Should the chaotic forces of rebasing leave your `client/i18n/messages` folder
in a state of disarray, fear not, intrepid developer. For within this document
lies the knowledge to restore harmony to the realm of translations.

When merging your linguistic endeavors with the `main` branch, conflicts may
arise within the `client/i18n/messages` domain. This is to be expected, for the
path of internationalization is fraught with peril and unexpected detours.

To navigate this linguistic labyrinth and emerge victorious, follow these steps:

1. **Ensure the presence of the `deno` CLI:** This digital incantation, a key to
   unlocking the secrets of conflict resolution, must be present within your
   development arsenal.
2. **Invoke the resolution ritual:** From the heart of the project, intone the
   following command:

   ```bash
   deno task client:i18n:resolve
   ```

   Alternatively, should you find yourself within the `projects/client` domain,
   utter this incantation:

   ```bash
   deno task i18n:resolve
   ```

These commands, like ancient spells whispered in the dead of night, shall
resolve the conflicts and restore order to the `i18n/messages/*.json` files. The
translations, once fragmented and disjointed, shall merge into a harmonious
symphony of multilingual understanding.

With these tools at your disposal, you shall emerge from the chaos of rebasing
with your sanity intact and your translations unified. Go forth, and conquer the
linguistic challenges that lie before you.

For more details about infrastructure, see:
[INFRASTRUCTURE.md](INFRASTRUCTURE.md).
