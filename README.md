
# Multi-site Wordpress Docker Image
A multi-site wordpress image used by multiple sites.
* Access wordpress instance via REST API
* Uses `composer.json` to manage the wordpress code.
## Lightsail Server
* `ssh -i LightsailDefaultKey-eu-central-1.pem ubuntu@api.paseo.org.za`
## Wordpress Settings
* `define('DB_HOST', ':/var/lib/mysql/mysql.sock');`
* Generate a salt `md5 -s "random salt again nonce_in my_kcy"`
## Build a Wordpress Image
* [Dockerise with PHP-fpm and nginx](http://geekyplatypus.com/dockerise-your-php-application-with-nginx-and-php7-fpm/)

## Deployment
* Command line client
  * `docker run -it mcr.microsoft.com/azure-cli`
### Azure Pipelines
* user: martin.johan@nziswano.co.za
* https://dev.azure.com/martinjohan/Paseo%20Wordpress%20Instance - devops instance
* Microsoft Pipeline
  * [Docker Tasks](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/docker?view=azure-devops)
  * `DOCKER_BUILDKIT=1 docker build . --build-arg GITHUB_AUTH='{"github-oauth":{"github.com": "xxx"}}' -t paseo:wordpress`
  * Github Tokens
    * [Tokens](https://github.com/settings/tokens
    *  [Managing Composer Github Access](https://www.previousnext.com.au/blog/managing-composer-github-access-personal-access-tokens)
    * `export COMPOSER_AUTH='{"github-oauth":{"github.com":"xxxxx"}}`
* Azure Devops Notes
report.status = Reporting::Report::statuses[:generated];

## Build Docker file
* Build with argument - We pass in the github auth token currently stored in **.env** file
* `export DOCKER_BUILDKIT=1`
* `docker build --build-arg GITHUB_AUTH -t paseo:wordpress .`
