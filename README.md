
# Multi-site Wordpress Docker Image
* Access wordpress instance via REST API
* Uses `composer.json` to manage the wordpress code.

## Wordpress Settings
* `define('DB_HOST', ':/var/lib/mysql/mysql.sock');`
* Generate a salt `md5 -s "random salt again nonce_in my_kcy"`

## Build a Wordpress Image
* [Dockerise with PHP-fpm and nginx](http://geekyplatypus.com/dockerise-your-php-application-with-nginx-and-php7-fpm/)
### Build Docker file
* Build with argument - We pass in the github auth token currently stored in **.env** file
* `export GITHUB_AUTH='{"github-oauth":{"github.com": "xxx"}}'`
* `export DOCKER_BUILDKIT=1`
* `docker build --build-arg GITHUB_AUTH -t paseo:wordpress .`

## Push image to AWS ECR Repository
```
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin {ecr}.dkr.ecr.eu-central-1.amazonaws.com/paseo
docker tag paseo:wordpress {ecr}.dkr.ecr.eu-central-1.amazonaws.com/paseo:wordpress
docker push {ecr}.dkr.ecr.eu-central-1.amazonaws.com/paseo:wordpress
```


## Build with Microsoft Azure Devops
* Command line client
  * `docker run -it mcr.microsoft.com/azure-cli`
### Azure Pipelines
* Microsoft Pipeline
  * [Docker Tasks](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/docker?view=azure-devops)
  * `DOCKER_BUILDKIT=1 docker build . --build-arg GITHUB_AUTH='{"github-oauth":{"github.com": "xxx"}}' -t paseo:wordpress`
  * Github Tokens
    * [Tokens](https://github.com/settings/tokens
    *  [Managing Composer Github Access](https://www.previousnext.com.au/blog/managing-composer-github-access-personal-access-tokens)
    * `export COMPOSER_AUTH='{"github-oauth":{"github.com":"xxxxx"}}`
* Azure Devops Notes
report.status = Reporting::Report::statuses[:generated];
