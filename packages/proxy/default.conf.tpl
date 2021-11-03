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
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_pass              ${DB_HOST}:${DB_PORT};
        client_max_body_size    10M;
    }

}
