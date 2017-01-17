#!/bin/bash
docker run -t -i -d \
       -p 0.0.0.0:8080:8080 \
       -v $(pwd):/var/www/inahurry \
       --name inahurry node:6.9.2 \
       # /bin/bash -c 'cd /var/www/inahurry && sh build.sh'
