# Paseo Baptist Church, Preschool and the Martins Web Site

## Overview

Build a website for Paseo Baptist Church in Soweto, Johannesburg. Use the same wordpress instance for the Preschool/daycare center and the Martin Family.

- Using wordpress multisite for the project(s).
- Foundation being used for creating the themes.

## Deploying the site

### Backend Code - Wordpress Code

1. Create tag of current site in master
   - `git checkout master`
   - `git tag -a v1.0 -m "Initial version of site launched"`
   - `git push origin --tags`
1. Merge code to master.
   - `git checkout mastger`
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
  - `composer config -g github-oauth.github.com xxxxxxx;`

- `docker image prune -a`
- `docker container prune` - Remove stopped containers
- `DOCKER_BUILDKIT=1 docker build .`
  `define('DB_HOST', ':/var/lib/mysql/mysql.sock');`

* Generate a salt `md5 -s "random salt again nonce_in my_kcy"`
