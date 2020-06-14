import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
import * as ssm from "@aws-cdk/aws-ssm";

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, "DefaultVpc", {
      isDefault: true,
    });

    const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(
      this,
      "DefaultSecurityGroup",
      "sg-4e7a5e27"
    );

    const repository = new ecr.Repository(this, "nziswano", {
      repositoryName: "nziswano",
    });
    repository.addLifecycleRule({
      tagPrefixList: ["wordpress"],
      maxImageCount: 1,
    });
    repository.addLifecycleRule({ tagPrefixList: ["nginx"], maxImageCount: 1 });

    const cluster = new ecs.Cluster(this, "NziswanoCluster", {
      vpc: vpc,
    });

    // const api = new apigateway.RestApi(this, "wordpress-api");
    new cdk.CfnOutput(this, "registry", { value: repository.repositoryUri });

    // Task Definition

    // create a task definition with CloudWatch Logs
    const logging = new ecs.AwsLogDriver({
      streamPrefix: "nziswano_wordpress",
    });

    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "nziswano_fargate",
      {
        family: "nziswano_fargate",
      }
    );

    taskDefinition.addVolume({
      name: "wordpress",
    });

    const wordpressContainerProps = {
      image: ecs.ContainerImage.fromEcrRepository(
        repository,
        "wordpress_latest"
      ),
      taskDefinition: taskDefinition,
      environment: {
        AUTH_KEY: ssm.StringParameter.valueFromLookup(this, "AUTH_KEY"),
        AUTH_SALT: ssm.StringParameter.valueFromLookup(this, "AUTH_SALT"),
        LOGGED_IN_KEY: ssm.StringParameter.valueFromLookup(
          this,
          "LOGGED_IN_KEY"
        ),
        LOGGED_IN_SALT: ssm.StringParameter.valueFromLookup(
          this,
          "LOGGED_IN_SALT"
        ),
        MY_KEY: ssm.StringParameter.valueFromLookup(this, "MY_KEY"),
        NONCE_KEY: ssm.StringParameter.valueFromLookup(this, "NONCE_KEY"),
        NONCE_SALT: ssm.StringParameter.valueFromLookup(this, "NONCE_SALT"),
        SECURE_AUTH_KEY: ssm.StringParameter.valueFromLookup(
          this,
          "SECURE_AUTH_KEY"
        ),
        SECURE_AUTH_SALT: ssm.StringParameter.valueFromLookup(
          this,
          "SECURE_AUTH_SALT"
        ),
        WORDPRESS_DB_HOST: ssm.StringParameter.valueFromLookup(
          this,
          "WORDPRESS_DB_HOST"
        ),
        WORDPRESS_DB_NAME: ssm.StringParameter.valueFromLookup(
          this,
          "WORDPRESS_DB_NAME"
        ),
        WORDPRESS_DB_PASSWORD: ssm.StringParameter.valueFromLookup(
          this,
          "WORDPRESS_DB_PASSWORD"
        ),
        WORDPRESS_DB_USER: ssm.StringParameter.valueFromLookup(
          this,
          "WORDPRESS_DB_USER"
        ),
        WP_DEBUG: ssm.StringParameter.valueFromLookup(this, "WP_DEBUG"),
      },
      logging: logging,
    };

    const wordpressContainer = new ecs.ContainerDefinition(
      this,
      "wordpress_container",
      wordpressContainerProps
    );

    wordpressContainer.addMountPoints({
      readOnly: false,
      containerPath: "/var/www/html",
      sourceVolume: "wordpress",
    });

    const nginxContainerProps = {
      image: ecs.ContainerImage.fromEcrRepository(repository, "nginx_latest"),
      taskDefinition: taskDefinition,
      logging: logging,
      essential: false,
    };

    const nginxContainer = new ecs.ContainerDefinition(
      this,
      "nginx_container",
      nginxContainerProps
    );

    nginxContainer.addMountPoints({
      readOnly: true,
      containerPath: "/var/www/html",
      sourceVolume: "wordpress",
    });

    nginxContainer.addPortMappings({
      hostPort: 80,
      protocol: "tcp",
      containerPort: 80,
    });

    const fargateService = new ecs.FargateService(this, "Fargate Service", {
      cluster: cluster,
      taskDefinition: taskDefinition,
      assignPublicIp: true,
      serviceName: "nziswano-wordpress",
      securityGroup: securityGroup,
      desiredCount: 0,
    });
  }
}
