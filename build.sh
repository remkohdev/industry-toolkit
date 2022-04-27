#!/usr/bin/env sh

#set -e

cspell "docs/**/*.md"
mkdocs build
<<<<<<< HEAD
#linkchecker -f linkcheckerrc public
=======
linkchecker -r 3 -f linkcheckerrc public
>>>>>>> b4a323b399e6da776c2c27de184cd1eade12f645
