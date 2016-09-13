CacheBrowser Packager

Bundles the cachebrowser core and gui into a single installable applications.

To make the bundles first pull the submodule repositories
```
git clone https://github.com/CacheBrowser/cachebrowser-packager
git submodule update --remote --recursive
```

Then run
```
npm install
gulp dist
```
