import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
// import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
// import { EcrImage } from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
// import * as ssm from "@aws-cdk/aws-ssm";
import * as apigateway from "@aws-cdk/aws-apigateway";
// import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = new ecr.Repository(this, "nziswano", {
      repositoryName: "nziswano",
    });
    repository.addLifecycleRule({
      tagPrefixList: ["wordpress"],
      maxImageCount: 1,
    });
    repository.addLifecycleRule({ tagPrefixList: ["nginx"], maxImageCount: 1 });

    const vpc = ec2.Vpc.fromLookup(this, "DefaultVpc", {
      isDefault: true,
    });

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc,
    });

    // const api = new apigateway.RestApi(this, "wordpress-api");
    new cdk.CfnOutput(this, "registry", { value: repository.repositoryUri });

    // Task Definition

    // create a task definition with CloudWatch Logs
    const logging = new ecs.AwsLogDriver({
      streamPrefix: "myapp",
    });

    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "wordpress_fargate",
      {
        family: "nziswano_fargate",
        volumes: [{ name: "wordpress" }],
      }
    );

    const wordpressContainerProps = {
      image: ecs.ContainerImage.fromEcrRepository(
        repository,
        "wordpress_latest"
      ),
      taskDefinition: taskDefinition,
      mountPoints: [
        {
          readOnly: false,
          containerPath: "/var/www/html",
          sourcVolume: "wordpress",
        },
      ],
      environment: {
        AUTH_KEY: process.env.AUTH_KEY,
        AUTH_SALT: process.env.AUTH_SALT,
        LOGGED_IN_KEY: process.env.LOGGED_IN_KEY,
        LOGGED_IN_SALT: process.env.LOGGED_IN_SALT,
        MY_KEY: process.env.MY_KEY,
        NONCE_KEY: process.env.NONCE_KEY,
        NONCE_SALT: process.env.NONCE_SALT,
        SECURE_AUTH_KEY: process.env.SECURE_AUTH_KEY,
        SECURE_AUTH_SALT: process.env.SECURE_AUTH_SALT,
        WORDPRESS_DB_HOST: process.env.WORDPRESS_DB_HOST,
        WORDPRESS_DB_NAME: process.env.WORDPRESS_DB_NAME,
        WORDPRESS_DB_PASSWORD: process.env.WORDPRESS_DB_PASSWORD,
        WORDPRESS_DB_USER: process.env.WORDPRESS_DB_USER,
        WP_DEBUG: process.env.WP_DEBUG,
      },
      logging: logging,
    };

    const nginxContainerProps = {
      image: ecs.ContainerImage.fromEcrRepository(repository, "nginx_latest"),
      taskDefinition: taskDefinition,
      mountPoints: [
        {
          readOnly: true,
          containerPath: "/var/www/html",
          sourcVolume: "wordpress",
        },
      ],
      logging: logging,
    };

    taskDefinition.addContainer("wordpress", wordpressContainerProps);
    taskDefinition.addContainer("nginx", nginxContainerProps);
  }
}
