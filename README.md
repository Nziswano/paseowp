# Paseo MultiSite Wordpress Image

[![Build Status](https://dev.azure.com/martinjohan/Paseo%20Wordpress%20Instance/_apis/build/status/catenare.paseowp?branchName=master)](https://dev.azure.com/martinjohan/Paseo%20Wordpress%20Instance/_build/latest?definitionId=1&branchName=master)

## Overview

Build a website for Paseo Baptist Church in Soweto, Johannesburg. Use the same wordpress instance for the Preschool/daycare center and the Martin Family.

- Using wordpress multisite for the project(s).
- Foundation being used for creating the themes.

* Demo Details
  - username: dockeradmin
  - password: 0SZqhXauHD\$ZDEssg5
* WooCommerce API Keys
  - consumer key: ck_5e9f4921efc5325141fe00a1d17213bba6740f42
  - consumer secret: cs_11cb8dcbc3d64544acb53f158177cf0ed8585cca

## Deploying the site

### Backend Code - Wordpress Code

1. Create tag of current site in master
   - `git checkout master`
   - `git tag -a v1.0 -m "Initial version of site launched"`
   - `git push origin --tags`
1. Merge code to master.
   - `git checkout master`
   - `git merge dev`
   - `git push origin`
1. Deploy backend code to server
   - `ssh -i keyfile.pem {user}@{server}`
   - Update server:
     - `sudo apt-get update`
     - `sudo apt-get upgrade -y`
   - Access the correct folder
     - `/path/to/wordpress/folder`
     - `git pull origin master`
   - Run composer update without dev.
     - `composer update --no-dev -vvv` - no dev packages and verbose.
1. Login and activate plugins.
1. Test API access.

## Github personal token

- [Managing Composer Github Access](https://www.previousnext.com.au/blog/managing-composer-github-access-personal-access-tokens)

### Issues with deployment

- Error _PHP Fatal error: Uncaught exception 'ErrorException' with message 'proc_open(): fork failed - Cannot allocate memory' in phar_
  - [proc-open-fork-failed-errors for details](https://getcomposer.org/doc/articles/troubleshooting.md#proc-open-fork-failed-errors for details)

```bash
/bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
/sbin/mkswap /var/swap.1
/sbin/swapon /var/swap.1
```

- Add Permanent swap [Add swap to Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04)

## Adding API Theme

- Adding a public theme to show when hitting the front page of our api.

## Build Wordpress Image

- [Dockerise with PHP-fpm and nginx](http://geekyplatypus.com/dockerise-your-php-application-with-nginx-and-php7-fpm/)

* Add access token to docker image
  - [Tokens](https://github.com/settings/tokens)
  * [Managing Composer GitHub Personal Access Tokens](https://www.previousnext.com.au/blog/managing-composer-github-access-personal-access-tokens)
  - **`composer config -g github-oauth.github.com xxxxxxx;`**
  * export COMPOSER_AUTH='{"github-oauth":{"github.com":"xxxxx"}}'
* Microsoft Pipeline
  - [Docker Tasks](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/docker?view=azure-devops)

- `docker image prune -a`
- `docker container prune` - Remove stopped containers
- `DOCKER_BUILDKIT=1 docker build .`
  `define('DB_HOST', ':/var/lib/mysql/mysql.sock');`

* Generate a salt `md5 -s "random salt again nonce_in my_kcy"`
* Issue with s3 uploads. Needed to edit where the vendor file is found.
  `require_once dirname( __FILE__ ) . '/../../../../vendor/autoload.php';`

## Building a docker image

- export COMPOSER_AUTH='{"github-oauth":{"github.com":"xxx"}}'

* `DOCKER_BUILDKIT=1 docker build --build-arg GITHUB_AUTH='{"github-oauth":{"github.com":"xxxxx"}}'

## Deploying with docker on amazon fargate

### Goals

- Move everything to amazon
- Expose the API for Wordpress via API Gateway

### To Do

- Setup a VPC for the internal/sails server and the fargate/ecs instance

* LightSail Private IP Address: 172.26.15.42
* Peering connection active to main vpc

- Admin only accessible if logged into the VPC via vpn(?). Nice to have but not required.
- Move website for paseo.org.za from Firebase to amazon - everything in one place.
- Need to setup the small server to access the database via the VPC
- Environment variables for
  - S3
  - Cloudinary
  - Database settings - should only be accessible via the internal vpc

## Looking into using Microsoft's services

- user: martin.johan@nziswano.co.za
- https://dev.azure.com/martinjohan/Paseo%20Wordpress%20Instance - devops instance

* `DOCKER_BUILDKIT=1 docker build . --build-arg GITHUB_AUTH='{"github-oauth":{"github.com": "xxx"}}' -t paseo:wordpress`
