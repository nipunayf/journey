server {
    listen ${LISTEN_PORT};

    location /static {
        alias /vol/static;
    }

    location /search {
        uwsgi_pass              ${SEARCH_HOST}:${SEARCH_PORT};
        include                 /etc/nginx/uwsgi_params;
        client_max_body_size    10M;
    }
    location /database {
        proxy_pass              http://{DB_HOST}:${DB_PORT};
    }

}
