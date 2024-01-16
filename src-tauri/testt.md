- [../README.md](./../README.md)
- ![imagen](~/Plantillas/2023wrapped_say-thanks-top-artist.jpeg)
# Conventional commits, a good practice
## Definition
Conventional Commits is a specification for writing commit messages in a way that is easy for humans and machines to understand. It defines a standard format for commit messages, which consists of the following parts:

### Parts
Type: The type of commit, such as feat, fix, docs, or chore.
Scope: The scope of the change, such as a-file, a-module, or the-project.
Description: A brief description of the change.
Breaking change: An optional section to indicate if the commit introduces a breaking change.

### Usage example
```
feat: add a new button to the UI
fix: fix a bug in the login form
docs: update the documentation for the new API
chore: update the build script
feat(a-file): add a new field to the configuration file
fix(a-module): fix a bug in the rendering engine
```
To use conventional commits, you can use a git hook or a tool like [commitizen](https://commitizen.github.io/cz-cli/) to help you write the commit messages in the correct format.

## Benefits
Here are some of the benefits of using conventional commits:

It makes it easier for humans to understand the changes that have been made to a project.
It makes it easier for machines to parse commit messages and generate change logs, changelogs, and other documentation.
It helps to ensure that commit messages are consistent and easy to find.

If you are working on a project that uses conventional commits, I encourage you to follow the specification and write clear and concise commit messages. It will make your project easier to maintain and understand for everyone involved.

## Aditional resources
Here are some additional resources that you may find helpful:

- [Conventional Commits website](https://www.conventionalcommits.org/en/v1.0.0/)
- [Writing good commit messages](https://blog.devgenius.io/writing-good-commit-messages-with-conventional-commits-8a40e99da2de)
