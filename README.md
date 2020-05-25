# Wordpress as a backend service.

## Wordpress as a 12 factor app [The Twelve Factor App](https://12factor.net/)

## Run Local Image

- Create **.env** file. Look at example.env
  - To generate custom salts `openssl rand -base64 35` - Will generate 35 character custom salts.
- `export DOCKER_BUILDKIT=1` - Will parallize the build of the docker image.
- Start Wordpress and Nginx.

```
docker-compose up
```

- Start Mysql Server

```
docker run --env-file .env --name wordpressdb  --network paseowp_default -v "$PWD/database":/var/lib/mysql -p 3306:3306 -p 33060:33060 mysql:latest
```

- Connect to server at `http://localhost:7000`
- Should see the Wordpress Admin install page

## Building and deploying images using Github

- [Github AWS Actions](https://github.com/aws-actions)

## AWS Services

### Aws System Manager Parameter Store - SSM

```sh
$ aws ssm put-parameter --name "WORDPRESS_DB_HOST" --type "String" --value "172.26.15.42"
```

- Using the command line client.

* Using the AWS CDK

- Using TypeScript, start watch command.
  `npm run watch`

- Set _env_ in _bin/aws_cdk.ts_.

https://docs.aws.amazon.com/cdk/api/latest/

- Be sure to run `npm run watch`

### AWS ECS Registry Service

- Setup Registry Service

### AWS Fargate Cluster

- cluster
- registry

### AWS Task Definition

### Api Gateway

### AWS RDS Service
