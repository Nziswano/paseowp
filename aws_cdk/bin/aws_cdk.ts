#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkStack } from '../lib/aws_cdk-stack';

const app = new cdk.App();
new AwsCdkStack(app, 'AwsCdkStack');
