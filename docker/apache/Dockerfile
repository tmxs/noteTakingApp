# +-----------------------+
# | Default Configuration |
# +-----------------------+

FROM php:7.2-apache

COPY . /var/www/html
WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    unzip \
    gnupg2 \

RUN docker-php-ext-install \
    zip \
    pdo \
    pdo_mysql

RUN a2enmod rewrite headers

RUN chmod -R 777 /var/www/html/

# +----------+
# | Composer |
# +----------+

RUN curl -Ss https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && composer install

# +--------+
# | NodeJS |
# +--------+

ARG NODE_VERSION=10.13.0
ARG NVM_DIR=/usr/local/nvm

# https://github.com/creationix/nvm#install-script
RUN mkdir $NVM_DIR && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

# +------+
# | Yarn |
# +------+

#ARG YARN_VERSION=1.16.0

#COPY ./install-yarn.sh /usr/local/bin/install-yarn
#RUN chmod +x /usr/local/bin/install-yarn
#RUN set -xe \
#    && install-yarn

#RUN yarn install &&
#    \ yarn add @symfony/webpack-encore --dev &&
#    \ yarn add sass-loader@^7.0.1 node-sass --dev &&
#    \ yarn add bootstrap --dev &&
#    \ yarn add --dev @fortawesome/fontawesome-free &&
#    \ yarn encore dev
