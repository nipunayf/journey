#!/bin/sh

set -e # exit if errors happen anywhere
python3 manage.py collectstatic --noinput

uwsgi --socket :8000 --master --enable-threads --module search_services.wsgi