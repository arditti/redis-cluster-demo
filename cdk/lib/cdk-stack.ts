import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cloudfront } from './cloudfront';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Duration } from 'aws-cdk-lib';
import { BUCKET_ARN_OUTPUT, CF_OAI_ID_OUTPUT, DOMAIN_ACM_ARN_OUTPUT } from './const';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const bucketArn = cdk.Fn.importValue(BUCKET_ARN_OUTPUT);
    const oaiId = cdk.Fn.importValue(CF_OAI_ID_OUTPUT);
    const acmArn = cdk.Fn.importValue(DOMAIN_ACM_ARN_OUTPUT);

    const bucket = s3.Bucket.fromBucketArn(this, `${id}-bucket`, bucketArn);
    const oai = cloudfront.OriginAccessIdentity.fromOriginAccessIdentityId(this, `${id}-oai`, oaiId);
    const cf = new Cloudfront(this, `${id}-cf`, { bucket, path: id, oai, acmArn });

    new s3Deploy.BucketDeployment(this, `${id}-s3-deployment`, {
      // TODO find more elegant path solution
      sources: [s3Deploy.Source.asset('../dist')],
      destinationBucket: bucket,
      distribution: cf.distribution,
      destinationKeyPrefix: id,
      distributionPaths: ['/index.html'],
      cacheControl: [
        s3Deploy.CacheControl.maxAge(Duration.days(1)),
      ],
    });
  }
}
