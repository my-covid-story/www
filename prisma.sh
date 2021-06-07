#!/usr/bin/env bash
#
# Wrapper for the prisma CLI, which modifies the schema as necessary for prisma migrate invocations.
# All options and arguments are passed along to the prisma CLI unchanged.

set -eo pipefail
# cd "$(dirname "${BASH_SOURCE[0]}")"
cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")"

SCHEMA=prisma/schema.prisma
BACKUP="$SCHEMA~"

# For prisma migrate dev, backup the schema and comment out any //nomgrate lines.
# Run with --skip-generate, capture the exit code, and restore the schema.
if [[ "$1" = migrate && "$2" = dev ]]
then
  mv -f "$SCHEMA" "$BACKUP"
  sed '/\/\/nomigrate/s/^/\/\//g' "$SCHEMA~" > "$SCHEMA"
  shift
  shift
  set +e
  npx prisma migrate dev --skip-generate "$@"
  EC=$?
  mv -f "$BACKUP" "$SCHEMA"
  exit $EC
fi

npx prisma "$@"
