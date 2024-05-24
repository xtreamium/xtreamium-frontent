#!/usr/bin/env bash

docker context use default

docker build \
  -t ghcr.io/xtreamium/xtreamium-frontend \
  -f docker/Dockerfile .

docker push ghcr.io/xtreamium/xtreamium-frontend
