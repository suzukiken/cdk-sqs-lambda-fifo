#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdksqsLambdaFifoStack } from '../lib/cdksqs-lambda-fifo-stack';
import { CdksqsLambdaFifoBatchStack } from '../lib/cdksqs-lambda-fifo-batch-stack';
import { CdksqsLambdaFifoConcStack } from '../lib/cdksqs-lambda-fifo-conc-stack';
import { CdksqsLambdaFifoMixedStack } from '../lib/cdksqs-lambda-fifo-mixed-stack';

const app = new cdk.App();
new CdksqsLambdaFifoStack(app, 'CdksqsLambdaFifoStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
new CdksqsLambdaFifoBatchStack(app, 'CdksqsLambdaFifoBatchStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
new CdksqsLambdaFifoConcStack(app, 'CdksqsLambdaFifoConcStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
new CdksqsLambdaFifoMixedStack(app, 'CdksqsLambdaFifoMixedStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});