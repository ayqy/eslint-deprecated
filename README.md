# eslint-plugin-deprecated

[![npm version](https://img.shields.io/npm/v/eslint-plugin-deprecated.svg)](https://www.npmjs.com/package/eslint-plugin-deprecated)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-deprecated.svg)](http://www.npmtrends.com/eslint-plugin-deprecated)
[![Build Status](https://travis-ci.org/mysticatea/eslint-plugin-deprecated.svg?branch=master)](https://travis-ci.org/mysticatea/eslint-plugin-deprecated)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-deprecated/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-deprecated)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-plugin-deprecated.svg)](https://david-dm.org/mysticatea/eslint-plugin-deprecated)

ESLint ~~@deprecation~~ rules plugin, based on API blacklist.

## 💿 Install & Usage

```
$ npm install --save-dev eslint eslint-plugin-deprecated
```

- Requires Node.js `>=6.0.0`

**.eslintrc.json** (An example)

```json
{
    "plugins": [
        "eslint-plugin-deprecated"
    ],
    "rules": {
        "node/exports-style": ["error", "module.exports"],
        "node/prefer-global/buffer": ["error", "always"],
        "node/prefer-global/console": ["error", "always"],
        "node/prefer-global/process": ["error", "always"],
        "node/prefer-global/url-search-params": ["error", "always"],
        "node/prefer-global/url": ["error", "always"]
    }
}
```

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

## 📖 Rules

- ⭐️ - the mark of recommended rules.
- ✒️ - the mark of fixable rules.

<!--RULES_TABLE_START-->
### Possible Errors

| Rule ID | Description |    |
|:--------|:------------|:--:|


### Best Practices

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [no-deprecated-api](./docs/rules/no-deprecated-api.md) | disallow deprecated APIs | ⭐️ |

### Stylistic Issues

| Rule ID | Description |    |
|:--------|:------------|:--:|


### Deprecated rules

These rules have been deprecated in accordance with the [deprecation policy](https://eslint.org/docs/user-guide/rule-deprecation), and replaced by newer rules:

| Rule ID | Replaced by |
|:--------|:------------|


<!--RULES_TABLE_END-->

## 🔧 Configs

This plugin provides `plugin:node/recommended` preset config.
This preset config:

- enables the environment of ES2015 (ES6) and Node.js.
- enables rules which are given :star: in the above table.
- enables [no-process-exit](http://eslint.org/docs/rules/no-process-exit) rule because [the official document](https://nodejs.org/api/process.html#process_process_exit_code) does not recommend a use of `process.exit()`.
- adds `{ecmaVersion: 2019}` into `parserOptions`.
- adds `Atomics` and `SharedArrayBuffer` into `globals`.
- adds this plugin into `plugins`.

## 👫 FAQ

- Q: The `no-missing-import` / `no-missing-require` rules don't work with nested folders in SublimeLinter-eslint
- A: See [context.getFilename() in rule returns relative path](https://github.com/roadhump/SublimeLinter-eslint#contextgetfilename-in-rule-returns-relative-path) in the SublimeLinter-eslint FAQ.

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
