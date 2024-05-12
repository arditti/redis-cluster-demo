#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();

new CdkStack(app, 'redis-cluster-demo', {
  env: {
    account: process.env.CDK_AWS_ACCOUNT,
    region: process.env.CDK_AWS_REGION,
  }
});
