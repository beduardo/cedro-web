FROM nginx

# Seta a timezone para o brasil.
RUN echo "America/Sao_Paulo" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

COPY dist /usr/share/nginx/html