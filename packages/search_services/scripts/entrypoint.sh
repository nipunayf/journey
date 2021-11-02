#!/bin/sh

set -e # exit if errors happen anywhere
python3 manage.py collectstatic --noinput
python manage.py migrate

uwsgi --socket :8000 --workers 4 --master --enable-threads --module search_services.wsgi