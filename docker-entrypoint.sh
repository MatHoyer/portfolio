#!/bin/sh
set -e

version="${APP_VERSION:-}"
if [ -n "$version" ]; then
  find /usr/share/nginx/html -type f \( -name '*.html' -o -name '*.js' \) -print0 |
    xargs -0 sed -i "s/__APP_VERSION__/${version}/g"
fi

exec nginx -g "daemon off;"
