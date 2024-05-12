import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3 } from './s3';
import { Cloudfront } from './cloudfront';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Duration } from 'aws-cdk-lib';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id);
    const s3 = new S3(this, `${id}-s3`, {});
    const cf = new Cloudfront(this, `${id}-cf`, {
      bucket: s3.bucket
    });
    new s3Deploy.BucketDeployment(this, `${id}-s3-deployment`, {
      // TODO find more elegant path solution
      sources: [s3Deploy.Source.asset('../dist')],
      destinationBucket: s3.bucket,
      distribution: cf.distribution,
      destinationKeyPrefix: id,
      distributionPaths: ['/index.html'],
      cacheControl: [
        s3Deploy.CacheControl.maxAge(Duration.days(1)),
      ],
    });
  }
}
