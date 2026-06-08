# Contributing

Thank you for considering contributing to this project! This document explains how to contribute in a way that makes review and collaboration smooth.

## Table of contents

- [How to contribute](#how-to-contribute)
- [Development setup](#development-setup)
- [Branching & commits](#branching--commits)
- [Pull request process](#pull-request-process)
- [Testing & quality](#testing--quality)
- [Communication](#communication)

## How to contribute

- Search existing issues to see if someone already raised the idea or bug.
- Open an issue to discuss large or architectural changes before implementing.
- Fork the repository and create a branch named `fix/short-description` or `feat/short-description`.

## Development setup

Install dependencies and build locally:

```bash
npm install
npm run build
```

Use the repository scripts where available (for example: `npm run lint`, `npm test`).

## Branching & commits

- Use descriptive branch names: `feat/`, `fix/`, `chore/`.
- Keep commits focused and write clear commit messages.

Recommended commit message format:

```txt
type(scope): short description

Longer description (if needed).
```

## Pull request process

When opening a pull request include:

- What the change does and why.
- Any migration or upgrade notes.
- How to test the change locally.

Be responsive to review feedback; maintainers may request changes before merging.

## Testing & quality

- Add tests for new behavior when applicable.
- Run linters and formatters before opening a PR:

```bash
npm run lint
npm run format
```

## Communication

For significant changes or design discussions, open an issue first and request feedback from maintainers and contributors.

Thanks again — we appreciate your contributions!

## AI guidance

If you are an AI assistant working in this repository, follow the instructions in [.github/copilot-instructions.md](../.github/copilot-instructions.md).

Those instructions call out the repository tools, the TypeScript preference, and the requirement to research before acting.

## Commit messages and releases

This repository uses Conventional Commits to drive automated releases via `semantic-release`.

- Use the Conventional Commits format for commit messages, for example: `fix(scope): correct minor bug` or `feat(api): add new endpoint`.
- Example commit types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`.
- Pull requests should contain commits following Conventional Commits to trigger appropriate semantic version bumps and changelog entries.

If you want tooling to help format commits, consider using `commitizen` or `husky` + `commitlint`.
