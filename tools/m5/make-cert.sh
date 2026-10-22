#!/bin/zsh
# Creates the Tizen author certificate and the "freemytv" signing profile.
# Run it in your own Terminal: the password is typed here and never stored in this file or your shell history.
set -e
T=~/tizen-studio/tools/ide/bin/tizen

read -s "PW?Pick a certificate password: "; echo
read -s "PW2?Type it again: "; echo
if [[ "$PW" != "$PW2" ]]; then echo "The passwords don't match. Run it again."; exit 1; fi

$T certificate -a freemytv -n "Kevin" -f freemytv -p "$PW"
$T security-profiles add -n freemytv -a ~/tizen-studio-data/keystore/author/freemytv.p12 -p "$PW"
$T cli-config "profiles.path=$HOME/tizen-studio-data/profile/profiles.xml"
unset PW PW2
echo "Done: the freemytv profile is ready."
