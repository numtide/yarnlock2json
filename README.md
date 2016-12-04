# yarnlock2json

This program uses yarn's official parser to read the `yarn.lock` file and then
produce a JSON file. The intent is to use the result as a data source for
nix since nix can read JSON natively. Because we're using the official parser
it's going to be easier to keep this up2date.

## Usage

```
  Usage: yarnlock2json [options]

  Transforms yarn.lock files to JSON

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -d, --dir <path>     directory path where the yarn.lock file is located (default to current directory)
    -o, --output <path>  file path to write the JSON to (default to stdout)
    -p, --pretty         indent the output
```

## TODO

Write the nix counterpart that can take advantage of that JSON output.

## Notes

Unfortunately it's not possible to generate a nix file that will be compatible
with npm2nix's output (without fetching more informations).

Yarn:
* name
* version
* fetch url and sha1
* dependencies by name:version

Npm2nix (on top of yarn's set):
* is binary?
* optionalDependencies
* peerDependencies
* os list
* cpu list

