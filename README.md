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
```


# Requisites

- `jiro4989/setup-nim-action` to setup Nim with nimpretty.
- `EndBug/add-and-commit` to commit all nimpretty fixes back to the Git repo.


# FAQ

- Why not take care of seting up Nim by itself?.

Because some people do with with just Git or Gitnim or Choosenim.
