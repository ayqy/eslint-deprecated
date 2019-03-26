# eslint-plugin-deprecated

[![npm version](https://img.shields.io/npm/v/eslint-plugin-deprecated.svg)](https://www.npmjs.com/package/eslint-plugin-deprecated)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-deprecated.svg)](http://www.npmtrends.com/eslint-plugin-deprecated)
[![Build Status](https://travis-ci.org/mysticatea/eslint-plugin-deprecated.svg?branch=master)](https://travis-ci.org/mysticatea/eslint-plugin-deprecated)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-deprecated/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-deprecated)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-plugin-deprecated.svg)](https://david-dm.org/mysticatea/eslint-plugin-deprecated)

ESLint ~~@deprecation~~ rules plugin, based on API blacklist.

## :sparkles: Features

- [x] Modules and globals API options support. @v0.0.1
- [x] MessageTemplate option supports. @v0.2.0
- [ ] File level deprecation. @next-version

## 💿 Installation

```
$ npm install --save-dev eslint eslint-plugin-deprecated
```

- Requires Node.js `>=6.0.0`

## 🔧 Configs

**package.json** (An example)

```json
{
    "name": "your-module",
    "version": "1.0.0",
    "engines": {
        "node": ">=6.0.0"
    }
}
```

**.eslintrc.json** (An example)

```json
{
  "plugins": [
    "deprecated"
  ],
  "rules": {
    "deprecated/no-deprecated-api": ["error", {
      "modules": {},
      "globals": {
        "eval": {
          "[CALL]": {
            "replacedBy": "DO NOT use it.",
            "since": "1.0.0"
          }
        },
        "name": {
          "[READ]": {
            "replacedBy": "Use 'window.name' instead.",
            "since": "1.2.0"
          }
        },
        "Function": {
          "[CONSSTRUCT]": {
            "replacedBy": "DO NOT use it.",
            "since": "1.0.3"
          }
        }
      },
      "messageTemplate": "{{name}} was DEPRECATED\n{{replace}}"
    }]
  }
}
```

Examples of :-1: **incorrect** code for this rule:

```js
// example.js
(function() {
  name;
})();
eval('1 + 2');
new Function('a', 'b', 'return a + b')(1, 2);
```

ESLint output：

```
path/to/example.js
  2:3  error  'name' was DEPRECATED
Use 'window.name' instead  deprecated/no-deprecated-api
  4:1  error  'eval()' was DEPRECATED
DO NOT use it            deprecated/no-deprecated-api
  5:1  error  'new Function()' was DEPRECATED
DO NOT use it    deprecated/no-deprecated-api
```

## 📖 Rules

- ⭐️ - the mark of recommended rules.
- ✒️ - the mark of fixable rules.

<!--RULES_TABLE_START-->
### Best Practices

| Rule ID | Description |    |
|:--------|:------------|:--:|
| no-deprecated-api | disallow deprecated APIs | ⭐️ |

<!--RULES_TABLE_END-->

## 👫 Known Limitations

This rule cannot report the following cases:

### non-static properties

- async_hooks
    - [asyncResource.triggerId](https://nodejs.org/dist/v8.2.0/docs/api/deprecations.html#deprecations_dep0072_async_hooks_asyncresource_triggerid)
- buffer
    - [buf.parent](https://nodejs.org/dist/v8.0.0/docs/api/buffer.html#buffer_buf_parent)
- cluster
    - [worker.suicide](https://nodejs.org/dist/v6.0.0/docs/api/cluster.html#cluster_worker_suicide)
- crypto
    - [ecdh.setPublicKey](https://nodejs.org/dist/v6.0.0/docs/api/crypto.html#crypto_ecdh_setpublickey_public_key_encoding)
- http
    - [res.writeHeader()](https://nodejs.org/dist/v8.0.0/docs/api/deprecations.html#deprecations_dep0063_serverresponse_prototype_writeheader)
- net
    - [server.connections](https://nodejs.org/dist/v0.10.0/docs/api/net.html#net_server_connections)
- repl
    - `replServer.convertToContext` (undocumented)
    - [replServer.turnOffEditorMode](https://nodejs.org/dist/v9.0.0/docs/api/deprecations.html#deprecations_dep0078_replserver_turnoffeditormode)
    - [replServer.memory](https://nodejs.org/dist/v9.0.0/docs/api/deprecations.html#deprecations_dep0082_replserver_prototype_memory)

### types of arguments

- fs
    - `fs.truncate()` and `fs.truncateSync()` usage with a file descriptor has been deprecated.
- url
    - `url.format()` with legacy `urlObject` has been deprecated.

### dynamic things

```js
require(foo).aDeprecatedProperty;
require("http")[A_DEPRECATED_PROPERTY]();
```

### assignments to properties

```js
var obj = {
    Buffer: require("buffer").Buffer
};
new obj.Buffer(); /* missing. */
```

```js
var obj = {};
obj.Buffer = require("buffer").Buffer
new obj.Buffer(); /* missing. */
```

### giving arguments

```js
(function(Buffer) {
    new Buffer(); /* missing. */
})(require("buffer").Buffer);
```

### reassignments

```js
var Buffer = require("buffer").Buffer;
Buffer = require("another-buffer");
new Buffer(); /*ERROR: 'buffer.Buffer' constructor was deprecated.*/
```

## 🚥 Semantic Versioning Policy

`eslint-plugin-deprecated` follows [semantic versioning](http://semver.org/) and [ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy).

- Patch release (intended to not break your lint build)
    - A bug fix in a rule that results in it reporting fewer errors.
    - Improvements to documentation.
    - Non-user-facing changes such as refactoring code, adding, deleting, or modifying tests, and increasing test coverage.
    - Re-releasing after a failed release (i.e., publishing a release that doesn't work for anyone).
- Minor release (might break your lint build)
    - A bug fix in a rule that results in it reporting more errors.
    - A new rule is created.
    - A new option to an existing rule is created.
    - An existing rule is deprecated.
- Major release (likely to break your lint build)
    - A support for old Node version is dropped.
    - A support for old ESLint version is dropped.
    - An existing rule is changed in it reporting more errors.
    - An existing rule is removed.
    - An existing option of a rule is removed.
    - An existing config is updated.

## 📰 Changelog

- [GitHub Releases](https://github.com/ayqy/eslint-plugin-deprecated/releases)

## 💎 Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests and measures coverage.
- `npm run coverage` shows the coverage result of `npm test` command.
- `npm run clean` removes the coverage result of `npm test` command.
