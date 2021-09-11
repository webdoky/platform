FROM alpine:3.12

RUN apk update && \
    apk add --no-cache docker-cli python3 rust cargo py3-pip && \
    apk add --no-cache --virtual .docker-compose-deps python3-dev libffi-dev openssl-dev gcc libc-dev make && \
    pip install docker-compose && \
    apk del .docker-compose-deps

COPY renew_certs.sh /etc/periodic/daily/renew_certs

RUN chmod +x /etc/periodic/daily/renew_certs

WORKDIR /workdir

CMD ["crond", "-f", "-l", "0"]
