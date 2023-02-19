#!/usr/bin/env bash
set -e
if [ -z "$API_LOG_LEVEL" ]; then
  API_LOG_LEVEL=info
fi
if [ -z "$API_PORT" ]; then
  API_PORT=8085
fi
python -m exhauster.composites.alembic_runner upgrade head

GUNICORN_CMD_ARGS="--bind=0.0.0.0:$API_PORT --workers=4 --log-level $API_LOG_LEVEL --log-file - --forwarded-allow-ip '*' --proxy-allow-from '*' --timeout 300"
export GUNICORN_CMD_ARGS

gunicorn exhauster.composites.web_api:app
