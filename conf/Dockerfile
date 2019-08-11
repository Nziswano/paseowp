FROM php:7.2-fpm
RUN apt-get update && apt-get install -y wget git unzip &&\
  docker-php-ext-install mysqli && docker-php-ext-enable mysqli &&\
  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" &&\
  php composer-setup.php --install-dir=/usr/local/bin --filename=composer --quiet
