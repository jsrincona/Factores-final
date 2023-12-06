#!/bin/bash

docker build -t patrones-back:1.0 .
docker stack deploy -c docker-stack.yml patrones-back