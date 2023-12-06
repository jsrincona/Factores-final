#!/bin/bash

docker build -t patrones-front:1.0 .
docker stack deploy -c docker-stack.yml patrones-front