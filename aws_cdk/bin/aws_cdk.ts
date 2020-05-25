#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsCdkStack } from "../lib/aws_cdk-stack";

const current_config = {
  region: "eu-central-1",
  account: "338196870821",
};

const app = new cdk.App();
new AwsCdkStack(app, "AwsCdkStack", {
  env: current_config,
});
