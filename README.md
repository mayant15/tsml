# TSML

![checks](https://img.shields.io/github/checks-status/mayant15/tsml/main)
[![codecov](https://codecov.io/gh/mayant15/tsml/branch/main/graph/badge.svg?token=L2NASHZHZK)](https://codecov.io/gh/mayant15/tsml)

A bare-bones REPL for a subset of StandardML written in TypeScript.

## Using

Requires no dependencies except NodeJS. After cloning the repo then run

```
yarn install
```

You can then start the REPL with

```
yarn start
```

You can end the REPL Ctrl+D on Linux.

## Supported Features

- [x] Literal integers and strings
- [x] Variable bindings with `val` expressions
- [ ] Functions

## Why?

Just as an exercise since I'm new to building programming languages. I learnt about StandardML through Dan Grossman's excellent [Programming Languages](https://www.coursera.org/learn/programming-languages?) MOOC and thought a minimal implementation shouldn't be that hard.

**I neither aim nor claim to conform to the specification, implement/maintain all features or make this the fastest implementation.** I'll try to implement what I find interesting while going through the MOOC.
