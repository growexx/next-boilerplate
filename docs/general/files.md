# Configuration: A Glossary

A guide to the configuration files for this project: where they live and what
they do.

## The root folder


- `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.


- `package.json`: Our `npm` configuration file has three functions:

  1.  It's where Babel and ESLint are configured
  1.  It's the API for the project: a consistent interface for all its controls
  1.  It lists the project's package dependencies

  Baking the config in is a slightly unusual set-up, but it allows us to keep
  the project root as uncluttered and grokkable-at-a-glance as possible.

