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
  }
}
