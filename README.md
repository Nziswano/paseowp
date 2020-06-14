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

## AWS Services - This creates the complete infrastructure for running this service.

### Aws System Manager Parameter Store - SSM

- Using `update_ssm.sh` to update **.env** variables on ssm manager.

* `./update_ssm.sh .env` - **.env** is the name for the file with the environmental variables.

### Using the AWS CDK

- [CDK API Docs](https://docs.aws.amazon.com/cdk/api/latest/)

* Using TypeScript, start watch command. Need this to compile TypeScript into JavaScript.
* `$ npm run watch`
* Set _env_ in _bin/aws_cdk.ts_.

```json
const current_config = {
  region: "eu-central-1",
  account: "338196870821",
};

const app = new cdk.App();
new AwsCdkStack(app, "AwsCdkStack", {
  env: current_config,
});
```

- Configuration is done in **lib/aws_cdk-stack.ts**

* Update the _aws_cdk-stack.ts_ file
* `$ cdk deploy` - deploys all the latest changes.

## Building and deploying images using Github

- Will automatically update the ecs service.

* [Github AWS Actions](https://github.com/aws-actions)
  - [Render Task Definition](https://github.com/aws-actions/amazon-ecs-render-task-definition)
