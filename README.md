# Nimpretty-Action

- [GitHub Action](https://github.com/features/actions) to auto-prettify all your Nim source code files using [nimpretty](https://nim-lang.github.io/Nim/tools.html).


# Examples

- https://github.com/juancarlospaco/nimpretty-action/blob/main/.github/workflows/main.yml
- https://github.com/juancarlospaco/nimpretty-action/runs/1355541879?check_suite_focus=true#step:4:8


# Use

```yaml
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: jiro4989/setup-nim-action@v1
      - uses: juancarlospaco/nimpretty-action@main
        with:
          indent: 2              # Optional, positive integer, default 2
          folder: "src,docs,etc" # Optional, comma separated folders, default "."
          maxLineLen: 100        # Optional, positive integer
```


# Requisites

- `jiro4989/setup-nim-action` to setup Nim with nimpretty.
- `EndBug/add-and-commit` to commit all nimpretty fixes back to the Git repo.


# FAQ

- Why not take care of setting up Nim by itself?.

Because some people already do it with just Git or Gitnim or Choosenim or setup-nim-action.

- Why not take care of commiting the files by itself?.

Because some people already do it with `EndBug/add-and-commit` or `stefanzweifel/git-auto-commit-action` or `github-actions/auto-commit`.
