#!/bin/sh

if [ "$1" = "prod" ] ; then yarn build:prod ; else yarn start ; fi
