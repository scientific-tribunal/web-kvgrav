#!/usr/bin/env sh

set -e
yarn build
cd dist
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:scientific-tribunal/web-kvgrav.git main:gh-pages
cd -
